import Link from "next/link";

export default function Home() {
  return (
    <main className="portal">
      <section className="hero">
        <div className="shell relative flex min-h-[min(42rem,78svh)] flex-col justify-end py-16 sm:justify-center sm:py-24">
          <p className="portal-label">PORTAL INDEPENDENTE SOBRE GTA 6</p>
          <h1 className="display mt-5">DE OLHO EM<br /><span>VICE CITY.</span></h1>
          <p className="mt-6 max-w-sm text-base leading-relaxed text-white sm:text-lg">
            Guias em português para acompanhar GTA 6 e preparar suas gravações no PS5.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-4">
            <Link href="/guias#captura" className="portal-cta">Ler guia gratuito <span aria-hidden="true">↗</span></Link>
            <Link href="/guias#premium" className="portal-secondary">Conhecer o premium</Link>
          </div>
        </div>
      </section>
      <section aria-labelledby="guides-title" className="shell py-12 sm:py-16">
        <h2 id="guides-title" className="mb-6 text-3xl font-black tracking-tight sm:text-4xl">Guias do portal</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <article className="portal-card">
            <p className="portal-label">GRATUITO · PS5 E OBS</p>
            <h3 className="mt-3 text-2xl font-black">Da captura ao primeiro clipe</h3>
            <p className="mt-3 text-neutral-300">Teste imagem, áudio e sincronismo e escolha um trecho para seu primeiro Short.</p>
            <Link className="portal-secondary mt-6 inline-block" href="/guias#captura">Abrir guia <span aria-hidden="true">↗</span></Link>
          </article>
          <article className="portal-card portal-card-premium">
            <p className="portal-label">PREMIUM · EM PREPARAÇÃO</p>
            <h3 className="mt-3 text-2xl font-black">Primeiras horas em Vice City</h3>
            <p className="mt-3 text-neutral-300">A proposta reúne rotas para testar no PS5, demonstrações curtas e um checklist de progresso.</p>
            <Link className="portal-secondary mt-6 inline-block" href="/guias#premium">Ver proposta <span aria-hidden="true">↗</span></Link>
          </article>
        </div>
      </section>
    </main>
  );
}
