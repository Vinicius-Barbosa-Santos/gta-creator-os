import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { supabaseConfig } from "./config";

export async function studioClient() {
  const config = supabaseConfig();
  if (!config) return null;
  const store = await cookies();
  return createServerClient(config.url, config.key, {
    cookies: {
      getAll: () => store.getAll(),
      setAll: (changes) => {
        try {
          for (const { name, value, options } of changes) store.set(name, value, options);
        } catch {
          // O proxy grava a renovação de sessão para os componentes de servidor.
        }
      },
    },
  });
}
