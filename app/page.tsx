import Link from "next/link";

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="shell relative py-24 sm:py-36">
          <p className="eyebrow">GUIAS SOBRE GTA 6</p>
          <h1 className="display mt-5">DE OLHO EM<br /><span className="accent">VICE CITY.</span></h1>
          <p className="mt-6 max-w-md text-lg text-neutral-200">Guias em português para acompanhar GTA 6 e preparar suas gravações de gameplay no PS5.</p>
          <Link href="/guias" className="button mt-8">Explorar guias ↗</Link>
        </div>
      </section>
      <section className="shell grid gap-6 py-14 md:grid-cols-2">
        <article className="panel">
          <p className="eyebrow">LEITURA GRATUITA</p>
          <h2 className="mt-3 text-2xl font-bold">Da captura ao primeiro clipe</h2>
          <p className="mt-3 text-neutral-400">Prepare o OBS, teste imagem e áudio e escolha os melhores trechos da sua gravação.</p>
          <Link className="accent mt-5 inline-block" href="/guias#captura">Ler guia ↗</Link>
        </article>
        <article className="panel">
          <p className="eyebrow">GUIA PREMIUM EM PREPARAÇÃO</p>
          <h2 className="mt-3 text-2xl font-bold">Primeiras horas em Vice City</h2>
          <p className="mt-3 text-neutral-400">A proposta inclui rotas testadas no PS5, vídeos curtos e um checklist de progresso.</p>
          <Link className="accent mt-5 inline-block" href="/guias#premium">Ver proposta ↗</Link>
        </article>
      </section>
    </main>
  );
}
