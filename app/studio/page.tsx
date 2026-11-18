import WeeklyProduction from "./weekly-production";
import PageBanner from "../page-banner";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { logout, saveProfile } from "../actions";
import { studioIdentity } from "../session";
import { duration, isStage, stages, weeklyPlan, type Stage } from "../studio-plan";

export const dynamic = "force-dynamic";

export default async function Studio({ searchParams }: { searchParams: Promise<{ erro?: string }> }) {
  const identity = await studioIdentity();
  if (!identity) redirect("/login");

  let profile: { name: string; hours: number; stage: Stage } | undefined;
  let profileFailed = false;
  if (identity.kind === "account") {
    const { data, error } = await identity.client.from("studio_profiles")
      .select("channel_name, weekly_hours, stage").eq("user_id", identity.id).maybeSingle();
    profileFailed = Boolean(error);
    if (data && isStage(data.stage)) {
      profile = { name: data.channel_name, hours: data.weekly_hours, stage: data.stage };
    }
  } else try {
    const saved = JSON.parse((await cookies()).get("studio-profile")?.value ?? "null");
    if (typeof saved?.name === "string" && Number.isInteger(saved.hours) && saved.hours >= 1 && saved.hours <= 40) {
      profile = { name: saved.name, hours: saved.hours, stage: isStage(saved.stage) ? saved.stage : "captura" };
    }
  } catch {
    // Um perfil inválido volta para a configuração inicial.
  }
  const { erro } = await searchParams;
  const plan = profile ? weeklyPlan(profile.hours, profile.stage) : undefined;

  return (
    <main className="shell py-10">
      <div className="mb-6">
        <PageBanner title={profile?.name ?? "Configure seu canal"} cover="/guia-captura.webp">
          <nav className="mt-5 flex flex-wrap items-center gap-4" aria-label="Ferramentas do estúdio">
            <Link href="/studio/producao" className="portal-cta">Produção e agenda</Link>
            <Link href="/studio/plano" className="portal-secondary">Plano editorial</Link>
            <Link href="/studio/criativos" className="portal-secondary">Thumbnails e vinhetas</Link>
            <form action={logout}><button className="portal-secondary cursor-pointer">Sair</button></form>
          </nav>
        </PageBanner>
      </div>
      {erro === "sair" && <p role="alert" className="mb-4 text-rose-300">Não foi possível sair. Tente novamente.</p>}
      <div className="grid gap-6 md:grid-cols-2">
        <section className="panel">
          <p className="eyebrow">PLANO DA SEMANA</p>
          {profile && plan ? (
            <>
              <h2 className="mt-3 text-2xl font-bold">{stages[profile.stage].label}</h2>
              <p className="mt-3 text-neutral-300">
                {duration(plan.total)} em tarefas sugeridas. Limite de {duration(plan.budget)} para produção e {duration(plan.reserve)} reservados para imprevistos.
              </p>
              <ol className="mt-5 divide-y divide-slate-700">
                {plan.tasks.map((task, index) => (
                  <li key={task.title} className="flex items-start justify-between gap-4 py-3">
                    <span>{index === 0 && <span className="accent block text-sm">Próxima ação</span>}{task.title}</span>
                    <span className="shrink-0 text-sm text-neutral-300">{duration(task.minutes)}</span>
                  </li>
                ))}
              </ol>
            </>
          ) : (
            <p className="mt-3 text-neutral-300">Preencha o perfil para gerar o plano com base no seu tempo e no estágio do canal.</p>
          )}
        </section>
        <WeeklyProduction key={identity.kind === "account" ? identity.id : "local"} accountId={identity.kind === "account" ? identity.id : undefined} />
        <section id="perfil" className="panel md:col-span-2">
          <h2 className="text-2xl font-bold">Perfil do canal</h2>
          <form action={saveProfile} className="mt-5 grid items-end gap-4 sm:grid-cols-2">
            <label className="grid gap-2">Nome do canal<input name="name" defaultValue={profile?.name} required maxLength={60} /></label>
            <label className="grid gap-2">Horas por semana<input name="hours" type="number" min={1} max={40} defaultValue={profile?.hours ?? 8} required /></label>
            <label className="grid gap-2">Etapa atual
              <select className="w-full " name="stage" defaultValue={profile?.stage ?? "captura"}>
                {Object.entries(stages).map(([key, stage]) => <option key={key} value={key}>{stage.label}</option>)}
              </select>
            </label>
            <button className="button">Salvar e gerar plano</button>
            {erro === "perfil" && <p role="alert" className="text-rose-300">Informe um nome e uma disponibilidade entre 1 e 40 horas.</p>}
            {(erro === "salvar" || profileFailed) && <p role="alert" className="text-rose-300">Não foi possível acessar o perfil no banco. Tente novamente.</p>}
          </form>
          <p className="mt-4 text-sm text-neutral-400">{identity.kind === "account" ? "O perfil fica salvo na sua conta." : "O perfil fica salvo neste navegador."}</p>
        </section>
      </div>
    </main>
  );
}
