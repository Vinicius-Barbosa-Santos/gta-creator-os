"use server";

import { redirect } from "next/navigation";
import { studioIdentity } from "../../session";
import { uuid } from "../producao/database";
import { isPublished, validDate } from "../producao/model.mjs";

function numberField(form: FormData, name: string, max: number, integer = false) {
  const raw = form.get(name);
  if (typeof raw !== "string" || !raw.trim()) return null;
  const value = Number(raw);
  return Number.isFinite(value) && value >= 0 && value <= max && (!integer || Number.isInteger(value)) ? value : NaN;
}

function videoUrl(value: FormDataEntryValue | null) {
  if (typeof value !== "string" || value.length > 200) return null;
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" || url.username || url.password || url.port ||
        !["youtube.com", "www.youtube.com", "m.youtube.com", "youtu.be"].includes(url.hostname)) return null;
    const id = url.hostname === "youtu.be" ? url.pathname.slice(1) :
      url.pathname === "/watch" ? url.searchParams.get("v") : url.pathname.match(/^\/(?:shorts|live)\/([^/]+)$/)?.[1];
    return id && /^[\w-]{11}$/.test(id) ? `https://www.youtube.com/watch?v=${id}` : null;
  } catch {
    return null;
  }
}

export async function saveSnapshot(form: FormData) {
  const account = await studioIdentity();
  if (account?.kind !== "account") redirect("/login");
  const id = String(form.get("entry") ?? "");
  const window = Number(form.get("window"));
  const video = videoUrl(form.get("video"));
  const series = String(form.get("series") ?? "").trim();
  const views = numberField(form, "views", 1_000_000_000, true);
  const impressions = numberField(form, "impressions", 1_000_000_000, true);
  const ctr = numberField(form, "ctr", 100);
  const retention = numberField(form, "retention", 100);
  if (!uuid.test(id) || (window !== 48 && window !== 168) || !video || series.length > 80 ||
      views === null || [views, impressions, ctr, retention].some(Number.isNaN)) {
    redirect("/studio/analytics?estado=dados");
  }
  const { data: entry } = await account.client.from("studio_entries").select("stage")
    .eq("user_id", account.id).eq("id", id).maybeSingle();
  if (!entry || !isPublished(entry.stage)) redirect("/studio/analytics?estado=dados");

  const { error } = await account.client.from("studio_snapshots").upsert({
    user_id: account.id, entry_id: id, window_hours: window, video_url: video, series,
    views, impressions, ctr, retention, captured_at: new Date().toISOString(),
  });
  redirect(error ? "/studio/analytics?estado=erro" : "/studio/analytics?estado=salvo");
}

export async function saveReview(form: FormData) {
  const account = await studioIdentity();
  if (account?.kind !== "account") redirect("/login");
  const week = String(form.get("week") ?? "");
  const observation = String(form.get("observation") ?? "").trim();
  const experiment = String(form.get("experiment") ?? "").trim();
  if (!validDate(week) || new Date(week + "T12:00Z").getUTCDay() !== 1 ||
      !observation || observation.length > 800 || !experiment || experiment.length > 800) {
    redirect("/studio/analytics?estado=dados");
  }
  const { error } = await account.client.from("studio_reviews").upsert({
    user_id: account.id, week_start: week, observation, experiment,
  });
  redirect(error ? "/studio/analytics?estado=erro" : "/studio/analytics?estado=salvo");
}
