import Image from "next/image";

const connections = [
  { cable: "HDMI", origin: "PS5 · HDMI OUT", target: "Placa FY-1133 · HDMI IN" },
  { cable: "HDMI", origin: "Placa FY-1133 · HDMI OUT", target: "Monitor · HDMI IN" },
  { cable: "USB 3.0", origin: "Placa FY-1133 · USB", target: "Hub Strimtech · MacBook com OBS" },
];

const steps = [
  { title: "Ligue o PS5 à placa", detail: "Conecte o cabo HDMI que sai do PS5 à porta HDMI IN da FY-1133." },
  { title: "Ligue a placa ao monitor", detail: "Use um segundo cabo HDMI entre a porta HDMI OUT da placa e o monitor. Selecione essa entrada no monitor para jogar pelo pass-through." },
  { title: "Conecte a captura ao MacBook", detail: "Conecte a porta USB da placa ao hub USB 3.0 Strimtech e ligue o hub ao MacBook. O vídeo da gravação chega ao OBS por esse caminho." },
  { title: "Desative o HDCP para capturar o gameplay", detail: "No PS5, acesse Configurações → Sistema → HDMI e desligue Habilitar HDCP. Alguns apps de mídia protegida podem exigir que você reative a opção." },
  { title: "Adicione a placa no OBS", detail: "Na cena que vai gravar, abra Fontes → + → Dispositivo de captura de vídeo. Escolha a placa que o Mac reconheceu, como USB Video ou HDMI Capture." },
  { title: "Ajuste e teste a captura", detail: "Em Configurações → Vídeo, ajuste a saída para 1920 × 1080 e 60 FPS, se a placa oferecer esse modo de captura. Confirme o áudio no mixer e grave um teste com movimento e fala. Veja o arquivo salvo para conferir fluidez e sincronia." },
];

export default function CaptureSetup() {
  return (
    <section aria-labelledby="capture-setup-title" className="panel grid gap-7">
      <div>
        <h3 id="capture-setup-title" className="text-2xl font-black">Como ligar o PS5, o monitor e o MacBook</h3>
        <p className="mt-2 text-neutral-300">O HDMI leva a imagem até o monitor e o USB envia a captura ao OBS.</p>
      </div>
      <figure>
        <a href="/setup-captura-referencia.png" target="_blank" rel="noopener noreferrer" className="block rounded-xl">
          <Image
            src="/setup-captura-referencia.png"
            alt="Diagrama do setup de captura: PS5 ligado à FY-1133 por HDMI, placa ligada ao monitor por HDMI e ao MacBook com OBS pelo hub USB."
            width={1672}
            height={941}
            unoptimized
            className="h-auto w-full rounded-xl border border-white/15"
          />
        </a>
        <figcaption className="mt-3 text-sm text-neutral-300">
          <a className="portal-secondary" href="/setup-captura-referencia.png" target="_blank" rel="noopener noreferrer">
            Abrir imagem em tamanho original ↗
          </a>
        </figcaption>
      </figure>
      <figure>
        <figcaption className="mb-3 font-bold">Mapa dos cabos</figcaption>
        <ul className="grid gap-3 md:grid-cols-3">
          {connections.map(({ cable, origin, target }) => (
            <li key={origin} className="studio-lane grid content-start gap-2 rounded-xl p-4">
              <span className="portal-label">{cable}</span>
              <strong>{origin}</strong>
              <span className="text-sm text-neutral-300"><span aria-hidden="true">↳ </span>Para {target}</span>
            </li>
          ))}
        </ul>
      </figure>
      <div>
        <h4 className="mb-3 text-xl font-bold">Passo a passo</h4>
        <ol className="list-decimal space-y-4 pl-7 marker:font-black marker:text-pink-200">
          {steps.map(({ title, detail }) => (
            <li key={title} className="pl-1">
              <h5 className="font-bold">{title}</h5>
              <p className="mt-1 text-neutral-300">{detail}</p>
            </li>
          ))}
        </ol>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <section className="studio-lane rounded-xl p-4">
          <h4 className="font-bold">Resultado esperado</h4>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-neutral-300">
            <li>Você joga pela entrada HDMI do monitor.</li>
            <li>O OBS mostra o jogo e o mixer recebe o áudio.</li>
            <li>O arquivo de teste reproduz com imagem e áudio sincronizados.</li>
          </ul>
        </section>
        <section className="studio-lane rounded-xl p-4">
          <h4 className="font-bold">Se algo não funcionar</h4>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-neutral-300">
            <li>Tela preta no OBS: confira o HDCP, a entrada HDMI IN e a fonte selecionada.</li>
            <li>Falhas ou travadas: teste a placa em uma porta USB 3 diretamente no Mac ou com um adaptador compatível.</li>
            <li>Se o OBS oferecer Apple VT H.264 por hardware, teste esse codificador na gravação.</li>
          </ul>
        </section>
      </div>
      <p className="text-sm text-neutral-300">
        Referências <a className="portal-secondary" href="https://blog.playstation.com/2020/11/09/ps5-the-ultimate-faq/">PlayStation</a>
        {" · "}<a className="portal-secondary" href="https://obsproject.com/kb/video-capture-sources">OBS Studio</a>
      </p>
    </section>
  );
}
