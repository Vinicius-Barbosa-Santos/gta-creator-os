"use server";

import { redirect } from "next/navigation";
import { registrationEnabled } from "../billing/access";
import { studioClient } from "../supabase/server";

export async function register(form: FormData) {
  if (!registrationEnabled()) redirect("/login");
  const email = form.get("email");
  const password = form.get("password");
  const client = await studioClient();
  if (!client || typeof email !== "string" || !email.trim() || email.trim().length > 254 ||
      typeof password !== "string" || password.length < 12 || password.length > 128) {
    redirect("/cadastro?erro=campos");
  }

  const { data, error } = await client.auth.signUp({ email: email.trim(), password });
  // Neither a duplicate address nor an unconfirmed signup grants studio access.
  if (data.session) await client.auth.signOut({ scope: "local" });
  if (error?.status === 429) redirect("/cadastro?erro=limite");
  if (error?.code === "weak_password" || error?.code === "email_address_invalid") redirect("/cadastro?erro=campos");
  if (error && !["user_already_exists", "email_exists"].includes(error.code ?? "")) redirect("/cadastro?erro=indisponivel");
  redirect("/cadastro?status=email");
}
