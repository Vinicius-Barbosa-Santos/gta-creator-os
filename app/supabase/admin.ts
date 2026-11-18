import { createClient } from "@supabase/supabase-js";
import { supabaseConfig } from "./config";

export function adminClient() {
  const database = supabaseConfig();
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!database || !key) return null;
  return createClient(database.url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}
