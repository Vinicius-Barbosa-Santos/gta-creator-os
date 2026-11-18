import assert from "node:assert/strict";
import test from "node:test";
import { calendar, metrics, validDate, validEntry } from "../app/studio/producao/model.mjs";

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
