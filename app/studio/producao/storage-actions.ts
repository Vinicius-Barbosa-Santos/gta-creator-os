"use server";

import { revalidatePath } from "next/cache";
import { studioIdentity } from "../../session";
import { accountEntries, entryRow, uuid } from "./database";
import { validEntry, type Entry } from "./model.mjs";

export async function changeAccountEntry(accountId: string, entry: Entry | null, id: string, operation: "create" | "update" | "delete") {
  const account = await studioIdentity();
  if (account?.kind !== "account" || account.id !== accountId || typeof id !== "string" || !uuid.test(id)) return false;
  if (operation !== "create" && operation !== "update" && operation !== "delete") return false;

  const table = account.client.from("studio_entries");
  if (operation === "delete") {
    const { error } = await table.delete().eq("user_id", account.id).eq("id", id);
    if (error) return false;
  } else {
    if (!validEntry(entry) || entry.id !== id) return false;
    const row = entryRow(entry, account.id);
    const { data, error } = await (operation === "create" ? table.insert(row) :
      table.update(row).eq("user_id", account.id).eq("id", id)).select("id").maybeSingle();
    if (error || !data) return false;
  }
  revalidatePath("/studio");
  return true;
}

export async function importAccountEntries(accountId: string, entries: Entry[]) {
  const account = await studioIdentity();
  if (account?.kind !== "account" || account.id !== accountId ||
      !Array.isArray(entries) || !entries.length || entries.length > 100) return false;
  if (!entries.every((entry) => validEntry(entry) && uuid.test(entry.id))) return false;
  const { error } = await account.client.from("studio_entries").upsert(
    entries.map((entry) => entryRow(entry, account.id)),
    { onConflict: "user_id,id", ignoreDuplicates: true },
  );
  if (error) return false;
  revalidatePath("/studio");
  return true;
}

export async function loadAccountEntries(accountId: string) {
  const account = await studioIdentity();
  if (account?.kind !== "account" || account.id !== accountId) return null;
  try {
    return await accountEntries(account);
  } catch {
    return null;
  }
}
