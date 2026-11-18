const sections = [
  {
    title: "Da saída HDMI à gravação",
    visual: ["PS5", "Captura FY-1133", "MacBook com OBS"],
    steps: [
      "Ligue a saída HDMI do PS5 à entrada HDMI IN da placa e conecte a placa ao Mac por USB 3.0. Para jogar pelo monitor, teste o HDMI OUT da placa se o seu modelo oferecer essa saída.",
      "No PS5, desligue o HDCP para capturar gameplay. No OBS, adicione USB3 Video como fonte de vídeo e USB3 Digital Audio como entrada de áudio.",
      "Comece em 1920 × 1080 a 60 FPS, se a placa oferecer esse modo. Use Transformar → Ajustar à tela para preservar a proporção do jogo.",
    ],
  },
  {
    title: "Voz, câmera e som do jogo",
    visual: ["Jogo → placa", "Voz → iPhone", "Escuta → JBL"],
    steps: [
      "Use o iPhone como câmera e microfone e deixe a câmera acima do gameplay na lista de fontes do OBS. Posicione a imagem em um canto livre da interface do jogo.",
      "No teste do Viny Plays, a troca do microfone do JBL pelo microfone do iPhone resolveu o chiado relatado. O JBL ficou como saída para escutar o áudio.",
      "Se for ouvir o jogo pelo OBS, escolha Monitorar e emitir apenas na fonte desejada. Grave uma fala enquanto o jogo toca e confira se ambos aparecem uma vez no arquivo.",
    ],
  },
  {
    title: "Como conferir se a gravação ficou fluida",
    visual: ["Gravar 2–5 minutos", "Abrir Estatísticas", "Assistir ao arquivo"],
    steps: [
      "O teste de saída em 4K60 apresentou travadas. A causa exata ficou em aberto, então use Full HD 60 como ponto de partida e compare um ajuste por vez.",
      "Grave em MKV e confira amostras com movimento intenso e voz. Compare a prévia com o arquivo e verifique quadros perdidos por renderização e codificação nas estatísticas do OBS.",
      "Quando precisar de MP4 para editar, use a opção de converter gravações do OBS. A live e o HDMI direto no monitor ainda precisam de teste nesse setup.",
    ],
  },
];

export default function ObsWalkthrough() {
  return (
    <article id="obs-walkthrough" className="grid min-w-0 gap-6" aria-labelledby="obs-walkthrough-title">
      <header>
        <h2 id="obs-walkthrough-title" className="text-3xl font-black">Do PS5 ao primeiro teste no OBS</h2>
        <p className="mt-2 text-neutral-300">Um guia baseado nos testes do setup Viny Plays, com exemplos de ligação e conferência.</p>
      </header>
      {sections.map(({ title, visual, steps }) => (
        <section key={title} className="panel grid min-w-0 gap-4">
          <h3 className="text-2xl font-bold">{title}</h3>
          <figure className="rounded-xl bg-black/25 p-4">
            <figcaption className="mb-3 text-sm text-neutral-300">Demonstração ilustrada</figcaption>
            <ol className="grid gap-2 sm:grid-cols-3">
              {visual.map((label, index) => (
                <li className="studio-lane rounded-lg p-3" key={label}>
                  <span className="accent mr-2 font-bold">{index + 1}.</span>{label}
                </li>
              ))}
            </ol>
          </figure>
          <ol className="list-decimal space-y-3 pl-6 text-neutral-300">
            {steps.map((step) => <li key={step}>{step}</li>)}
          </ol>
        </section>
      ))}
    </article>
  );
}
