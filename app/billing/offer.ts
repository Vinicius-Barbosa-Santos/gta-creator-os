import { stripeConfig } from "./config";

export async function loadOffer() {
  const config = stripeConfig();
  if (!config || !process.env.STRIPE_WEBHOOK_SECRET?.startsWith("whsec_") ||
      !process.env.SUPABASE_SERVICE_ROLE_KEY) return null;
  const price = await config.stripe.prices.retrieve(config.priceId);
  if (!price.active || price.type !== "one_time" || price.currency !== "brl" ||
      !price.unit_amount || price.livemode !== (config.mode === "live")) return null;
  return { ...config, amount: price.unit_amount };
}
