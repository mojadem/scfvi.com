import { filteredEntries } from "@lib/stores/entries.ts";
import { atom } from "nanostores";

export const PAGE_SIZE = 20;

export const page = atom(0);

filteredEntries.subscribe(() => {
  page.set(0);
});

export function getPageOfEntry(id: string) {
  const i = filteredEntries.get().indexOf(id);
  if (i === -1) {
    return -1;
  }

  return Math.floor(i / PAGE_SIZE);
}
