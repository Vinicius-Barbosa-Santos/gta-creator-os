import Link from "next/link";
import { redirect } from "next/navigation";
import PageBanner from "../../page-banner";
import { studioIdentity } from "../../session";
import { isPublished, publicationToday } from "../producao/model.mjs";
import { accountEntries } from "../producao/database";
import { saveReview, saveSnapshot } from "./actions";

export const dynamic = "force-dynamic";

export default async function Analytics({ searchParams }: { searchParams: Promise<{ estado?: string }> }) {
  const account = await studioIdentity();
  if (!account) redirect("/login");
  const { estado } = await searchParams;

  const date = new Date(publicationToday() + "T12:00Z");
  date.setUTCDate(date.getUTCDate() - ((date.getUTCDay() + 6) % 7));
  const monday = date.toISOString().slice(0, 10);
  const data = account.kind === "account" ? await Promise.all([
    accountEntries(account).catch(() => null),
    account.client.from("studio_snapshots").select("*").eq("user_id", account.id).order("captured_at", { ascending: false }).limit(30),
    account.client.from("studio_reviews").select("*").eq("user_id", account.id).order("week_start", { ascending: false }).limit(12),
  ]) : null;
  const entries = data?.[0];
  const snapshots = data?.[1].data ?? [];
  const reviews = data?.[2].data ?? [];
  const ready = Boolean(entries && !data?.[1].error && !data?.[2].error);
  const published = entries?.filter((entry) => isPublished(entry.stage)) ?? [];
  const titles = new Map(entries?.map((entry) => [entry.id, entry.title]));
  const currentReview = reviews.find((review) => review.week_start === monday);

  return (
    <main className="shell grid gap-6 py-10">
      <PageBanner title="Acompanhamento do canal" cover="/portal-leonida.webp">
        <Link href="/studio" className="portal-secondary mt-4 inline-block">← Estúdio</Link>
      </PageBanner>
      {estado === "salvo" && <p role="status">Registro salvo na sua conta.</p>}
      {estado === "dados" && <p role="alert">Confira o link, as métricas e a data. A revisão deve começar em uma segunda-feira.</p>}
      {estado === "erro" && <p role="alert">Não foi possível salvar. Tente novamente.</p>}
      {!ready && <p className="panel">O histórico precisa de uma conta conectada e das tabelas de acompanhamento disponíveis no Supabase.</p>}
      {ready && (
        <>
          <section className="panel">
            <h2 className="text-2xl font-bold">Registrar desempenho</h2>
            <p className="mt-2 text-neutral-300">No YouTube Studio, selecione o mesmo período que vai registrar aqui. Salvar novamente o mesmo vídeo e período substitui a medição anterior.</p>
            {published.length ? (
              <form action={saveSnapshot} className="mt-5 grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2">Publicação<select name="entry" required>{published.map((entry) => <option key={entry.id} value={entry.id}>{entry.title}</option>)}</select></label>
                <label className="grid gap-2">Período<select name="window"><option value="48">Primeiras 48 horas</option><option value="168">Primeiros 7 dias</option></select></label>
                <label className="grid gap-2">Link do YouTube<input type="url" name="video" required maxLength={200} /></label>
                <label className="grid gap-2">Série (opcional)<input name="series" maxLength={80} /></label>
                <label className="grid gap-2">Visualizações<input name="views" type="number" min={0} max={1_000_000_000} required /></label>
                <label className="grid gap-2">Impressões (opcional)<input name="impressions" type="number" min={0} max={1_000_000_000} /></label>
                <label className="grid gap-2">Taxa de cliques, % (opcional)<input name="ctr" type="number" min={0} max={100} step="0.01" /></label>
                <label className="grid gap-2">Porcentagem média assistida (opcional)<input name="retention" type="number" min={0} max={100} step="0.01" /></label>
                <button className="button justify-self-start">Salvar medição</button>
              </form>
            ) : <Link className="portal-secondary mt-4 inline-block" href="/studio/producao">Marcar um conteúdo como publicado ↗</Link>}
            <ul className="mt-5 grid gap-3">{snapshots.map((row) => (
              <li key={`${row.entry_id}:${row.window_hours}`} className="studio-lane rounded-xl p-4">
                <a className="portal-secondary" href={row.video_url.startsWith("https://www.youtube.com/watch?v=") ? row.video_url : "https://www.youtube.com/"}>{titles.get(row.entry_id) ?? "Publicação"}</a>
                <p className="mt-2 text-neutral-300">{row.series && `${row.series} · `}{row.window_hours === 48 ? "48 horas" : "7 dias"} · {row.views.toLocaleString("pt-BR")} visualizações</p>
                <p className="text-sm text-neutral-300">{row.impressions ?? "—"} impressões · {row.ctr ?? "—"}% cliques · {row.retention ?? "—"}% assistido</p>
              </li>
            ))}</ul>
          </section>
          <section className="panel">
            <h2 className="text-2xl font-bold">Revisão semanal</h2>
            <form action={saveReview} className="mt-5 grid gap-4">
              <label className="grid gap-2">Semana iniciada em<input type="date" name="week" defaultValue={monday} required /></label>
              <label className="grid gap-2">O que funcionou e onde o público saiu?<textarea name="observation" maxLength={800} defaultValue={currentReview?.observation} required /></label>
              <label className="grid gap-2">O que vou testar no próximo vídeo?<textarea name="experiment" maxLength={800} defaultValue={currentReview?.experiment} required /></label>
              <button className="button justify-self-start">Salvar revisão</button>
            </form>
            <ul className="mt-5 grid gap-3">{reviews.map((review) => (
              <li key={review.week_start} className="studio-lane rounded-xl p-4">
                <time dateTime={review.week_start} className="font-bold">{review.week_start.split("-").reverse().join("/")}</time>
                <p className="mt-2 break-words">{review.observation}</p>
                <p className="mt-2 break-words text-pink-200">{review.experiment}</p>
              </li>
            ))}</ul>
          </section>
        </>
      )}
      <section className="panel">
        <h2 className="text-2xl font-bold">Guia rápido do YouTube Studio</h2>
        <ul className="mt-4 grid gap-3 text-neutral-300">
          <li><strong>Alcance.</strong> Compare impressões e taxa de cliques entre vídeos do mesmo formato e período. Se a taxa cair, teste um título ou uma thumbnail de cada vez. <a className="portal-secondary" href="https://support.google.com/youtube/answer/9314355?hl=pt-BR">Entender alcance</a></li>
          <li><strong>Retenção.</strong> Veja os momentos de queda e registre como pretende mudar a abertura ou o ritmo. <a className="portal-secondary" href="https://support.google.com/youtube/answer/9314415?hl=pt-BR">Ler sobre retenção</a></li>
          <li><strong>Shorts.</strong> Compare Shorts entre si e anote as visualizações engajadas na revisão quando forem relevantes. <a className="portal-secondary" href="https://support.google.com/youtube/answer/12220281?hl=pt-BR">Ler sobre métricas por formato</a></li>
          <li><strong>Ganhos.</strong> Consulte a elegibilidade no YouTube Studio e os requisitos oficiais. <a className="portal-secondary" href="https://support.google.com/youtube/answer/13429240?hl=pt-BR">Programa de Parcerias</a></li>
        </ul>
      </section>
    </main>
  );
}
