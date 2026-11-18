import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { registrationEnabled } from "../billing/access";
import { register } from "./actions";

export const metadata: Metadata = { title: "Criar conta no Estúdio", robots: { index: false } };

export default async function Registration({ searchParams }: { searchParams: Promise<{ status?: string; erro?: string }> }) {
  if (!registrationEnabled()) redirect("/login");
  const { status, erro } = await searchParams;
  return (
    <main className="shell py-12">
      <section className="panel mx-auto grid max-w-xl gap-5">
        <h1 className="text-3xl font-black">Criar conta no Estúdio</h1>
        <p>Confirme seu e-mail para entrar na conta. O Estúdio será liberado após a confirmação do pagamento.</p>
        {status === "email" ? <p role="status">Se o cadastro puder prosseguir, você receberá um link por e-mail. Se já tem conta, entre pelo login.</p> : (
          <form action={register} className="grid gap-4">
            <label className="grid gap-2">E-mail
              <input name="email" type="email" autoComplete="email" maxLength={254} required />
            </label>
            <label className="grid gap-2">Senha
              <input name="password" type="password" autoComplete="new-password" minLength={12} maxLength={128} required />
            </label>
            <p className="text-sm text-neutral-300">Use ao menos 12 caracteres.</p>
            {erro && <p role="alert">{erro === "limite" ? "Aguarde antes de tentar novamente." : erro === "campos" ? "Confira o e-mail e os requisitos da senha." : "Cadastro indisponível no momento. Tente novamente."}</p>}
            <button type="submit" className="portal-cta w-fit">Criar conta</button>
          </form>
        )}
        <Link href="/login" className="portal-secondary w-fit">Já tenho conta →</Link>
      </section>
    </main>
  );
}
