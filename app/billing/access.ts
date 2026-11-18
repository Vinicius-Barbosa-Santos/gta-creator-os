import type { SupabaseClient } from "@supabase/supabase-js";

export function registrationEnabled() {
  return process.env.STUDIO_PUBLIC_SIGNUP === "true";
}

export function studioBillingStatus(client: SupabaseClient) {
  return client.rpc("studio_billing_status").single<{ mode: string; entitled: boolean }>();
}
