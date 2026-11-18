"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const still = "/vice-city-scene-still.webp";
const animation = "/vice-city-scene.webp";

export default function HeroScene() {
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePlayback = () => setPlaying(!motion.matches);
    updatePlayback();
    motion.addEventListener("change", updatePlayback);
    return () => motion.removeEventListener("change", updatePlayback);
  }, []);

  return (
    <>
      <Image
        className="portal-scene"
        src={playing ? animation : still}
        alt=""
        fill
        unoptimized
        loading="eager"
      />
      <button
        type="button"
        className="portal-scene-control"
        onClick={() => setPlaying((current) => !current)}
      >
        {playing ? "Pausar animação" : "Reproduzir animação"}
      </button>
    </>
  );
}
