export type Entry = {
  id: string;
  title: string;
  format: string;
  stage: string;
  date: string;
  notes: string;
  publishedOn?: string;
  views?: number;
  impressions?: number;
};
export const stages: readonly string[];
export const formats: readonly string[];
export function validDate(value: string): boolean;
export function validEntry(entry: unknown): entry is Entry;
export function calendar(entries: Entry[]): Entry[];
export function metrics(entries: Entry[]): { publications: number; measured: number; views: number; impressions: number };

export const storageKey: string;
export function isPublished(stage: string): boolean;
export function productionStorageKey(accountId?: string): string;
export function readEntries(storage: Pick<Storage, "getItem">, accountId?: string): Entry[];
export function publicationToday(now?: Date): string;
export function weeklyPublications(entries: Entry[], now?: Date): { long: number; shorts: number; lives: number; undated: number };
