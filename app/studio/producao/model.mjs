export const stages = ["Ideia", "Pesquisa", "Roteiro", "Gravação", "Edição", "Revisão", "Agendado", "Publicado", "Analisado"];
export const formats = ["Vídeo longo", "Short", "Live"];

export function validDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(value + "T12:00:00Z");
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

export function validEntry(entry) {
  return Boolean(entry && typeof entry.id === "string" && typeof entry.title === "string" &&
    entry.title.trim() && entry.title.length <= 120 && formats.includes(entry.format) &&
    stages.includes(entry.stage) && (entry.date === "" || validDate(entry.date)) &&
    typeof entry.notes === "string" && entry.notes.length <= 1500 &&
    (entry.views === undefined || validCount(entry.views)) &&
    (entry.impressions === undefined || validCount(entry.impressions)));
}

function validCount(value) {
  return Number.isSafeInteger(value) && value >= 0 && value <= 1_000_000_000;
}

export function metrics(entries) {
  return entries.filter((entry) => entry.stage === "Publicado" || entry.stage === "Analisado")
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
