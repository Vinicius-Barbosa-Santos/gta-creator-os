import { studioIdentity } from "../../session";
import { validEntry, type Entry } from "./model.mjs";

export type Account = Extract<NonNullable<Awaited<ReturnType<typeof studioIdentity>>>, { kind: "account" }>;

export const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const columns = "id,title,format,stage,editorial_date,published_on,notes,views,impressions";

export function entryRow(entry: Entry, userId: string) {
  return {
    user_id: userId, id: entry.id, title: entry.title, format: entry.format,
    stage: entry.stage, editorial_date: entry.date || null, published_on: entry.publishedOn ?? null,
    notes: entry.notes, views: entry.views ?? null, impressions: entry.impressions ?? null,
  };
}

export async function accountEntries(account: Account): Promise<Entry[]> {
  const entries: Entry[] = [];
  let cursor: string | undefined;
  while (true) {
    let query = account.client.from("studio_entries").select(columns)
      .eq("user_id", account.id).order("id").limit(250);
    if (cursor) query = query.gt("id", cursor);
    const { data, error } = await query;
    if (error) throw new Error("Não foi possível carregar o quadro");
    for (const row of data) {
      const entry = {
        id: row.id, title: row.title, format: row.format, stage: row.stage,
        date: row.editorial_date ?? "", publishedOn: row.published_on ?? undefined,
        notes: row.notes, views: row.views ?? undefined, impressions: row.impressions ?? undefined,
      };
      if (!validEntry(entry)) throw new Error("Cartão inválido");
      entries.push(entry);
    }
    if (data.length < 250) return entries;
    cursor = data.at(-1)?.id;
  }
}
