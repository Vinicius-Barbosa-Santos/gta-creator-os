import PageBanner from "../page-banner";
import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import { captureGuidePath } from "../site";

export const metadata: Metadata = {
  title: "Guias de GTA 6 e gravação no PS5",
  description: "Guias em português sobre GTA 6, captura de gameplay do PS5 e produção de Shorts.",
  alternates: { canonical: "/guias" },
};

export default function Guias() {
  return (
    <main className="shell grid gap-6 py-12">
      <PageBanner title="Guias" cover="/vice-city.webp" />
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
          <h2 className="mt-3 text-3xl font-bold">Da captura ao primeiro clipe</h2>
          <p className="mt-4 max-w-prose text-neutral-300">
            Jogue no monitor e grave no MacBook com a placa de captura FY-1133 e o OBS. Depois do teste, escolha um trecho e revise o enquadramento vertical e as legendas antes de publicar um Short.
          </p>
          <Link href={captureGuidePath} className="portal-secondary mt-5 inline-block">Ver conexões e configuração →</Link>
        </div>
      </article>
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
          <h2 className="mt-3 text-3xl font-bold">Primeiras horas em Vice City</h2>
          <p className="mt-4 text-neutral-300">Guia planejado com rotas testadas no PS5, demonstrações em vídeo e checklist de progresso. Compra avulsa quando o conteúdo estiver pronto.</p>
        </div>
      </article>
    </main>
  );
}
