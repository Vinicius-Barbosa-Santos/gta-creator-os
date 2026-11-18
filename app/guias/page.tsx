import PageBanner from "../page-banner";
import Image from "next/image";

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
          <ol className="mt-5 list-decimal space-y-3 pl-5 text-neutral-300">
            <li>Selecione a placa de captura como fonte de vídeo no OBS e confira o medidor do áudio do jogo.</li>
            <li>Grave um trecho curto com bastante movimento e uma fala. Abra o arquivo para conferir fluidez, volume e sincronismo.</li>
            <li>Corte o tempo de preparação e escolha um momento que faça sentido sozinho. Revise o enquadramento vertical e as legendas antes de publicar um Short.</li>
          </ol>
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
