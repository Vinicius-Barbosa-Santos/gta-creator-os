export default function ObsWalkthrough() {
  return (
    <article className="grid min-w-0 gap-6" aria-labelledby="obs-walkthrough">
      <section className="panel grid gap-4">
        <h2 id="obs-walkthrough" className="text-3xl font-black">Configuração completa do OBS no Viny Plays</h2>
        <p className="text-neutral-300">Registro de 18 de novembro de 2026. O guia distingue os testes realizados das recomendações e dos ajustes pendentes.</p>
        <nav aria-label="Neste guia" className="flex flex-wrap gap-x-5 gap-y-3">
          <a className="portal-secondary" href="#obs-objetivo">Objetivo</a>
          <a className="portal-secondary" href="#obs-equipamentos">Equipamentos</a>
          <a className="portal-secondary" href="#obs-conexoes">Conexões</a>
          <a className="portal-secondary" href="#obs-configuracao-do-ps5">Configuração do PS5</a>
          <a className="portal-secondary" href="#obs-cena-e-fontes-do-obs">Cena e fontes do OBS</a>
          <a className="portal-secondary" href="#obs-perfil-recomendado-de-gravacao-full-hd-60-fps">Perfil recomendado de gravação — Full HD 60 FPS</a>
          <a className="portal-secondary" href="#obs-audio">Áudio</a>
          <a className="portal-secondary" href="#obs-iphone-como-webcam">iPhone como webcam</a>
          <a className="portal-secondary" href="#obs-jogar-pela-pre-visualizacao">Jogar pela pré-visualização</a>
          <a className="portal-secondary" href="#obs-testes-de-4k-e-alternativas">Testes de 4K e alternativas</a>
          <a className="portal-secondary" href="#obs-diagnostico-de-lag">Diagnóstico de lag</a>
          <a className="portal-secondary" href="#obs-fluxo-de-gravacao-e-publicacao">Fluxo de gravação e publicação</a>
          <a className="portal-secondary" href="#obs-transmissoes-ao-vivo-pendente">Transmissões ao vivo — pendente</a>
          <a className="portal-secondary" href="#obs-checklist-operacional">Checklist operacional</a>
        </nav>
      </section>
      <section id="obs-objetivo" className="panel grid min-w-0 gap-4 text-neutral-300">
        <h2 className="text-2xl font-black text-white">Objetivo</h2>
        <p>Gravar gameplays de GTA 6 com câmera, voz e áudio do jogo, priorizando estabilidade, fluidez e qualidade para o YouTube e Shorts.</p>
      </section>
      <section id="obs-equipamentos" className="panel grid min-w-0 gap-4 text-neutral-300">
        <h2 className="text-2xl font-black text-white">Equipamentos</h2>
        <ul className="list-disc space-y-2 pl-6">
          <li>MacBook Pro M1 Pro</li>
          <li>PlayStation 5</li>
          <li>Monitor externo 27” 4K</li>
          <li>Placa de captura HDMI FY-1133 USB 3.0</li>
          <li>Hub USB-C Strimtech</li>
          <li>iPhone 12 (câmera e microfone)</li>
          <li>JBL Tune 520BT (saída de áudio)</li>
          <li>OBS Studio 33.0.1</li>
        </ul>
      </section>
      <section id="obs-conexoes" className="panel grid min-w-0 gap-4 text-neutral-300">
        <h2 className="text-2xl font-black text-white">Conexões</h2>
        <pre className="overflow-x-auto rounded-xl bg-black/25 p-4 text-sm"><code>{"PS5 → HDMI IN (placa de captura) → USB 3.0 → MacBook → OBS\n                         └── HDMI OUT → monitor (opcional, se suportado)\niPhone 12 → Câmera de Continuidade → MacBook\nJBL Tune 520BT → Bluetooth → MacBook (somente saída de áudio)"}</code></pre>
        <p>A configuração inicial utiliza a pré-visualização do OBS para jogar. A conexão HDMI OUT ao monitor é uma alternativa recomendada para reduzir a latência, ainda não validada. Se possível, utilize uma porta USB 3.0 sem compartilhar banda com outros dispositivos de alta demanda.</p>
      </section>
      <section id="obs-configuracao-do-ps5" className="panel grid min-w-0 gap-4 text-neutral-300">
        <h2 className="text-2xl font-black text-white">Configuração do PS5</h2>
        <p>Em Definições → Sistema → HDMI:</p>
        <ul className="list-disc space-y-2 pl-6">
          <li>Desativar HDCP para capturar gameplay (pode impedir aplicativos de mídia protegida de funcionar).</li>
        </ul>
        <p>Em Definições → Ecrã e vídeo → Saída de vídeo, perfil recomendado para estabilidade:</p>
        <div className="overflow-x-auto rounded-xl border border-white/15">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/10">
              <tr>
                <th scope="col" className="p-3">Configuração</th>
                <th scope="col" className="p-3">Valor</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-white/10">
                <td className="p-3">Resolução</td>
                <td className="p-3">1080p</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="p-3">Saída de 120 Hz</td>
                <td className="p-3">Desativada</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="p-3">VRR</td>
                <td className="p-3">Desativado</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="p-3">HDR</td>
                <td className="p-3">Desativado</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="p-3">Modo gráfico do jogo</td>
                <td className="p-3">Desempenho, quando disponível</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>Esses ajustes de saída foram recomendados, mas não houve confirmação individual da aplicação no console.</p>
      </section>
      <section id="obs-cena-e-fontes-do-obs" className="panel grid min-w-0 gap-4 text-neutral-300">
        <h2 className="text-2xl font-black text-white">Cena e fontes do OBS</h2>
        <div className="overflow-x-auto rounded-xl border border-white/15">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/10">
              <tr>
                <th scope="col" className="p-3">Fonte</th>
                <th scope="col" className="p-3">Tipo</th>
                <th scope="col" className="p-3">Dispositivo</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-white/10">
                <td className="p-3">Gameplay PS5</td>
                <td className="p-3">Dispositivo de captura de vídeo</td>
                <td className="p-3">USB3 Video</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="p-3">Áudio PS5</td>
                <td className="p-3">Captura de entrada de áudio</td>
                <td className="p-3">USB3 Digital Audio</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="p-3">Dispositivo de captura de vídeo (webcam)</td>
                <td className="p-3">Captura de vídeo</td>
                <td className="p-3">iPhone 12</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="p-3">Mic/Aux</td>
                <td className="p-3">Microfone global</td>
                <td className="p-3">iPhone 12 Microphone</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>Manter a webcam acima da fonte de gameplay na ordem das fontes e posicioná-la no canto inferior direito, evitando elementos importantes da interface do jogo. Bloquear as fontes após ajustar.</p>
        <h3 className="text-lg font-bold">Propriedades — Gameplay PS5</h3>
        <ul className="list-disc space-y-2 pl-6">
          <li>Dispositivo: USB3 Video.</li>
          <li>Utilizar predefinição: desmarcado.</li>
          <li>Resolução: 1920 × 1080.</li>
          <li>FPS: 60.</li>
          <li>Usar memória temporária (buffer): desmarcado, se disponível.</li>
          <li>Botão direito na fonte → Transformar → Ajustar ao ecrã.</li>
          <li>Se houver corte indevido: Transformar → Redefinir transformação e ajustar novamente.</li>
        </ul>
      </section>
      <section id="obs-perfil-recomendado-de-gravacao-full-hd-60-fps" className="panel grid min-w-0 gap-4 text-neutral-300">
        <h2 className="text-2xl font-black text-white">Perfil recomendado de gravação — Full HD 60 FPS</h2>
        <h3 className="text-lg font-bold">Definições → Vídeo</h3>
        <div className="overflow-x-auto rounded-xl border border-white/15">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/10">
              <tr>
                <th scope="col" className="p-3">Configuração</th>
                <th scope="col" className="p-3">Valor</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-white/10">
                <td className="p-3">Resolução base (tela)</td>
                <td className="p-3">1920 × 1080</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="p-3">Resolução de saída</td>
                <td className="p-3">1920 × 1080</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="p-3">Proporção</td>
                <td className="p-3">16:9</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="p-3">FPS</td>
                <td className="p-3">60</td>
              </tr>
            </tbody>
          </table>
        </div>
        <h3 className="text-lg font-bold">Definições → Saída → Gravação</h3>
        <div className="overflow-x-auto rounded-xl border border-white/15">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/10">
              <tr>
                <th scope="col" className="p-3">Configuração</th>
                <th scope="col" className="p-3">Valor</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-white/10">
                <td className="p-3">Modo de saída</td>
                <td className="p-3">Avançado</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="p-3">Tipo de gravação</td>
                <td className="p-3">Padrão</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="p-3">Pasta</td>
                <td className="p-3">Documents/OBS (Documentos/OBS)</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="p-3">Formato</td>
                <td className="p-3">MKV</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="p-3">Codificador de vídeo</td>
                <td className="p-3">Apple VT H264 Hardware</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="p-3">Codificador de áudio</td>
                <td className="p-3">CoreAudio AAC</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="p-3">Faixa de áudio</td>
                <td className="p-3">1</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="p-3">Redimensionar saída</td>
                <td className="p-3">Desativado</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="p-3">Controle de taxa</td>
                <td className="p-3">CBR</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="p-3">Bitrate</td>
                <td className="p-3">20.000 Kbps</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="p-3">Intervalo de keyframes</td>
                <td className="p-3">2 segundos</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="p-3">Perfil</td>
                <td className="p-3">High</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="p-3">B-frames</td>
                <td className="p-3">Ativado</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="p-3">Spatial AQ</td>
                <td className="p-3">Automático</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>Estimativa de armazenamento: aproximadamente 9 GB por hora de vídeo, mais áudio e overhead.</p>
      </section>
      <section id="obs-audio" className="panel grid min-w-0 gap-4 text-neutral-300">
        <h2 className="text-2xl font-black text-white">Áudio</h2>
        <h3 className="text-lg font-bold">Definições → Áudio</h3>
        <ul className="list-disc space-y-2 pl-6">
          <li>Taxa de amostragem: 48 kHz.</li>
          <li>Canais: estéreo.</li>
          <li>Áudio do ambiente de trabalho: desativado.</li>
          <li>Mic/Aux: iPhone 12 Microphone.</li>
          <li>JBL Tune 520BT: utilizado somente para ouvir o áudio, não como microfone.</li>
        </ul>
        <h3 className="text-lg font-bold">Monitoramento do jogo</h3>
        <p>No Misturador de áudio → Propriedades avançadas de áudio, configurar Áudio PS5 para Monitorar e emitir (ou equivalente), permitindo ouvir o jogo e gravá-lo. Selecionar o JBL como dispositivo de monitoramento, se necessário. Evitar capturar o mesmo áudio duas vezes.</p>
        <h3 className="text-lg font-bold">Problema resolvido: chiado no Bluetooth</h3>
        <p>Utilizar o microfone do JBL provocava perda de qualidade no áudio. Ao desativá-lo como entrada e usar o microfone do iPhone, o áudio voltou a funcionar bem no teste relatado. A ativação do microfone Bluetooth pode acionar o perfil de chamadas de menor qualidade.</p>
        <h3 className="text-lg font-bold">Níveis recomendados (ajustes futuros)</h3>
        <ul className="list-disc space-y-2 pl-6">
          <li>Voz: picos próximos de −12 a −6 dBFS.</li>
          <li>Jogo: abaixo da voz durante comentários; ajustar pelo teste de escuta.</li>
          <li>Evitar clipping (0 dBFS).</li>
          <li>Filtros como compressor, supressão de ruído e limitador são opcionais; não foram confirmados como configurados.</li>
        </ul>
      </section>
      <section id="obs-iphone-como-webcam" className="panel grid min-w-0 gap-4 text-neutral-300">
        <h2 className="text-2xl font-black text-white">iPhone como webcam</h2>
        <p>No iPhone (interface em inglês): Settings → General → AirPlay &amp; Continuity → Continuity Camera.</p>
        <ul className="list-disc space-y-2 pl-6">
          <li>Ativar Continuity Camera.</li>
          <li>Manter Wi-Fi e Bluetooth ativos, com o iPhone próximo ao Mac, bloqueado e preferencialmente na horizontal.</li>
          <li>No OBS, selecionar o iPhone como dispositivo de vídeo.</li>
          <li>Se houver desconexões, testar conexão USB e confirmar a confiança entre os dispositivos.</li>
          <li>Conferir se câmera e microfone funcionam simultaneamente antes de gravar.</li>
        </ul>
      </section>
      <section id="obs-jogar-pela-pre-visualizacao" className="panel grid min-w-0 gap-4 text-neutral-300">
        <h2 className="text-2xl font-black text-white">Jogar pela pré-visualização</h2>
        <p>É possível usar o projetor da fonte em tela cheia no OBS (botão direito na fonte → projetor em ecrã inteiro, conforme a interface). Esse caminho pode adicionar atraso. Para menor latência, preferir o passthrough HDMI da placa, caso disponível e compatível com o monitor.</p>
      </section>
      <section id="obs-testes-de-4k-e-alternativas" className="panel grid min-w-0 gap-4 text-neutral-300">
        <h2 className="text-2xl font-black text-white">Testes de 4K e alternativas</h2>
        <p>Foi configurada a saída 3840 × 2160 a 60 FPS no OBS, mas o gameplay voltou a apresentar lag. Isso não comprova uma limitação específica da placa: também pode envolver formato de captura, USB, renderização ou codificação. O suporte a captura 4K nativa não foi confirmado.</p>
        <div className="overflow-x-auto rounded-xl border border-white/15">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/10">
              <tr>
                <th scope="col" className="p-3">Perfil</th>
                <th scope="col" className="p-3">Resolução de captura</th>
                <th scope="col" className="p-3">Saída OBS</th>
                <th scope="col" className="p-3">FPS</th>
                <th scope="col" className="p-3">Bitrate de gravação sugerido</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-white/10">
                <td className="p-3">Full HD (recomendado)</td>
                <td className="p-3">1920 × 1080</td>
                <td className="p-3">1920 × 1080</td>
                <td className="p-3">60</td>
                <td className="p-3">20.000 Kbps</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="p-3">1440p (experimental)</td>
                <td className="p-3">2560 × 1440, se disponível</td>
                <td className="p-3">2560 × 1440</td>
                <td className="p-3">60</td>
                <td className="p-3">35.000 Kbps</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="p-3">4K 30 (experimental)</td>
                <td className="p-3">3840 × 2160, se disponível</td>
                <td className="p-3">3840 × 2160</td>
                <td className="p-3">30</td>
                <td className="p-3">45.000 Kbps</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="p-3">4K 60 (lag observado)</td>
                <td className="p-3">3840 × 2160, se disponível</td>
                <td className="p-3">3840 × 2160</td>
                <td className="p-3">60</td>
                <td className="p-3">60.000 Kbps</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="p-3">Upscale 4K (experimental)</td>
                <td className="p-3">1920 × 1080</td>
                <td className="p-3">3840 × 2160</td>
                <td className="p-3">60</td>
                <td className="p-3">60.000 Kbps</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>Upscale não adiciona detalhes nativos. A indicação 4K na placa ou no OBS não garante captura 4K60 real. Uma saída a 60 FPS também não garante 60 quadros únicos por segundo.</p>
        <p>A decisão foi priorizar a fluidez e seguir com o equipamento atual. O último perfil efetivamente mantido não foi confirmado em detalhe; Full HD 60 FPS é a referência recomendada para restaurar o setup.</p>
      </section>
      <section id="obs-diagnostico-de-lag" className="panel grid min-w-0 gap-4 text-neutral-300">
        <h2 className="text-2xl font-black text-white">Diagnóstico de lag</h2>
        <ol className="list-decimal space-y-2 pl-6">
          <li>Retornar à referência Full HD 60 FPS na fonte e na saída.</li>
          <li>Conferir a saída do PS5 e o modo de desempenho do jogo.</li>
          <li>Testar uma gravação de 2–5 minutos com movimento intenso.</li>
          <li>Abrir Ver → Estatísticas no OBS e observar quadros perdidos por renderização e codificação.</li>
          <li>Comparar a gravação com a pré-visualização; estatísticas do OBS não garantem a fluidez da entrada da placa.</li>
          <li>Testar sem webcam e, se possível, com conexão USB direta para isolar gargalos.</li>
          <li>Testar HDMI OUT para separar atraso de pré-visualização de problemas da gravação.</li>
          <li>Alterar somente uma variável por vez.</li>
        </ol>
      </section>
      <section id="obs-fluxo-de-gravacao-e-publicacao" className="panel grid min-w-0 gap-4 text-neutral-300">
        <h2 className="text-2xl font-black text-white">Fluxo de gravação e publicação</h2>
        <ol className="list-decimal space-y-2 pl-6">
          <li>Abrir OBS e conferir fontes, enquadramento e áudio.</li>
          <li>Iniciar gravação em MKV.</li>
          <li>Finalizar a gravação e acessar Ficheiro → Mostrar gravações.</li>
          <li>Usar Ficheiro → Converter gravações (remux) para gerar MP4 sem recodificar.</li>
          <li>Assistir ao arquivo e conferir sincronia, fluidez, voz e som do jogo.</li>
          <li>Editar o vídeo e extrair Shorts em formato vertical 9:16 (1080 × 1920).</li>
          <li>Publicar no YouTube, verificar o processamento e manter os arquivos importantes até validar a publicação.</li>
        </ol>
        <p>MKV reduz o risco de perda integral da gravação em caso de encerramento inesperado. VLC é uma opção para reproduzir MKV.</p>
      </section>
      <section id="obs-transmissoes-ao-vivo-pendente" className="panel grid min-w-0 gap-4 text-neutral-300">
        <h2 className="text-2xl font-black text-white">Transmissões ao vivo — pendente</h2>
        <p>A configuração documentada é de gravação local. Serviço de streaming, chave de transmissão, bitrate de live, velocidade de upload e testes no YouTube ainda precisam ser validados. Não utilizar automaticamente os 20.000 Kbps da gravação como bitrate de transmissão.</p>
      </section>
      <section id="obs-checklist-operacional" className="panel grid min-w-0 gap-4 text-neutral-300">
        <h2 className="text-2xl font-black text-white">Checklist operacional</h2>
        <ul className="list-disc space-y-2 pl-6">
          <li>Confirmado · Placa reconhecida pelo Mac (USB3 Video / USB3 Digital Audio).</li>
          <li>Confirmado · Captura de gameplay do PS5 funcionando.</li>
          <li>Confirmado · HDCP desativado.</li>
          <li>Confirmado · Webcam do iPhone configurada.</li>
          <li>Confirmado · Áudio do jogo audível pelo fone.</li>
          <li>Confirmado · Microfone do iPhone configurado e chiado do JBL resolvido no teste.</li>
          <li>Pendente · Confirmar perfil final de resolução e FPS.</li>
          <li>Pendente · Validar gravação longa com câmera, voz e gameplay.</li>
          <li>Pendente · Conferir sincronia e níveis de áudio no arquivo final.</li>
          <li>Pendente · Testar passthrough HDMI, se disponível.</li>
          <li>Pendente · Configurar e testar live no YouTube.</li>
          <li>Pendente · Produzir primeiro gameplay e Shorts.</li>
        </ul>
        <p><strong>Estratégia Viny Plays:</strong> priorizar conteúdo, áudio claro e gameplay fluido. Considerar uma placa 4K profissional somente se houver necessidade comprovada de upgrade.</p>
      </section>
    </article>
  );
}
