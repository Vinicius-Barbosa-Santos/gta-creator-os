import Link from "next/link";
import { redirect } from "next/navigation";
import PageBanner from "../../page-banner";
import { authorized } from "../../session";

export const dynamic = "force-dynamic";


const steps = [
  {
    title: "Grave um teste no OBS",
    detail: "Grave 30 segundos com movimento, som do jogo e sua voz. Abra o arquivo e confira se a fala está clara e se imagem e áudio estão sincronizados. Se 1080p60 estiver estável no seu setup, use esse perfil. Se travar, comece com 1080p30.",
  },
  {
    title: "Monte o primeiro corte",
    detail: "Importe o arquivo na área Edit do DaVinci Resolve e arraste-o para a timeline. Corte o tempo de preparação, carregamentos e pausas que não ajudam a entender o vídeo. Coloque alguns segundos do melhor momento na abertura.",
  },
  {
    title: "Acerte o áudio e exporte",
    detail: "Ouça de fone e baixe o som do jogo onde ele compete com sua voz. Na área Deliver, exporte uma cópia em MP4 com H.264, no formato horizontal 1920 × 1080. Mantenha os FPS da captura e assista ao arquivo antes de subir.",
  },
  {
    title: "Faça um Short da mesma sessão",
    detail: "Duplique a timeline e configure a cópia em 1080 × 1920. Escolha um trecho de 20 a 40 segundos com começo, ação e resultado. Reposicione o vídeo para caber a ação importante. Se o recorte esconder o HUD, use o trecho horizontal dentro do quadro vertical. Adicione legendas curtas e confira no celular.",
  },
];

export default async function EditingGuide() {
  if (!(await authorized())) redirect("/login");

  return (
    <main className="shell grid gap-6 py-10">
      <PageBanner title="Edição de gameplay" cover="/guia-captura.webp">
        <Link href="/studio" className="portal-secondary mt-4 inline-block">← Estúdio</Link>
      </PageBanner>
      <section className="panel">
        <h2 className="text-2xl font-bold">Ferramentas para começar</h2>
        <dl className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="studio-lane rounded-xl p-4">
            <dt className="font-bold">OBS Studio</dt>
            <dd className="mt-2 text-neutral-300">Grave o gameplay do PS5 no Mac e confira o áudio no mixer.</dd>
            <Link className="portal-secondary mt-3 inline-block" href="/guias#capture-setup-title">Ver configuração da captura ↗</Link>
          </div>
          <div className="studio-lane rounded-xl p-4">
            <dt className="font-bold">DaVinci Resolve</dt>
            <dd className="mt-2 text-neutral-300">Use a versão gratuita para cortar, ajustar áudio, legendar e exportar.</dd>
            <a className="portal-secondary mt-3 inline-block" href="https://www.blackmagicdesign.com/products/davinciresolve/training">Treinamento oficial ↗</a>
          </div>
        </dl>
      </section>
      <section className="panel">
        <h2 className="text-2xl font-bold">Da gravação ao primeiro Short</h2>
        <ol className="mt-5 list-decimal space-y-5 pl-6 marker:font-bold marker:text-pink-200">
          {steps.map(({ title, detail }) => (
            <li key={title} className="pl-1">
              <h3 className="font-bold">{title}</h3>
              <p className="mt-1 text-neutral-300">{detail}</p>
            </li>
          ))}
        </ol>
        <a className="portal-secondary mt-5 inline-block" href="https://support.google.com/youtube/answer/15424877?hl=pt-BR">Regras de formato e duração dos Shorts ↗</a>
      </section>
      <section className="panel">
        <h2 className="text-2xl font-bold">Um Short para o seu primeiro vídeo</h2>
        <p className="mt-3 text-neutral-300"><strong>Gancho:</strong> “Dá pra jogar no monitor e gravar o PS5 no Mac ao mesmo tempo?” Mostre o monitor e a prévia do OBS. Corte para o trecho final gravado com áudio e feche com o resultado.</p>
        <p className="mt-3 text-neutral-300">Em cada sessão, anote o minuto em que aconteceu algo que dá para contar sozinho, como uma descoberta, um erro engraçado ou uma dica demonstrada no jogo.</p>
        <div className="mt-5 flex flex-wrap gap-4">
          <Link href="/studio/producao" className="portal-cta">Planejar no quadro ↗</Link>
          <Link href="/studio/criativos" className="portal-secondary self-center">Criar thumbnail</Link>
        </div>
      </section>
    </main>
  );
}
