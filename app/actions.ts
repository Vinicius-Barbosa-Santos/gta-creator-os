"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { authorized, configured, cookieOptions, equal, sign } from "./session";

export async function login(form: FormData) {
  const key = form.get("key");
  if (!configured() || typeof key !== "string" || key.length > 256 || !equal(key, process.env.STUDIO_ACCESS_KEY!)) {
    redirect("/login?erro=acesso");
  }
  const maxAge = 60 * 60 * 8;
  const expiration = String(Date.now() + maxAge * 1000);
  (await cookies()).set("studio-session", `${expiration}.${sign(expiration)}`, { ...cookieOptions, maxAge });
  redirect("/studio");
}

export async function logout() {
  (await cookies()).delete("studio-session");
  redirect("/login");
}

export async function saveProfile(form: FormData) {
  if (!(await authorized())) redirect("/login");
  const name = String(form.get("name") ?? "").trim();
  const hours = Number(form.get("hours"));
  if (!name || name.length > 60 || !Number.isInteger(hours) || hours < 1 || hours > 40) {
    redirect("/studio?erro=perfil#perfil");
  }
  (await cookies()).set("studio-profile", JSON.stringify({ name, hours }), { ...cookieOptions, maxAge: 60 * 60 * 24 * 180 });
  redirect("/studio");
}
