"use client";

import Image from "next/image";
import { useState } from "react";

export default function ShortPreview() {
  const [vertical, setVertical] = useState(false);

  return (
    <figure className="panel grid justify-items-start gap-4">
      <figcaption className="text-lg font-bold">Compare os dois enquadramentos</figcaption>
      <button type="button" className="portal-cta" aria-pressed={vertical} onClick={() => setVertical(!vertical)}>
        Enquadramento vertical
      </button>
      <p className="text-neutral-300" aria-live="polite">
        {vertical ? "9:16 · O recorte destaca o carro e perde parte das laterais." : "16:9 · O quadro inteiro mostra o cenário ao redor do carro."}
      </p>
      <div className={vertical ? "relative aspect-[9/16] w-44 overflow-hidden rounded-xl" : "relative aspect-video w-full max-w-xl overflow-hidden rounded-xl"}>
        <Image src="/vice-city.webp" alt="Ilustração de um carro numa avenida costeira usada para demonstrar o recorte" fill sizes="(min-width: 640px) 576px, 100vw" className="object-cover object-[65%_center]" />
      </div>
    </figure>
  );
}
