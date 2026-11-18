"use server";

import { redirect } from "next/navigation";
import { loadOffer } from "../../billing/offer";
import { accountIdentity } from "../../session";
import { siteUrl } from "../../site";

export async function startCheckout() {
  const account = await accountIdentity();
  if (!account) redirect("/login");

  let destination: string | null = null;
  try {
    const [offer, status] = await Promise.all([
      loadOffer(),
      account.client.rpc("studio_billing_status").single<{ mode: string; entitled: boolean }>(),
    ]);
    if (status.data?.entitled) destination = "/studio";
    else if (offer && status.data?.mode === offer.mode) {
      const { data: attempt } = await account.client.rpc("reserve_studio_checkout").single<{
        attempt_id: string;
        expires_at: number;
      }>();
      if (!attempt) throw new Error("Checkout reservation unavailable");
      const session = await offer.stripe.checkout.sessions.create({
        mode: "payment",
        expires_at: attempt.expires_at,
        line_items: [{ price: offer.priceId, quantity: 1 }],
        client_reference_id: account.id,
        payment_intent_data: { metadata: { studio_account: account.id, studio_product: "access_v1" } },
        success_url: `${siteUrl}/estudio/pagamento?status=retorno`,
        cancel_url: `${siteUrl}/estudio/pagamento?status=cancelado`,
      }, { idempotencyKey: `studio-${attempt.attempt_id}` });
      if (session.url && new URL(session.url).origin === "https://checkout.stripe.com") destination = session.url;
    }
  } catch {
    console.error("Studio checkout unavailable");
  }
  redirect(destination ?? "/estudio/pagamento?status=erro");
}
