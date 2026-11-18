import PasswordField from "./password-field";
import PageBanner from "../page-banner";
import { redirect } from "next/navigation";
import { login } from "../actions";
import { authorized, configured } from "../session";
import { supabaseConfig, usesSupabase } from "../supabase/config";

const loginErrors = {
  acesso: "E-mail ou senha inválidos. Use as credenciais de um usuário criado para o Estúdio.",
  confirmacao: "O e-mail da conta ainda não foi confirmado.",
  limite: "Muitas tentativas. Aguarde um pouco antes de tentar novamente.",
  conexao: "O Estúdio não conseguiu conectar ao serviço de login. Tente novamente em instantes.",
};

export default async function Login({ searchParams }: { searchParams: Promise<{ erro?: string }> }) {
  if (await authorized()) redirect("/studio");
  const accountMode = usesSupabase();
  const enabled = accountMode ? Boolean(supabaseConfig()) : configured();
  const { erro } = await searchParams;
  const errorMessage = erro && Object.hasOwn(loginErrors, erro)
    ? loginErrors[erro as keyof typeof loginErrors]
    : undefined;
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
                  <input type="email" name="email" autoComplete="section-studio-account username" placeholder="seu@email.com" required maxLength={254} />
                </label>
              )}
              <PasswordField accountMode={accountMode} />
              {errorMessage && <p role="alert" className="login-error">{accountMode ? errorMessage : "Chave de acesso inválida."}</p>}
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
