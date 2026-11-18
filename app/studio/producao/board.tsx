"use client";

import { useEffect, useState, type FormEvent } from "react";
import { calendar, formats, isPublished, metrics, publicationToday, readEntries, stages, productionStorageKey, validEntry, type Entry } from "./model.mjs";

import IdeasPanel from "./ideas-panel";

const dateFormat = new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeZone: "UTC" });

export default function Board({ accountId }: { accountId?: string }) {
  const [entries, setEntries] = useState<Entry[] | null>(null);
  const [editing, setEditing] = useState<Entry | null>(null);
  const [error, setError] = useState("");
  const [removing, setRemoving] = useState<string | null>(null);

  useEffect(() => {
    try {
      setEntries(readEntries(localStorage, accountId));
    } catch {
      setError("Não foi possível carregar o quadro neste navegador.");
    }
  }, [accountId]);

  function persist(next: Entry[]) {
    try {
      localStorage.setItem(productionStorageKey(accountId), JSON.stringify(next));
      setEntries(next);
      setError("");
      return true;
    } catch {
      setError("Não foi possível salvar. Libere espaço ou permita o armazenamento neste navegador.");
      return false;
    }
  }

  function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!entries) return;
    const form = event.currentTarget;
    const values = new FormData(form);
    const views = values.get("views");
    const impressions = values.get("impressions");
    const publishedOn = String(values.get("publishedOn") ?? "");
    const entry: Entry = {
      id: editing?.id ?? crypto.randomUUID(),
      title: String(values.get("title") ?? "").trim(),
      format: String(values.get("format") ?? ""),
      stage: String(values.get("stage") ?? ""),
      date: String(values.get("date") ?? ""),
      notes: String(values.get("notes") ?? "").trim(),
      publishedOn: publishedOn || undefined,
      views: views === "" ? undefined : Number(views),
      impressions: impressions === "" ? undefined : Number(impressions),
    };
    if (isPublished(entry.stage) && (!publishedOn || publishedOn > publicationToday())) {
      setError("Informe a data em que o conteúdo foi publicado.");
      return;
    }
    if (!validEntry(entry)) {
      setError("Confira os campos do conteúdo.");
      return;
    }
    const next = editing ? entries.map((item) => item.id === editing.id ? entry : item) : [...entries, entry];
    if (persist(next)) {
      form.reset();
      setEditing(null);
    }
  }

  const totals = metrics(entries ?? []);

  return (
    <>
      <p className="mb-5 text-sm text-neutral-400">O quadro fica salvo neste navegador. Use o estúdio em um perfil de navegador pessoal.</p>
      {error && <p className="mb-4 text-rose-300" role="alert">{error}</p>}
      {entries && (
        <>
          <IdeasPanel onSave={(idea, format) => {
            const entry: Entry = {
              id: crypto.randomUUID(),
              title: idea.title,
              format,
              stage: "Ideia",
              date: "",
              notes: `Gancho: ${idea.hook}\n\nRoteiro: ${idea.script}\n\nCenas: ${idea.scenes}`,
            };
            return validEntry(entry) && persist([...entries, entry]);
          }} />
          <form key={editing ? `${editing.id}:${editing.stage}` : "new"} id="conteudo" onSubmit={save} className="panel grid gap-4 sm:grid-cols-2">
            <h2 className="text-xl font-bold sm:col-span-2">{editing ? "Editar conteúdo" : "Novo conteúdo"}</h2>
            <label className="grid gap-2">Título<input name="title" required maxLength={120} defaultValue={editing?.title} /></label>
            <label className="grid gap-2">Data editorial<input type="date" name="date" defaultValue={editing?.date} /></label>
            <label className="grid gap-2">Data real de publicação
              <input type="date" name="publishedOn" defaultValue={editing?.publishedOn} aria-describedby="publication-date-help" />
              <span id="publication-date-help" className="text-sm text-neutral-300">Preencha para conteúdos publicados ou analisados.</span>
            </label>
            <label className="grid gap-2">Formato
              <select name="format" defaultValue={editing?.format}>{formats.map((format) => <option key={format}>{format}</option>)}</select>
            </label>
            <label className="grid gap-2">Etapa
              <select name="stage" defaultValue={editing?.stage}>{stages.map((stage) => <option key={stage}>{stage}</option>)}</select>
            </label>
            <label className="grid gap-2 sm:col-span-2">Roteiro e checklist
              <textarea name="notes" rows={4} maxLength={1500} defaultValue={editing?.notes} />
            </label>
            <label className="grid gap-2">Visualizações (opcional)
              <input type="number" name="views" min={0} max={1_000_000_000} step={1} defaultValue={editing?.views} />
            </label>
            <label className="grid gap-2">Impressões (opcional)
              <input type="number" name="impressions" min={0} max={1_000_000_000} step={1} defaultValue={editing?.impressions} />
            </label>
            <div className="flex flex-wrap gap-4 sm:col-span-2">
              <button className="button">Salvar conteúdo</button>
              {editing && <button type="button" className="accent" onClick={() => setEditing(null)}>Cancelar edição</button>}
            </div>
          </form>
          <h2 className="mb-4 mt-8 text-2xl font-bold">Quadro de produção</h2>
          {entries.length === 0 && <p className="mb-4 text-neutral-400">Adicione uma ideia para iniciar o quadro.</p>}
          <div className="grid snap-x snap-mandatory auto-cols-[minmax(15rem,30%)] grid-flow-col gap-3 overflow-x-auto pb-4" tabIndex={0} aria-label="Etapas do quadro">
            {stages.map((stage) => (
              <section className="snap-start studio-lane rounded-xl p-4" key={stage}>
                <h3 className="font-bold">{stage}</h3>
                {entries.filter((entry) => entry.stage === stage).map((entry) => (
                  <article key={entry.id} className="mt-3 grid gap-2 rounded border border-slate-700 p-3">
                    <h4 className="break-words font-semibold">{entry.title}</h4>
                    <p className="text-sm text-neutral-400">{entry.format}</p>
                    <select aria-label={`Etapa de ${entry.title}`} value={entry.stage}
                      onChange={(event) => {
                        const stage = event.target.value;
                        if (isPublished(stage) && (!entry.publishedOn || entry.publishedOn > publicationToday())) {
                          setEditing({ ...entry, stage });
                          document.getElementById("conteudo")?.scrollIntoView({ block: "start" });
                          return;
                        }
                        persist(entries.map((item) => item.id === entry.id ? { ...item, stage } : item));
                      }}>
                      {stages.map((option) => <option key={option}>{option}</option>)}
                    </select>
                    <a href="#conteudo" className="accent" onClick={() => setEditing(entry)}>Editar</a>
                    {removing === entry.id ? (
                      <div className="flex flex-wrap gap-3">
                        <button className="text-rose-300" onClick={() => {
                          if (persist(entries.filter((item) => item.id !== entry.id))) {
                            setRemoving(null);
                            if (editing?.id === entry.id) setEditing(null);
                          }
                        }}>Confirmar exclusão</button>
                        <button onClick={() => setRemoving(null)}>Cancelar</button>
                      </div>
                    ) : <button className="text-left text-rose-300" onClick={() => setRemoving(entry.id)}>Excluir</button>}
                  </article>
                ))}
              </section>
            ))}
          </div>
          <section className="panel mt-6">
            <h2 className="text-xl font-bold">Resultados das publicações</h2>
            <p className="mt-2 text-sm text-neutral-400">{totals.measured} de {totals.publications} publicações com métricas cadastradas manualmente.</p>
            {totals.measured > 0 && (
              <dl className="mt-4 grid grid-cols-2 gap-4">
                <div><dt>Visualizações registradas</dt><dd className="accent text-3xl font-black">{totals.views.toLocaleString("pt-BR")}</dd></div>
                <div><dt>Impressões registradas</dt><dd className="accent text-3xl font-black">{totals.impressions.toLocaleString("pt-BR")}</dd></div>
              </dl>
            )}
          </section>
          <section className="panel mt-6">
            <h2 className="text-xl font-bold">Agenda editorial</h2>
            {calendar(entries).length === 0 && <p className="mt-3 text-neutral-400">Defina uma data no conteúdo para incluí-lo na agenda.</p>}
            <ul className="mt-3 space-y-2">{calendar(entries).map((entry) => (
              <li className="flex flex-wrap gap-x-3" key={entry.id}>
                <time dateTime={entry.date} className="accent">{dateFormat.format(new Date(entry.date + "T12:00:00Z"))}</time>
                <span className="break-all">{entry.title}</span>
              </li>
            ))}</ul>
          </section>
        </>
      )}
    </>
  );
}
