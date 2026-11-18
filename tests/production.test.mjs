import assert from "node:assert/strict";
import test from "node:test";
import { calendar, validDate, validEntry } from "../app/studio/producao/model.mjs";

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
