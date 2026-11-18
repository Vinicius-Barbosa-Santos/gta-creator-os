import assert from "node:assert/strict";
import test from "node:test";
import { calendar, metrics, readEntries, validDate, validEntry, weeklyPublications } from "../app/studio/producao/model.mjs";

const entry = { id: "1", title: "Primeiro Short", format: "Short", stage: "Ideia", date: "", notes: "" };

test("aceita rascunho e rejeita entradas inválidas", () => {
  assert.equal(validEntry(entry), true);
  for (const update of [{ title: " " }, { title: "x".repeat(121) }, { format: "Outro" }, { stage: "Outro" }, { notes: "x".repeat(1501) }, { date: "2026-02-30" }]) {
    assert.equal(validEntry({ ...entry, ...update }), false);
  }
  assert.equal(validEntry(null), false);
});

test("valida dias reais do calendário", () => {
  assert.equal(validDate("2028-02-29"), true);
  assert.equal(validDate("2026-02-29"), false);
  assert.equal(validDate("2026-2-01"), false);
});

test("ordena apenas os conteúdos com data e preserva a lista original", () => {
  const later = { ...entry, id: "2", date: "2026-12-01" };
  const earlier = { ...entry, id: "3", date: "2026-11-18" };
  const original = [later, entry, earlier];
  assert.deepEqual(calendar(original), [earlier, later]);
  assert.deepEqual(original, [later, entry, earlier]);
});

test("soma métricas registradas apenas de conteúdo publicado ou analisado", () => {
  assert.deepEqual(metrics([
    { ...entry, views: 400 },
    { ...entry, stage: "Publicado", views: 15, impressions: 50 },
    { ...entry, stage: "Analisado", views: 0 },
    { ...entry, stage: "Publicado" },
  ]), { publications: 3, measured: 2, views: 15, impressions: 50 });
  assert.equal(validEntry({ ...entry, views: -1 }), false);
  assert.equal(validEntry({ ...entry, impressions: 1.5 }), false);
});

test("conta publicações registradas desde segunda no horário de Brasília", () => {
  const published = { ...entry, stage: "Publicado" };
  const date = new Date("2026-11-19T01:00:00Z");
  assert.deepEqual(weeklyPublications([
    { ...published, publishedOn: "2026-11-16" },
    { ...published, format: "Vídeo longo", stage: "Analisado", publishedOn: "2026-11-18" },
    { ...published, format: "Live", publishedOn: "2026-11-17" },
    { ...published, publishedOn: "2026-11-15" },
    { ...published, publishedOn: "2026-11-19" },
    { ...entry, stage: "Agendado", publishedOn: "2026-11-18" },
    { ...published, date: "2026-11-18" },
  ], date), { long: 1, shorts: 1, lives: 1, undated: 1 });
  assert.deepEqual(weeklyPublications([], date), { long: 0, shorts: 0, lives: 0, undated: 0 });
});

test("mantém os cartões antigos e distingue quadro vazio de dados inválidos", () => {
  assert.deepEqual(readEntries({ getItem: () => JSON.stringify([entry]) }), [entry]);
  assert.deepEqual(readEntries({ getItem: () => null }), []);
  assert.throws(() => readEntries({ getItem: () => '{"unexpected":true}' }));
  assert.equal(validEntry({ ...entry, publishedOn: "2026-02-30" }), false);
});
