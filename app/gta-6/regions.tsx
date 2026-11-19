"use client";

import { useState } from "react";

const regions = [
  { name: "Vice City", terrain: "Metrópole costeira", description: "Praias, avenidas e vida noturna. A versão contemporânea de Vice City é o ponto de partida para entender o contraste entre o litoral turístico e os bairros da cidade.", color: "#ff80ab" },
  { name: "Leonida Keys", terrain: "Arquipélago tropical", description: "Ilhas, marinas e água aberta no sul de Leonida. É o cenário em que Jason já conhece a comunidade e trabalha com Brian Heder.", color: "#72e0d3" },
  { name: "Grassrivers", terrain: "Áreas alagadas", description: "Uma região de pântanos e canais onde a fauna faz parte da paisagem. As imagens oficiais mostram jacarés e embarcações próprias para águas rasas.", color: "#c5df8c" },
  { name: "Port Gellhorn", terrain: "Cidade costeira", description: "Motéis, atrações decadentes e uma economia local em declínio. Um outro retrato da costa de Leonida, longe da vida noturna de Vice City.", color: "#ffb578" },
  { name: "Ambrosia", terrain: "Cidade industrial", description: "A cidade abriga a refinaria de açúcar Allied Crystal, uma das referências econômicas e visuais da região.", color: "#ff957d" },
  { name: "Mount Kalaga", terrain: "Parque nacional", description: "Trilhas, floresta e terreno montanhoso. O parque revela um lado rural de Leonida e amplia a variedade de ambientes apresentados pela Rockstar.", color: "#b9adff" },
];

export default function Regions() {
  const [selected, setSelected] = useState(0);
  const region = regions[selected];

  return (
    <div className="guide-atlas" style={{ "--region-accent": region.color } as React.CSSProperties}>
      <div className="guide-region-list" role="group" aria-label="Regiões de Leonida">
        {regions.map(({ name, terrain }, index) => (
          <button key={name} type="button" aria-pressed={selected === index} aria-controls="region-detail" onClick={() => setSelected(index)}>
            <strong>{name}</strong><span>{terrain}</span>
          </button>
        ))}
      </div>
      <div id="region-detail" className="guide-region-detail" aria-live="polite">
        <div key={region.name} className="guide-region-copy">
          <p className="guide-eyebrow">{region.terrain}</p>
          <h3>{region.name}</h3>
          <p>{region.description}</p>
          <a href="https://www.rockstargames.com/VI/media/screenshots">Ver capturas oficiais</a>
        </div>
      </div>
    </div>
  );
}
