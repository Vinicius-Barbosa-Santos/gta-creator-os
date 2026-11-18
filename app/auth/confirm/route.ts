import { NextResponse } from "next/server";
import { studioClient } from "../../supabase/server";
import { siteUrl } from "../../site";

export async function GET(request: Request) {
  const tokenHash = new URL(request.url).searchParams.get("token_hash");
  const client = tokenHash && tokenHash.length <= 256 ? await studioClient() : null;
  let destination = "/login?erro=link";
  if (client && tokenHash) {
    const { error } = await client.auth.verifyOtp({ token_hash: tokenHash, type: "email" });
    if (!error) destination = "/studio";
  }
  const response = NextResponse.redirect(new URL(destination, siteUrl), 303);
  response.headers.set("Cache-Control", "no-store");
  response.headers.set("Referrer-Policy", "no-referrer");
  return response;
}
