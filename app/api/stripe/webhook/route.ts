import { createClient } from "@supabase/supabase-js";
import type Stripe from "stripe";
import { stripeConfig } from "../../../billing/config";
import { supabaseConfig } from "../../../supabase/config";

export const runtime = "nodejs";

const uuid = /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i;

export async function POST(request: Request) {
  const config = stripeConfig();
  const database = supabaseConfig();
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const signingSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!config || !database || !serviceKey || !signingSecret) return new Response(null, { status: 503 });

  const signature = request.headers.get("stripe-signature");
  if (!signature) return new Response(null, { status: 400 });
  let event: Stripe.Event;
  try {
    event = config.stripe.webhooks.constructEvent(await request.text(), signature, signingSecret);
  } catch {
    return new Response(null, { status: 400 });
  }
  if (event.livemode !== (config.mode === "live")) return new Response(null, { status: 400 });

  try {
    let intent: Stripe.PaymentIntent;
    let revoke = false;
    switch (event.type) {
      case "payment_intent.succeeded":
        intent = event.data.object;
        break;
      case "charge.refunded":
      case "charge.dispute.created": {
        const charge = event.data.object;
        if (event.type === "charge.refunded" && !event.data.object.refunded) return new Response(null, { status: 204 });
        const id = typeof charge.payment_intent === "string" ? charge.payment_intent : charge.payment_intent?.id;
        if (!id) return new Response(null, { status: 204 });
        intent = await config.stripe.paymentIntents.retrieve(id);
        revoke = true;
        break;
      }
      default:
        return new Response(null, { status: 204 });
    }

    const account = intent.metadata.studio_account;
    if (intent.metadata.studio_product !== "access_v1" || !account || !uuid.test(account) ||
        intent.currency !== "brl" || intent.amount_received <= 0 || intent.status !== "succeeded") {
      return new Response(null, { status: 204 });
    }

    const client = createClient(database.url, serviceKey, { auth: { persistSession: false, autoRefreshToken: false } });
    const { error } = await client.rpc("record_studio_payment", {
      intent: intent.id,
      account,
      is_live: event.livemode,
      is_revoked: revoke,
    });
    if (error) throw error;
    return new Response(null, { status: 204 });
  } catch {
    console.error("Studio payment reconciliation failed");
    return new Response(null, { status: 500 });
  }
}
