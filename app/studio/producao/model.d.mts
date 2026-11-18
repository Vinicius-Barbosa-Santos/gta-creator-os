export type Entry = {
  id: string;
  title: string;
  format: string;
  stage: string;
  date: string;
  notes: string;
  views?: number;
  impressions?: number;
};
export const stages: readonly string[];
export const formats: readonly string[];
export function validDate(value: string): boolean;
export function validEntry(entry: unknown): entry is Entry;
export function calendar(entries: Entry[]): Entry[];
export function metrics(entries: Entry[]): { publications: number; measured: number; views: number; impressions: number };
