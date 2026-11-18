import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
} as const;

export function configured() {
  const key = process.env.STUDIO_ACCESS_KEY;
  const secret = process.env.STUDIO_SESSION_SECRET;
  return Boolean(key && secret && key !== secret && key.length >= 32 && secret.length >= 32);
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

export async function authorized() {
  if (!configured()) return false;
  const token = (await cookies()).get("studio-session")?.value;
  if (!token) return false;
  const [expiration, signature] = token.split(".");
  return Boolean(signature && /^\d+$/.test(expiration) && Number(expiration) > Date.now() && equal(signature, sign(expiration)));
}
