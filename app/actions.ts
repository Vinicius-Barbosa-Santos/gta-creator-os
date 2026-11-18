"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { studioIdentity, configured, cookieOptions, equal, sign } from "./session";

import { usesSupabase } from "./supabase/config";
import { studioClient } from "./supabase/server";

import { isStage } from "./studio-plan";

export async function login(form: FormData) {
  if (usesSupabase()) {
    const client = await studioClient();
    const email = String(form.get("email") ?? "").trim();
    const password = form.get("password");
    if (!client || !email || email.length > 254 || typeof password !== "string" ||
        !password || password.length > 256) redirect("/login?erro=acesso");
    const { error } = await client.auth.signInWithPassword({ email, password });
    if (error) {
      if (error.code === "email_not_confirmed") redirect("/login?erro=confirmacao");
      if (error.status === 429) redirect("/login?erro=limite");
      if (!error.status || error.status >= 500) redirect("/login?erro=conexao");
      redirect("/login?erro=acesso");
    }
    redirect("/studio");
  }

  const key = form.get("key");
  if (
    !configured() ||
    typeof key !== "string" ||
    key.length > 256 ||
    !equal(key, process.env.STUDIO_ACCESS_KEY!)
  ) {
    redirect("/login?erro=acesso");
  }
  const maxAge = 60 * 60 * 8;
  const expiration = String(Date.now() + maxAge * 1000);
  (await cookies()).set("studio-session", `${expiration}.${sign(expiration)}`, {
    ...cookieOptions,
    maxAge,
  });
  redirect("/studio");
}

export async function logout() {
  const client = await studioClient();
  if (client) {
    const { error } = await client.auth.signOut({ scope: "local" });
    if (error) redirect("/studio?erro=sair");
  }
  (await cookies()).delete("studio-session");
  redirect("/login");
}

export async function saveProfile(form: FormData) {
  const identity = await studioIdentity();
  if (!identity) redirect("/login");
  const name = String(form.get("name") ?? "").trim();
  const hours = Number(form.get("hours"));
  const stage = form.get("stage");
  if (
    !name ||
    name.length > 60 ||
    !Number.isInteger(hours) ||
    hours < 1 ||
    hours > 40 ||
    !isStage(stage)
  ) {
    redirect("/studio?erro=perfil#perfil");
  }
  if (identity.kind === "account") {
    const { error } = await identity.client.from("studio_profiles").upsert({
      user_id: identity.id, channel_name: name, weekly_hours: hours, stage,
    });
    if (error) redirect("/studio?erro=salvar#perfil");
    redirect("/studio");
  }

  (await cookies()).set(
    "studio-profile",
    JSON.stringify({ name, hours, stage }),
    {
      ...cookieOptions,
      maxAge: 60 * 60 * 24 * 180,
    },
  );
  redirect("/studio");
}
