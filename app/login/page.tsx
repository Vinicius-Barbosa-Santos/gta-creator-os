import PageBanner from "../page-banner";
import { redirect } from "next/navigation";
import { login } from "../actions";
import { authorized, configured } from "../session";

export default async function Login({ searchParams }: { searchParams: Promise<{ erro?: string }> }) {
  if (await authorized()) redirect("/studio");
  const enabled = configured();
  const { erro } = await searchParams;
  return (
    <main className="shell py-16">
      <div className="mx-auto grid max-w-2xl gap-4">
        <PageBanner title="Entrar no estúdio" cover="/guia-captura.webp">
          <p className="portal-label mt-3">ÁREA PRIVADA</p>
        </PageBanner>
        <section className="panel">
          {enabled ? (
            <form action={login} className="grid gap-4">
              <label className="grid gap-2">Chave de acesso
                <input type="password" name="key" autoComplete="current-password" required maxLength={256} />
              </label>
              {erro && <p role="alert" className="text-rose-300">Chave de acesso inválida.</p>}
              <button className="button">Entrar</button>
            </form>
          ) : (
            <p className="mt-5 text-neutral-300">O acesso privado fica disponível após a configuração do estúdio.</p>
          )}
        </section>
      </div>
    </main>
  );
}
