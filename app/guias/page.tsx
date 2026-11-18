export default function Guias() {
  return (
    <main className="shell grid gap-6 py-12">
      <h1 className="text-5xl font-black">Guias</h1>
      <article id="captura" className="panel">
        <p className="eyebrow">LEITURA GRATUITA</p>
        <h2 className="mt-3 text-3xl font-bold">Da captura ao primeiro clipe</h2>
        <ol className="mt-5 list-decimal space-y-3 pl-5 text-neutral-300">
          <li>Selecione a placa de captura como fonte de vídeo no OBS e confira o medidor do áudio do jogo.</li>
          <li>Grave um trecho curto com bastante movimento e uma fala. Abra o arquivo para conferir fluidez, volume e sincronismo.</li>
          <li>Corte o tempo de preparação e escolha um momento que faça sentido sozinho. Revise o enquadramento vertical e as legendas antes de publicar um Short.</li>
        </ol>
      </article>
      <article id="premium" className="panel">
        <p className="eyebrow">EM PREPARAÇÃO</p>
        <h2 className="mt-3 text-3xl font-bold">Primeiras horas em Vice City</h2>
        <p className="mt-4 text-neutral-300">Guia planejado com rotas testadas no PS5, demonstrações em vídeo e checklist de progresso. Compra avulsa quando o conteúdo estiver pronto.</p>
      </article>
    </main>
  );
}
