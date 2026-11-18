import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { supabaseConfig } from "./app/supabase/config";

export async function proxy(request: NextRequest) {
  const config = supabaseConfig();
  if (!config) return NextResponse.next();

  let response = NextResponse.next({ request });
  const client = createServerClient(config.url, config.key, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (changes, headers) => {
        for (const { name, value } of changes) request.cookies.set(name, value);
        response = NextResponse.next({ request });
        for (const { name, value, options } of changes) response.cookies.set(name, value, options);
        for (const [name, value] of Object.entries(headers)) response.headers.set(name, value);
      },
    },
  });
  await client.auth.getClaims();
  response.headers.set("Cache-Control", "private, no-store");
  return response;
}

export const config = {
  matcher: ["/studio/:path*", "/login"],
};
