import Link from "next/link";
import { redirect } from "next/navigation";
import PageBanner from "../../page-banner";
import { authorized } from "../../session";

export const dynamic = "force-dynamic";

const weeks = [
  { title: "Publicar o primeiro guia", action: "Grave no PS5 e publique um vídeo sobre como capturar gameplay no OBS. Faça um Short com o teste de imagem e áudio.", measure: "Veja se as pessoas chegam ao trecho que mostra o resultado." },
  { title: "Responder uma dúvida de GTA", action: "Escolha uma pergunta que você consiga responder com sua própria gravação. Mostre o resultado no início e depois ensine os passos.", measure: "Anote as perguntas que se repetirem nos comentários." },
  { title: "Criar uma série pesquisável", action: "Publique a continuação do guia mais útil e agrupe os vídeos em uma playlist. Use título com a dúvida e thumbnail com uma imagem e poucos termos.", measure: "Compare impressões, taxa de cliques e retenção dos vídeos longos após o mesmo tempo no ar." },
  { title: "Repetir o melhor formato", action: "Use a dúvida mais recorrente para escolher o próximo vídeo. Se houver procura por um material organizado, apresente uma amostra de checklist no site.", measure: "Registre qual formato gerou mais perguntas úteis e interesse na amostra." },
];

export default async function EditorialPlan() {
  if (!(await authorized())) redirect("/login");

  return (
    <main className="shell grid gap-6 py-10">
      <PageBanner title="Plano editorial de 30 dias" cover="/portal-leonida.webp">
        <Link href="/studio" className="portal-secondary mt-4 inline-block">← Estúdio</Link>
      </PageBanner>
      <section className="panel">
        <h2 className="text-2xl font-black">Guias de GTA em português, testados no PS5</h2>
        <p className="mt-3 text-neutral-300">O GTA Series Videos organiza guias por missão e divide vídeos completos em capítulos. Aplique essa lógica a dúvidas do público brasileiro, com gameplay próprio, narração em português e uma pergunta por vídeo.</p>
        <ul className="mt-4 flex flex-wrap gap-4">
          <li><a className="portal-secondary" href="https://www.youtube.com/watch?v=B3RemOjwqM8">Exemplo de guia por missão</a></li>
          <li><a className="portal-secondary" href="https://www.youtube.com/watch?v=vZJSlBiA5kw">Exemplo de guia com capítulos</a></li>
        </ul>
        <p className="mt-4 font-bold">Meta inicial sugerida: 1 vídeo longo e 1 Short por semana, reaproveitando a gravação.</p>
      </section>
      <ol className="grid gap-4 md:grid-cols-2">
        {weeks.map((week, index) => (
          <li key={week.title} className="panel">
            <p className="eyebrow">SEMANA {index + 1}</p>
            <h2 className="mt-2 text-xl font-bold">{week.title}</h2>
            <p className="mt-3 text-neutral-300">{week.action}</p>
            <p className="mt-3 text-sm text-pink-200">{week.measure}</p>
          </li>
        ))}
      </ol>
      <Link className="portal-cta justify-self-start" href="/studio/producao">Abrir quadro de produção ↗</Link>
    </main>
  );
}
