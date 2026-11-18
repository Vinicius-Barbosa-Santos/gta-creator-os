import PasswordField from "./password-field";
import PageBanner from "../page-banner";
import { redirect } from "next/navigation";
import { login } from "../actions";
import { authorized, configured } from "../session";
import { supabaseConfig, usesSupabase } from "../supabase/config";

export default async function Login({ searchParams }: { searchParams: Promise<{ erro?: string }> }) {
  if (await authorized()) redirect("/studio");
  const accountMode = usesSupabase();
  const enabled = accountMode ? Boolean(supabaseConfig()) : configured();
  const { erro } = await searchParams;
  return (
    <main className="shell py-16">
      <div className="mx-auto grid max-w-2xl gap-4">
        <PageBanner title="Entrar no estúdio" cover="/guia-captura.webp">
          <p className="portal-label mt-3">ÁREA PRIVADA</p>
        </PageBanner>
        <section className="panel login-panel">
          {enabled ? (
            <form action={login} className="grid gap-5">
              {accountMode && (
                <label className="login-label grid gap-2">E-mail
                  <input type="email" name="email" autoComplete="username" placeholder="seu@email.com" required maxLength={254} />
                </label>
              )}
              <PasswordField accountMode={accountMode} />
              {erro && <p role="alert" className="login-error">Não foi possível entrar. Confira suas credenciais.</p>}
              <button className="button login-submit">Entrar no estúdio <span aria-hidden="true">→</span></button>
            </form>
          ) : (
            <p className="mt-5 text-neutral-300">O acesso privado fica disponível após a configuração do estúdio.</p>
          )}
        </section>
      </div>
    </main>
  );
}
