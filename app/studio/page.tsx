import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { logout, saveProfile } from "../actions";
import { authorized } from "../session";

export default async function Studio({ searchParams }: { searchParams: Promise<{ erro?: string }> }) {
  if (!(await authorized())) redirect("/login");

  let profile: { name: string; hours: number } | undefined;
  try {
    const saved = JSON.parse((await cookies()).get("studio-profile")?.value ?? "null");
    if (typeof saved?.name === "string" && Number.isInteger(saved.hours) && saved.hours >= 1 && saved.hours <= 40) {
      profile = saved;
    }
  } catch {
    // Um perfil inválido volta para a configuração inicial.
  }
  const { erro } = await searchParams;

  return (
    <main className="shell py-10">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="eyebrow">ESTÚDIO PRIVADO</p>
          <h1 className="mt-2 text-4xl font-black">{profile?.name ?? "Configure seu canal"}</h1>
        </div>
        <form action={logout}><button className="accent cursor-pointer">Sair</button></form>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <section className="panel">
          <p className="eyebrow">PRÓXIMA AÇÃO SUGERIDA</p>
          <h2 className="mt-3 text-2xl font-bold">Revise um teste de captura</h2>
          <p className="mt-3 text-neutral-300">Grave um trecho no PS5 e confira fluidez, áudio e sincronismo no arquivo salvo pelo OBS.</p>
          {profile && <p className="mt-5 text-neutral-300">Reserve 20% para imprevistos. Capacidade planejada de {(profile.hours * 0.8).toLocaleString("pt-BR")} h por semana.</p>}
        </section>
        <section className="panel">
          <p className="eyebrow">DADOS FICTÍCIOS PARA DEMONSTRAÇÃO</p>
          <h2 className="mt-3 text-2xl font-bold">Produção da semana</h2>
          <dl className="mt-5 grid grid-cols-2 gap-4">
            <div><dt>Vídeos longos</dt><dd className="accent text-4xl font-black">1</dd></div>
            <div><dt>Shorts</dt><dd className="accent text-4xl font-black">2</dd></div>
          </dl>
        </section>
        <section id="perfil" className="panel md:col-span-2">
          <h2 className="text-2xl font-bold">Perfil do canal</h2>
          <form action={saveProfile} className="mt-5 grid items-end gap-4 sm:grid-cols-[2fr_1fr_auto]">
            <label className="grid gap-2">Nome do canal<input name="name" defaultValue={profile?.name} required maxLength={60} /></label>
            <label className="grid gap-2">Horas por semana<input name="hours" type="number" min={1} max={40} defaultValue={profile?.hours ?? 8} required /></label>
            <button className="button">Salvar perfil</button>
            {erro && <p role="alert" className="text-rose-300">Informe um nome e uma disponibilidade entre 1 e 40 horas.</p>}
          </form>
          <p className="mt-4 text-sm text-neutral-400">O perfil fica salvo neste navegador.</p>
        </section>
      </div>
    </main>
  );
}
