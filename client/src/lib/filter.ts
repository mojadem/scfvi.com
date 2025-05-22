import { type Entry } from "@lib/types.ts";

export type Filters = {
  title: string;
  author: string;
  year: string;
  link: string;
  campaigns: string[];
  types: string[];
};

export const defaultFilters: Filters = {
  title: "",
  author: "",
  year: "",
  link: "",
  campaigns: [],
  types: [],
};

export type FiltersStringKey = keyof Pick<Filters, "title" | "author" | "year">;
export type FiltersArrayKey = keyof Pick<Filters, "campaigns" | "types">;

function checkForSubstring(str: string, substr: string): boolean {
  return str.toLowerCase().includes(substr.toLowerCase());
}

export function filterEntries(entries: Entry[], filters: Filters): Entry[] {
  return entries.filter(
    (entry) =>
      checkForSubstring(entry.title, filters.title) &&
      checkForSubstring(entry.author, filters.author) &&
      checkForSubstring(entry.year.toString(), filters.year) &&
      checkForSubstring(entry.link, filters.link) &&
      entry.expand.campaign.some(
        (campaign) => !filters.campaigns.includes(campaign.name),
      ) &&
      !filters.types.includes(entry.expand.type.name),
  );
}
