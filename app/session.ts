import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { registrationEnabled, studioBillingStatus } from "./billing/access";
import { billingMode } from "./billing/config";
import { cookies } from "next/headers";
import { usesSupabase } from "./supabase/config";
import { studioClient } from "./supabase/server";

export const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
} as const;

export function configured() {
  const key = process.env.STUDIO_ACCESS_KEY;
  const secret = process.env.STUDIO_SESSION_SECRET;
  return Boolean(
    key && secret && key !== secret && key.length >= 32 && secret.length >= 32,
  );
}

export function equal(left: string, right: string) {
  const digest = (value: string) => createHash("sha256").update(value).digest();
  return timingSafeEqual(digest(left), digest(right));
}

export function sign(expiration: string) {
  return createHmac("sha256", process.env.STUDIO_SESSION_SECRET!)
    .update(JSON.stringify([expiration, process.env.STUDIO_ACCESS_KEY]))
    .digest("hex");
}

async function ownerAuthorized() {
  if (!configured()) return false;
  const token = (await cookies()).get("studio-session")?.value;
  if (!token) return false;
  const [expiration, signature] = token.split(".");
  return Boolean(
    signature &&
    /^\d+$/.test(expiration) &&
    Number(expiration) > Date.now() &&
    equal(signature, sign(expiration)),
  );
}

export async function accountIdentity() {
  const client = await studioClient();
  if (!client) return null;
  const { data, error } = await client.auth.getClaims();
  const id = data?.claims.sub;
  return !error && id ? { kind: "account" as const, id, client } : null;
}

export async function studioIdentity() {
  const mode = billingMode();
  if (!usesSupabase()) return !mode && (await ownerAuthorized()) ? { kind: "local" as const } : null;

  const account = await accountIdentity();
  if (!account) return null;

  const { data, error } = await studioBillingStatus(account.client);
  // Earlier deployments can still run before the billing migrations are applied.
  if (error?.code === "PGRST202" && !mode && !registrationEnabled()) return account;
  if (!data?.entitled || (registrationEnabled() && data.mode === "disabled")) return null;
  if (data.mode === "closed") return account;
  return data.mode === (mode ?? "disabled") ? account : null;
}

export async function authorized() {
  return Boolean(await studioIdentity());
}
