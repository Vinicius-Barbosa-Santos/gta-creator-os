import type { Metadata } from "next";
import { beginnerCoursePath, captureGuidePath } from "./site";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = { alternates: { canonical: "/" } };

const cards = [
  { href: "/noticias", category: "NOTÍCIAS", title: "O que acontece em GTA", cover: "/vice-city.webp", position: "object-[68%_center]" },
  { href: captureGuidePath, category: "GUIA GRATUITO", title: "Da captura ao primeiro clipe", cover: "/guia-captura.webp", position: "object-center" },
  { href: beginnerCoursePath, category: "CURSO EM PREPARAÇÃO", title: "GTA VI do zero no PS5", cover: "/portal-leonida.webp", position: "object-[76%_center]" },
];

export default function Home() {
  return (
    <main className="portal pb-12">
      <div className="portal-shell">
        <section className="portal-feature" aria-labelledby="portal-title">
          <Image src="/portal-leonida.webp" alt="" fill priority unoptimized className="portal-feature-art object-cover" />
          <div className="portal-feature-copy relative">
            <p className="portal-label">PORTAL INDEPENDENTE SOBRE GTA 6</p>
            <h1 id="portal-title" className="display mt-4">De olho em<br /><span>Vice City.</span></h1>
            <p className="mt-5 max-w-xs text-base leading-relaxed text-white">Notícias de GTA, guias em português e dicas para gravar no PS5.</p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Link href={beginnerCoursePath} className="portal-cta">Conhecer o curso <span aria-hidden="true">↗</span></Link>
              <Link href="/noticias" className="portal-secondary">Acompanhar notícias</Link>
            </div>
          </div>
        </section>
        <nav aria-label="Explorar o portal" className="mt-5 grid gap-5 sm:grid-cols-3 sm:mt-7">
          {cards.map((card) => (
            <Link key={card.href} href={card.href} className="portal-tile">
              <Image src={card.cover} alt="" fill unoptimized className={`object-cover ${card.position}`} />
              <div className="relative p-5 sm:p-6">
                <p className="portal-label">{card.category}</p>
                <h2 className="mt-2 text-xl font-black leading-tight sm:text-2xl">{card.title}</h2>
                <span className="mt-3 inline-block text-xl text-pink-200" aria-hidden="true">↗</span>
              </div>
            </Link>
          ))}
        </nav>
      </div>
    </main>
  );
}
