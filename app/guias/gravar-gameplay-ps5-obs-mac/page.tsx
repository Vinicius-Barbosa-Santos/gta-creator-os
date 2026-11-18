import type { Metadata } from "next";
import Link from "next/link";
import PageBanner from "../../page-banner";
import { captureGuidePath } from "../../site";
import CaptureSetup from "../capture-setup";
import ObsWalkthrough from "../obs-walkthrough";

export const metadata: Metadata = {
  title: "Como gravar gameplay do PS5 no Mac com OBS",
  description: "Veja como ligar o PS5 à placa de captura FY-1133, jogar no monitor e gravar no MacBook com OBS.",
  alternates: { canonical: captureGuidePath },
};

export default function CaptureGuide() {
  return (
    <main className="shell grid gap-6 py-12">
      <Link href="/guias" className="portal-secondary w-fit">← Todos os guias</Link>
      <PageBanner title="Como gravar gameplay do PS5 no Mac com OBS" cover="/guia-captura.webp" />
      <a className="portal-secondary w-fit" href="#obs-walkthrough">Ir para a configuração completa do OBS ↓</a>
      <CaptureSetup />
      <ObsWalkthrough />
    </main>
  );
}
