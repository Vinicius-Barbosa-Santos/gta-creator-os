"use client";

import { useActionState, useState } from "react";
import { formats } from "./model.mjs";
import { suggestIdeas } from "./ideas-action";
import type { Idea, IdeasResult } from "./ideas";

export default function IdeasPanel({ onSave }: { onSave: (idea: Idea, format: string) => Promise<boolean> }) {
  const [saved, setSaved] = useState<number[]>([]);
  const [result, submit, pending] = useActionState(async (previous: IdeasResult, data: FormData) => {
    const next = await suggestIdeas(previous, data);
    setSaved([]);
    return next;
  }, {});

  return (
    <section className="panel mb-6" aria-labelledby="ideas-heading">
      <h2 id="ideas-heading" className="text-2xl font-bold">Sugestões de pautas com IA</h2>
      <p className="mt-2 text-sm text-neutral-300">O formato, o tempo e a descrição abaixo são enviados à OpenAI. Revise as ideias antes de produzir.</p>
      <form action={submit} className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2">Formato
          <select name="format" defaultValue="Short" className="">
            {formats.map((format) => <option key={format}>{format}</option>)}
          </select>
        </label>
        <label className="grid gap-2">Tempo disponível (minutos)
          <input name="minutes" type="number" min={15} max={240} step={1} required defaultValue={30} />
        </label>
        <label className="grid gap-2 sm:col-span-2">Gravações que você já tem (opcional)
          <textarea name="footage" maxLength={800} rows={3} placeholder="Ex.: 5 minutos de gameplay do PS5 gravados no OBS" />
        </label>
        <button className="button justify-self-start disabled:opacity-50" disabled={pending}>{pending ? "Gerando pautas…" : "Sugerir pautas"}</button>
      </form>
      {pending && <p role="status" className="mt-3">Aguardando resposta da IA.</p>}
      {result.error && <p role="alert" className="mt-3 text-rose-300">{result.error}</p>}
      {!pending && result.ideas && result.format && (
        <div className="mt-5 grid gap-3">
          {result.ideas.map((idea, index) => (
            <article key={index} className="rounded border border-slate-700 p-4">
              <h3 className="text-lg font-bold">{idea.title}</h3>
              <dl className="my-3 grid gap-2 text-sm">
                <div><dt className="accent">Gancho</dt><dd className="whitespace-pre-line">{idea.hook}</dd></div>
                <div><dt className="accent">Roteiro</dt><dd className="whitespace-pre-line">{idea.script}</dd></div>
                <div><dt className="accent">Cenas</dt><dd className="whitespace-pre-line">{idea.scenes}</dd></div>
              </dl>
              <button type="button" className="button disabled:opacity-50" disabled={saved.includes(index)} onClick={async () => {
                if (result.format && await onSave(idea, result.format)) setSaved((current) => [...current, index]);
              }}>{saved.includes(index) ? "Salva no quadro" : "Salvar no quadro"}</button>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
