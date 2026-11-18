import PageBanner from "../page-banner";
import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import { beginnerCoursePath, captureGuidePath } from "../site";
import { editorialGuides } from "./editorial-guides";

export const metadata: Metadata = {
  title: "Guias de GTA 6 e gravação no PS5",
  description: "Guias em português sobre GTA 6, captura de gameplay do PS5 e produção de Shorts.",
  alternates: { canonical: "/guias" },
};

export default function Guias() {
  return (
    <main className="shell grid gap-6 py-12">
      <PageBanner title="Guias do Viny Plays" cover="/vice-city.webp" />
      <article id="captura" className="portal-card grid overflow-hidden !p-0 md:grid-cols-[1fr_2fr]">
        <div className="relative aspect-video md:aspect-auto">
          <Image
            src="/guia-captura.webp"
            alt="Mesa com console, placa de captura e monitores para gravar gameplay"
            fill
            unoptimized
            className="object-cover"
          />
        </div>
        <div className="p-5 sm:p-8">
          <p className="eyebrow">LEITURA GRATUITA</p>
          <h2 className="mt-3 text-3xl font-bold">Meu setup de captura no OBS</h2>
          <p className="mt-4 max-w-prose text-neutral-300">
            Veja como conectei o PS5 ao Mac, separei a voz do áudio do jogo e diagnostiquei as travadas no teste em 4K.
          </p>
          <Link href={captureGuidePath} className="portal-secondary mt-5 inline-block">Ver conexões e configuração →</Link>
        </div>
      </article>
      {[
        {
          slug: "gameplay-para-short",
          cover: "/guias/shorts.webp",
          alt: "Celular e monitor mostrando enquadramentos diferentes da mesma cena",
          title: "Da gameplay ao Short",
          description: "Compare a imagem horizontal e o recorte vertical numa demonstração interativa.",
        },
        ...editorialGuides,
      ].map((guide) => (
        <article key={guide.slug} className="portal-card grid overflow-hidden !p-0 md:grid-cols-[1fr_2fr]">
          <div className="relative aspect-video md:aspect-auto md:min-h-48">
            <Image src={guide.cover} alt={guide.alt} fill unoptimized className="object-cover" />
          </div>
          <div className="p-5 sm:p-8">
            <h2 className="text-3xl font-bold">{guide.title}</h2>
            <p className="mt-3 text-neutral-300">{guide.description}</p>
            <Link href={`/guias/${guide.slug}`} className="portal-secondary mt-4 inline-block" aria-label={`Abrir guia: ${guide.title}`}>
              Abrir guia →
            </Link>
          </div>
        </article>
      ))}
      <article id="premium" className="portal-card portal-card-premium grid overflow-hidden !p-0 md:grid-cols-[1fr_2fr]">
        <div className="relative aspect-video md:aspect-auto md:min-h-48">
          <Image
            src="/vice-city.webp"
            alt="Ilustração de uma avenida costeira com palmeiras e um carro ao pôr do sol"
            fill
            unoptimized
            className="object-cover object-[65%_center]"
          />
        </div>
        <div className="p-5 sm:p-8">
          <p className="eyebrow">EM PREPARAÇÃO</p>
          <h2 className="mt-3 text-3xl font-bold">GTA VI do zero no PS5</h2>
          <p className="mt-4 text-neutral-300">Conheça a trilha de aulas para as primeiras horas no jogo e leia a prévia gratuita.</p>
          <Link className="portal-secondary mt-4 inline-block" href={beginnerCoursePath}>Ver o curso →</Link>
        </div>
      </article>
    </main>
  );
}
