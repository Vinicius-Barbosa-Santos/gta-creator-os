import type { Metadata } from "next";
import Link from "next/link";
import PageBanner from "../page-banner";

export const metadata: Metadata = {
  title: "Demonstração do Estúdio | GTA Creator OS",
  description: "Veja como organizar pautas, acompanhar vídeos de gameplay e revisar os resultados.",
};

const board = [
  { title: "Ideias", items: [{ title: "3 coisas que eu faria na primeira sessão", format: "Short" }] },
  { title: "Em produção", items: [
    { title: "Primeiras impressões no PS5", format: "Vídeo longo" },
    { title: "Como eu escolho o melhor trecho da gravação", format: "Short" },
  ] },
  { title: "Publicados", items: [
    { title: "Como eu gravo o PS5 no Mac com OBS", format: "Vídeo longo" },
    { title: "Meu teste de captura em 30 segundos", format: "Short" },
  ] },
];

const snapshots = [
  { period: "48 horas", views: "380", impressions: "4.800", ctr: "4,2%", retention: "36%" },
  { period: "7 dias", views: "1.240", impressions: "16.000", ctr: "4,7%", retention: "39%" },
];

export default function StudioDemo() {
  return (
    <main className="shell grid gap-6 py-10">
      <PageBanner title="Conheça o Estúdio" cover="/portal-leonida.webp">
        <Link href="/login" className="portal-secondary mt-4 inline-block">Entrar no Estúdio ↗</Link>
      </PageBanner>
      <aside className="panel" aria-label="Sobre os dados da demonstração">
        <p className="eyebrow">DEMONSTRAÇÃO SOMENTE PARA LEITURA</p>
        <p className="mt-2 text-neutral-300">Pautas, métricas e resultados desta página são fictícios. Use os exemplos para conhecer o fluxo de produção.</p>
      </aside>
      <section aria-labelledby="demo-board">
        <h2 id="demo-board" className="mb-4 text-2xl font-bold">Quadro de produção</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {board.map((lane) => (
            <section key={lane.title} className="panel">
              <h3 className="font-bold">{lane.title}</h3>
              <ul className="mt-4 grid gap-3">
                {lane.items.map((item) => (
                  <li key={item.title} className="studio-lane rounded-xl p-3">
                    <p className="text-sm text-pink-200">{item.format}</p>
                    <p className="mt-1 font-semibold">{item.title}</p>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </section>
      <div className="grid gap-4 lg:grid-cols-[3fr_2fr]">
        <section className="panel min-w-0">
          <h2 className="text-2xl font-bold">Desempenho por publicação</h2>
          <p className="mt-2 text-neutral-300">Como eu gravo o PS5 no Mac com OBS</p>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-max text-left text-sm">
              <thead>
                <tr>{["Período", "Visualizações", "Impressões", "CTR", "% assistido"].map((label) => <th key={label} scope="col" className="p-2">{label}</th>)}</tr>
              </thead>
              <tbody>
                {snapshots.map((row) => (
                  <tr key={row.period} className="border-t border-white/15">
                    <th scope="row" className="p-2">{row.period}</th>
                    <td className="p-2">{row.views}</td><td className="p-2">{row.impressions}</td><td className="p-2">{row.ctr}</td><td className="p-2">{row.retention}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <section className="panel">
          <h2 className="text-2xl font-bold">Revisão semanal</h2>
          <p className="mt-3 text-neutral-300">No cenário de exemplo, o público perdeu interesse durante a explicação do setup.</p>
          <h3 className="mt-4 font-bold">Próximo teste</h3>
          <p className="mt-2 text-neutral-300">Mostrar o resultado da gravação nos primeiros 10 segundos e comparar a retenção após sete dias.</p>
        </section>
      </div>
    </main>
  );
}
