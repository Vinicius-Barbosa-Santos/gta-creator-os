import PageBanner from "../page-banner";
import type { Metadata } from "next";
import { googleHeadlines, googleNews } from "./feed";

export const metadata: Metadata = { title: "Notícias de GTA | GTA Creator OS" };
export const dynamic = "force-dynamic";

const confirmed = [
  {
    title: "GTA VI está previsto para 19 de novembro",
    summary: "A página oficial lista PlayStation 5 e Xbox Series X|S como plataformas de lançamento.",
    url: "https://www.rockstargames.com/VI",
  },
  {
    title: "Pré-carregamento digital disponível",
    summary: "A Rockstar anunciou a abertura do download antecipado em 10 de novembro. O espaço necessário varia conforme o dispositivo.",
    url: "https://www.rockstargames.com/br/newswire/article/k4ak9okk485712/grand-theft-auto-vi-pre-load-begins-on-november-10",
  },
  {
    title: "Rockstar publica galeria de lançamento",
    summary: "A galeria reúne novas imagens oficiais de Vice City e de outras áreas de Leonida.",
    url: "https://www.rockstargames.com/newswire/article/39ak81277255o9/explore-the-grand-theft-auto-vi-launch-gallery",
  },
];
const dateFormat = new Intl.DateTimeFormat("pt-BR", { dateStyle: "medium", timeZone: "America/Sao_Paulo" });

export default async function News() {
  const headlines = await googleHeadlines();

  return (
    <main className="shell py-12">
      <PageBanner title="Notícias de GTA" cover="/portal-leonida.webp">
        <p className="portal-label mt-3">GTA VI E GTA ONLINE</p>
      </PageBanner>
      <section className="mt-9" aria-labelledby="official-news">
        <h2 id="official-news" className="text-2xl font-bold">Confirmado pela Rockstar</h2>
        <p className="mt-2 text-sm text-neutral-400">Curadoria revisada em 18/11/2026.</p>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {confirmed.map((item) => (
            <article key={item.url} className="portal-card">
              <h3 className="text-lg font-bold">{item.title}</h3>
              <p className="my-3 text-neutral-300">{item.summary}</p>
              <a className="portal-secondary" href={item.url}>Ler na Rockstar ↗</a>
            </article>
          ))}
        </div>
      </section>
      <section className="mt-12" aria-labelledby="google-news">
        <h2 id="google-news" className="text-2xl font-bold">Cobertura no Google Notícias</h2>
        <p className="my-3 text-neutral-300">Manchetes de veículos externos. Confira a fonte antes de usar uma notícia como pauta.</p>
        {headlines.length > 0 ? (
          <ul className="divide-y divide-slate-700">
            {headlines.map((item) => (
              <li key={item.link} className="py-4">
                <a className="portal-secondary" href={item.link}>{item.title}</a>
                <p className="mt-2 text-sm text-neutral-400">{item.source || "Fonte externa"} · <time dateTime={item.date}>{dateFormat.format(new Date(item.date))}</time></p>
              </li>
            ))}
          </ul>
        ) : <p className="mb-4 text-neutral-400">O feed está indisponível. A busca direta continua acessível abaixo.</p>}
        <a className="portal-cta mt-4" href={googleNews}>Abrir busca no Google Notícias ↗</a>
      </section>
    </main>
  );
}
