import { redirect } from "next/navigation";
import { login } from "../actions";
import { authorized, configured } from "../session";

export default async function Login({ searchParams }: { searchParams: Promise<{ erro?: string }> }) {
  if (await authorized()) redirect("/studio");
  const enabled = configured();
  const { erro } = await searchParams;
  return (
    <main className="shell py-16">
      <section className="panel mx-auto max-w-md">
        <p className="eyebrow">ÁREA PRIVADA</p>
        <h1 className="mt-3 text-3xl font-black">Entrar no estúdio</h1>
        {enabled ? (
          <form action={login} className="mt-6 grid gap-4">
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
    </main>
  );
}
