import type { Metadata } from "next";
import Link from "next/link";
import { logout } from "../../actions";
import { accountIdentity } from "../../session";
import { loadOffer } from "../../billing/offer";
import { startCheckout } from "./actions";

export const metadata: Metadata = { title: "Acesso ao Estúdio", robots: { index: false } };

export default async function PaymentPage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const [account, { status }] = await Promise.all([accountIdentity(), searchParams]);
  const access = account
    ? await account.client.rpc("studio_billing_status").single<{ mode: string; entitled: boolean }>()
    : null;
  const offer = access?.data && !access.data.entitled ? await loadOffer().catch(() => null) : null;
  const available = offer && access?.data?.mode === offer.mode;

  return (
    <main className="shell py-12">
      <section className="panel grid max-w-xl gap-4">
        <h1 className="text-3xl font-black">Acesso ao Estúdio Viny Plays</h1>
        <p>Organize pautas, roteiros e publicações no seu próprio quadro.</p>
        {!account ? <Link className="portal-secondary" href="/login">Entrar na sua conta →</Link>
          : access?.data?.entitled ? <Link className="portal-secondary" href="/studio">Abrir o Estúdio →</Link>
          : available ? (
            <form action={startCheckout} className="grid justify-items-start gap-3">
              {offer.mode === "test" && <p>Ambiente de teste</p>}
              <p>{new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(offer.amount / 100)} em pagamento único.</p>
              {status === "retorno" ? <p role="status">Aguardando a confirmação do pagamento. Atualize esta página em instantes.</p> : (
                <>
                  {status === "erro" && <p role="alert">O checkout está indisponível no momento. Tente novamente.</p>}
                  {status === "cancelado" && <p role="status">Você voltou do checkout. Se quiser, pode retomar o pagamento.</p>}
                  <button className="portal-cta" type="submit">Ir para o pagamento</button>
                </>
              )}
            </form>
          ) : <p>O pagamento ainda não está disponível para esta conta.</p>}
        {account && <form action={logout}><button type="submit" className="portal-secondary">Sair da conta</button></form>}
      </section>
    </main>
  );
}
