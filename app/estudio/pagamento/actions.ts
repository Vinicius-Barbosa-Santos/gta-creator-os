"use server";

import { redirect } from "next/navigation";
import { studioBillingStatus } from "../../billing/access";
import { loadOffer } from "../../billing/offer";
import { accountIdentity } from "../../session";
import { adminClient } from "../../supabase/admin";
import { siteUrl } from "../../site";

const paymentPage = "/estudio/pagamento";

type Attempt = { attempt_id: string; expires_at: number; stripe_session_id: string | null };

export async function startCheckout() {
  const account = await accountIdentity();
  if (!account) redirect("/login");

  let destination = paymentPage + "?status=erro";
  try {
    const [offer, status] = await Promise.all([
      loadOffer(),
      studioBillingStatus(account.client),
    ]);
    const admin = adminClient();
    if (status.data?.entitled) destination = "/studio";
    else if (offer && admin && status.data?.mode === offer.mode) {
      const reserve = () => account.client.rpc("reserve_studio_checkout").single<Attempt>();
      const result = await reserve();
      let attempt = result.data;

      if (attempt?.stripe_session_id) {
        const prior = await offer.stripe.checkout.sessions.retrieve(attempt.stripe_session_id, {
          expand: ["payment_intent"],
        });
        if (prior.client_reference_id !== account.id || prior.livemode !== (offer.mode === "live")) {
          throw new Error("Checkout session mismatch");
        }
        const intent = prior.payment_intent;
        const canRotate = prior.status === "expired" && prior.payment_status === "unpaid" &&
          (intent === null || (typeof intent === "object" && intent.status === "canceled"));
        if (canRotate) {
          const { error } = await admin.rpc("rotate_studio_checkout", {
            account: account.id, environment: offer.mode,
            attempt: attempt.attempt_id, expired_session: prior.id,
          });
          if (error) throw error;
          attempt = (await reserve()).data;
        } else if (prior.status === "open" && prior.url && new URL(prior.url).origin === "https://checkout.stripe.com") {
          destination = prior.url;
        } else {
          destination = paymentPage + "?status=retorno";
        }
      }

      if (attempt && !attempt.stripe_session_id) {
        const session = await offer.stripe.checkout.sessions.create({
          mode: "payment",
          allowed_payment_method_types: ["card"],
          expires_at: attempt.expires_at,
          line_items: [{ price: offer.priceId, quantity: 1 }],
          client_reference_id: account.id,
          payment_intent_data: { metadata: { studio_account: account.id, studio_product: "access_v1" } },
          success_url: `${siteUrl}${paymentPage}?status=retorno`,
          cancel_url: `${siteUrl}${paymentPage}?status=cancelado`,
        }, { idempotencyKey: `studio-${attempt.attempt_id}` });
        const saved = await admin.rpc("store_studio_checkout", {
          account: account.id, environment: offer.mode,
          attempt: attempt.attempt_id, session_id: session.id,
        });
        if (!saved.error && saved.data && session.url && new URL(session.url).origin === "https://checkout.stripe.com") {
          destination = session.url;
        } else if (!saved.error && saved.data && session.status === "complete") {
          destination = paymentPage + "?status=retorno";
        }
      }
    }
  } catch {
    console.error("Studio checkout unavailable");
  }
  redirect(destination);
}
