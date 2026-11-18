export const stages = ["Ideia", "Pesquisa", "Roteiro", "Gravação", "Edição", "Revisão", "Agendado", "Publicado", "Analisado"];
export const storageKey = "gta-studio-production-v1";
export const formats = ["Vídeo longo", "Short", "Live"];

export function validDate(value) {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(value + "T12:00:00Z");
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

export function validEntry(entry) {
  return Boolean(entry && typeof entry.id === "string" && typeof entry.title === "string" &&
    entry.title.trim() && entry.title.length <= 120 && formats.includes(entry.format) &&
    stages.includes(entry.stage) && (entry.date === "" || validDate(entry.date)) &&
    typeof entry.notes === "string" && entry.notes.length <= 1500 &&
    (entry.publishedOn === undefined || validDate(entry.publishedOn)) &&
    (entry.views === undefined || validCount(entry.views)) &&
    (entry.impressions === undefined || validCount(entry.impressions)));
}

function validCount(value) {
  return Number.isSafeInteger(value) && value >= 0 && value <= 1_000_000_000;
}

export function metrics(entries) {
  return entries.filter((entry) => isPublished(entry.stage))
    .reduce((totals, entry) => ({
      publications: totals.publications + 1,
      measured: totals.measured + Number(entry.views !== undefined || entry.impressions !== undefined),
      views: totals.views + (entry.views ?? 0),
      impressions: totals.impressions + (entry.impressions ?? 0),
    }), { publications: 0, measured: 0, views: 0, impressions: 0 });
}

export function calendar(entries) {
  return entries.filter((entry) => entry.date).sort((first, second) => first.date.localeCompare(second.date));
}

export function isPublished(stage) {
  return stage === "Publicado" || stage === "Analisado";
}

export function readEntries(storage) {
  const saved = JSON.parse(storage.getItem(storageKey) ?? "[]");
  if (!Array.isArray(saved) || !saved.every(validEntry)) throw new Error("Dados inválidos");
  return saved;
}

const saoPauloDate = new Intl.DateTimeFormat("sv-SE", { timeZone: "America/Sao_Paulo", dateStyle: "short" });

export function publicationToday(now = new Date()) {
  return saoPauloDate.format(now);
}

export function weeklyPublications(entries, now = new Date()) {
  const today = publicationToday(now);
  const monday = new Date(today + "T12:00:00Z");
  monday.setUTCDate(monday.getUTCDate() - ((monday.getUTCDay() + 6) % 7));
  const start = monday.toISOString().slice(0, 10);
  const totals = { long: 0, shorts: 0, lives: 0, undated: 0 };

  for (const entry of entries) {
    if (!isPublished(entry.stage)) continue;
    if (!entry.publishedOn) {
      totals.undated++;
      continue;
    }
    if (entry.publishedOn < start || entry.publishedOn > today) continue;
    if (entry.format === "Vídeo longo") totals.long++;
    if (entry.format === "Short") totals.shorts++;
    if (entry.format === "Live") totals.lives++;
  }
  return totals;
}
