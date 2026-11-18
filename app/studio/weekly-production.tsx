"use client";

import { loadAccountEntries } from "./producao/storage-actions";
import Link from "next/link";
import { useEffect, useState } from "react";
import { productionStorageKey, readEntries, weeklyPublications, type Entry } from "./producao/model.mjs";

export default function WeeklyProduction({ accountId }: { accountId?: string }) {
  const [entries, setEntries] = useState<Entry[] | null>(null);
  const [loadFailed, setLoadFailed] = useState(false);

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const saved = accountId ? await loadAccountEntries(accountId) : readEntries(localStorage);
        if (!active) return;
        if (!saved) throw new Error();
        setEntries(saved);
        setLoadFailed(false);
      } catch {
        if (!active) return;
        setEntries(null);
        setLoadFailed(true);
      }
    }

    function onStorage(event: StorageEvent) {
      if (event.key === productionStorageKey(accountId) || event.key === null) load();
    }

    load();
    window.addEventListener("storage", onStorage);
    window.addEventListener("pageshow", load);
    return () => {
      active = false;
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("pageshow", load);
    };
  }, [accountId]);

  const totals = entries && weeklyPublications(entries);
  return (
    <section className="panel" aria-labelledby="weekly-production">
      <h2 id="weekly-production" className="text-2xl font-bold">Produção da semana</h2>
      <p className="mt-2 text-sm text-neutral-300">Publicações registradas {accountId ? "na sua conta" : "neste navegador"}, de segunda-feira até hoje, no horário de Brasília.</p>
      {loadFailed && <p className="mt-4 text-rose-300" role="status">Não foi possível ler o quadro de produção.</p>}
      {!loadFailed && !totals && <p className="mt-4 text-neutral-300" role="status">Carregando publicações…</p>}
      {totals && (
        <>
          <dl className="mt-5 grid grid-cols-3 gap-3">
            {[
              ["Vídeos longos", totals.long],
              ["Shorts", totals.shorts],
              ["Lives", totals.lives],
            ].map(([label, count]) => (
              <div key={label}><dt>{label}</dt><dd className="accent text-4xl font-black">{count}</dd></div>
            ))}
          </dl>
          {totals.undated > 0 && (
            <p className="mt-4 text-sm text-neutral-300">
              {totals.undated} {totals.undated === 1 ? "publicação sem data. Preencha a data para incluí-la" : "publicações sem data. Preencha as datas para incluí-las"} na semana correspondente.
            </p>
          )}
        </>
      )}
      <Link className="portal-secondary mt-4 inline-block" href="/studio/producao">Abrir quadro de produção ↗</Link>
    </section>
  );
}
