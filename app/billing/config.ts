import Stripe from "stripe";

export function billingMode() {
  const value = process.env.STUDIO_BILLING_MODE;
  return value === "test" || value === "live" ? value : null;
}

export function stripeConfig() {
  const mode = billingMode();
  const key = process.env.STRIPE_SECRET_KEY;
  const priceId = process.env.STRIPE_STUDIO_PRICE_ID;
  if (!mode || !key?.startsWith(`sk_${mode}_`) || !priceId?.startsWith("price_")) return null;
  return { mode, priceId, stripe: new Stripe(key, { timeout: 10_000, maxNetworkRetries: 1 }) };
}
