import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { captureGuidePath, gtaGuidePath } from "../site";
import Regions from "./regions";
import "./guide.css";

export const metadata: Metadata = {
  title: "Guia GTA 6 sem spoilers",
  description: "Conheça Vice City, as regiões de Leonida, Jason e Lucia. Confira plataformas, edições, legendas em PT-BR e como começar no PS5.",
  alternates: { canonical: gtaGuidePath },
};

const official = "https://www.rockstargames.com/VI";
const launch = "https://www.rockstargames.com/br/newswire/article/39akk424a9oo53/grand-theft-auto-vi-now-available";
const playstation = "https://www.playstation.com/pt-br/games/grand-theft-auto-vi/";
const support = "https://www.playstation.com/pt-br/support/games/gta-vi-support/";

const chapters = [
  ["mundo", "Mundo"], ["historia", "História"], ["jogar", "Como jogar"], ["duvidas", "Dúvidas"],
];

const cast = [
  ["Lucia Caminos", "Criada em Liberty City, Lucia quer assumir as rédeas da própria vida depois de sair da prisão. A parceria com Jason é central para seus planos."],
  ["Jason Duval", "Depois de passar pelo Exército, Jason acabou trabalhando para contrabandistas nas Keys. A relação com Lucia abre uma saída para a rotina que ele conhece."],
  ["Cal Hampton", "Amigo de Jason, interessa-se por transmissões da guarda costeira e prefere observar o movimento de casa."],
  ["Boobie Ike", "Figura da noite de Vice City, atua no mercado imobiliário, em casas noturnas e na música."],
  ["Dre’Quan Priest e Real Dimez", "Dre’Quan tenta crescer no mercado musical. Real Dimez é a dupla formada por Bae-Luxe e Roxy."],
  ["Raul Bautista e Brian Heder", "Raul é um assaltante experiente em busca de parceiros. Brian é um veterano do contrabando nas Keys, onde Jason trabalha."],
];

const questions = [
  ["GTA 6 saiu para PC?", "O anúncio de lançamento lista PS5 e Xbox Series X|S. Ele não informa data para PC.", launch],
  ["Roda no PS4 ou no Xbox One?", "As plataformas anunciadas para o lançamento são PS5 e Xbox Series X|S.", launch],
  ["Existe dublagem em português?", "No PS5, o suporte oficial informa texto em português do Brasil e vozes em inglês.", support],
  ["O GTA+ confirma um novo GTA Online?", "O comunicado de lançamento menciona benefícios de GTA+ para GTA VI, mas não informa uma data para um novo modo online.", launch],
  ["Qual a diferença entre as edições no PS5?", "A edição Padrão inclui a campanha. A Ultimate traz conteúdo adicional para a história. No PS5, a Sony lista a Padrão na PS Store e em caixa com código, e a Ultimate na PS Store. Confira o formato no anúncio antes de comprar.", support],
  ["O DualSense tem funções extras?", "Sim. A PlayStation lista resposta tátil, gatilhos adaptáveis e efeitos pelo alto-falante do controle. Se estiverem desativados, confira os ajustes de vibração e efeito de gatilho nos acessórios do PS5.", playstation],
  ["Onde encontro o mapa e os trailers oficiais?", "A Rockstar disponibiliza os trailers, capturas e o mapa oficial de Leonida no site do jogo.", official],
];

export default function GTAGuide() {
  return (
    <main className="gta-guide">
      <section className="guide-hero" aria-labelledby="guide-title">
        <Image src="/portal-leonida.webp" alt="" fill priority unoptimized className="guide-hero-image" />
        <div className="guide-shell guide-hero-content">
          <p className="guide-eyebrow">Guia sem spoilers</p>
          <h1 id="guide-title">GTA <span>VI</span></h1>
          <p className="guide-subtitle">Bem-vindo a Vice City.</p>
          <p>Conheça Jason e Lucia, explore Leonida e prepare o console para sua primeira sessão.</p>
          <div className="guide-actions">
            <a className="guide-button" href="#mundo">Explorar Leonida</a>
            <a className="guide-button guide-outline" href={official}>Ver trailers oficiais</a>
          </div>
        </div>
        <dl className="guide-shell guide-facts">
          <div><dt>Lançamento</dt><dd><time dateTime="2026-11-19">19 de novembro de 2026</time></dd></div>
          <div><dt>Plataformas</dt><dd>PS5 · Xbox Series X|S</dd></div>
          <div><dt>Idioma no PS5</dt><dd>Texto PT-BR · Vozes em inglês</dd></div>
        </dl>
      </section>

      <nav className="guide-chapters" aria-label="Seções do guia">
        <div className="guide-shell">{chapters.map(([id, title]) => <a key={id} href={`#${id}`}>{title}</a>)}</div>
      </nav>

      <section id="mundo" className="guide-shell guide-section">
        <h2>Explore Leonida</h2>
        <p className="guide-intro">Vice City é parte de um estado que reúne ilhas, pântanos e montanhas. Selecione uma região para conhecê-la.</p>
        <Regions />
      </section>

      <section id="historia" className="guide-story">
        <div className="guide-shell guide-section">
          <h2>Jason, Lucia e a história</h2>
          <p className="guide-intro">Um golpe dá errado e coloca a dupla no meio de uma conspiração que atravessa Leonida. Para sair dessa, os dois precisam confiar um no outro.</p>
          <div className="guide-cast">
            {cast.map(([name, bio]) => <article key={name}><h3>{name}</h3><p>{bio}</p></article>)}
          </div>
          <a className="guide-source" href={official}>Conheça o elenco na Rockstar</a>
        </div>
      </section>

      <section id="jogar" className="guide-shell guide-section">
        <h2>Sua primeira sessão no PS5</h2>
        <ol className="guide-steps">
          <li><h3>Instale e atualize</h3><p>Abra a biblioteca com a conta que comprou ou resgatou o jogo. Confira o espaço livre e instale as atualizações antes de começar.</p></li>
          <li><h3>Ajuste a leitura e o som</h3><p>Ative as legendas antes da primeira cena. Veja se dá para ler da distância em que você joga e confira se as falas estão claras no volume habitual.</p></li>
          <li><h3>Experimente o controle</h3><p>Teste a câmera ao caminhar e dirigir. Se os gatilhos adaptáveis ou a vibração estiverem fortes demais, ajuste a intensidade nas configurações de acessórios do console.</p></li>
          <li><h3>Use o mapa e os objetivos</h3><p>Leia o objetivo atual antes de sair explorando. Quando quiser desviar da história, escolha um ponto no mapa e use uma referência visual para se orientar.</p></li>
        </ol>
        <a className="guide-source" href={support}>Idiomas, instalação e suporte no PS5</a>
        <aside className="guide-creator">
          <div><h3>Vai gravar para o YouTube?</h3><p>Faça um teste curto com voz e som do jogo, reproduza o arquivo e confira as verificações do YouTube Studio antes de publicar.</p></div>
          <Link className="guide-button guide-outline" href={captureGuidePath}>Guia de captura no OBS</Link>
        </aside>
      </section>

      <section id="duvidas" className="guide-shell guide-section guide-faq">
        <h2>Perguntas frequentes</h2>
        <div>{questions.map(([question, answer, source]) => (
          <details key={question}><summary>{question}</summary><p>{answer}</p><a className="guide-source" href={source}>Ver fonte oficial</a></details>
        ))}</div>
        <p className="guide-review">Informações consultadas em <time dateTime="2026-11-19">19 de novembro de 2026</time>. <a href={launch}>Comunicado de lançamento</a></p>
      </section>
    </main>
  );
}
