import type { Metadata } from "next";
import PageBanner from "../../page-banner";
import { beginnerCoursePath } from "../../site";

export const metadata: Metadata = {
  title: "GTA VI do zero no PS5",
  description: "Trilha em vídeo para iniciantes no GTA VI, com uma prévia gratuita e curso pago em preparação.",
  alternates: { canonical: beginnerCoursePath },
};

const lessons = [
  ["Seu primeiro jogo no PS5", "Preparação, controles básicos e onde procurar opções de acessibilidade e conforto visual."],
  ["A primeira hora sem spoilers", "O que observar no mapa e na interface, como identificar objetivos e o que vale testar cedo."],
  ["Erros comuns de iniciante", "Exemplos de escolhas que geram retrabalho e como perceber quando é hora de ajustar a estratégia."],
  ["Primeiras oportunidades de ganhar dinheiro", "Compare opções, tempo e recompensas em testes próprios antes de recomendar uma rota."],
  ["Exploração sem se perder", "Como se orientar e escolher um próximo objetivo enquanto explora a cidade."],
];

export default function BeginnerCourse() {
  return (
    <main className="shell grid gap-6 py-12">
      <PageBanner title="GTA VI do zero no PS5" cover="/portal-leonida.webp">
        <p className="mt-4 max-w-xl text-white">Um curso em vídeo para quem quer começar a jogar sem spoilers e entender o que fazer nas primeiras horas.</p>
        <a href="#previa" className="portal-cta mt-5 inline-flex">Ler a prévia gratuita ↓</a>
      </PageBanner>
      <section className="panel grid gap-4" aria-labelledby="lessons-title">
        <h2 id="lessons-title" className="text-2xl font-bold">O que você vai aprender</h2>
        <p className="text-neutral-300">Curso pago em preparação. As gravações e os testes práticos ainda estão pendentes. As vendas estão fechadas.</p>
        <ol className="list-decimal space-y-4 pl-6">
          {lessons.map(([title, detail]) => (
            <li key={title}>
              <h3 className="font-bold text-white">{title}</h3>
              <p className="mt-1 text-neutral-300">{detail}</p>
            </li>
          ))}
        </ol>
      </section>
      <section id="previa" className="panel grid gap-4" aria-labelledby="preview-title">
        <h2 id="preview-title" className="text-2xl font-bold">Prévia gratuita · Antes da primeira missão</h2>
        <p className="text-neutral-300">Exemplo em texto da primeira aula. Reserve cinco minutos para deixar a leitura da tela e os controles confortáveis.</p>
        <ol className="list-decimal space-y-3 pl-6 text-neutral-300">
          <li>Ao abrir o jogo pela primeira vez, observe de onde você vai jogar. Se alguma legenda ou instrução ficar pequena à distância, procure os ajustes de texto antes de seguir.</li>
          <li>Com o som no volume que você usa normalmente, confira se entende as falas. Se precisar, procure opções de legenda ou ajuste as vozes, quando o menu oferecer essa opção.</li>
          <li>Teste a câmera com movimentos curtos. Se você passar do ponto sempre que tentar olhar para um objeto, reduza a sensibilidade um passo, se o ajuste estiver disponível, e teste de novo.</li>
        </ol>
        <p className="text-neutral-300">Na aula gravada, a ideia é mostrar a tela do PS5 e comparar o antes e o depois. Acima está o roteiro de preparação.</p>
      </section>
    </main>
  );
}
