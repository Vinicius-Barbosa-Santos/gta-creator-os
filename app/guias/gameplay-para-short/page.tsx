import type { Metadata } from "next";
import Link from "next/link";
import PageBanner from "../../page-banner";
import { captureGuidePath } from "../../site";
import ShortPreview from "../short-preview";

export const metadata: Metadata = {
  title: "Como transformar uma gameplay em Short",
  description: "Compare o quadro original e o recorte vertical em uma demonstração interativa.",
  alternates: { canonical: "/guias/gameplay-para-short" },
};

export default function GameplayParaShort() {
  return (
    <main className="shell grid gap-6 py-12">
      <Link href="/guias" className="portal-secondary w-fit">← Todos os guias</Link>
      <PageBanner title="Da gameplay ao Short" cover="/guias/shorts.webp" />
      <ShortPreview />
      <section className="panel grid gap-4">
        <h2 className="text-2xl font-bold">Monte seu primeiro recorte</h2>
        <ol className="list-decimal space-y-3 pl-6 text-neutral-300">
          <li>Escolha um momento que tenha começo e desfecho, como uma manobra ou uma reação. Comece perto da ação.</li>
          <li>Crie uma tela vertical de 1080 × 1920 e ajuste o recorte para acompanhar o ponto de interesse. Confira se o rosto e elementos importantes do jogo continuam visíveis.</li>
          <li>Revise voz, áudio do jogo e legendas. Assista ao arquivo no celular e confira se o texto fica legível e longe das bordas.</li>
        </ol>
        <Link href={captureGuidePath} className="portal-secondary w-fit">Ver como gravei no OBS →</Link>
      </section>
    </main>
  );
}
