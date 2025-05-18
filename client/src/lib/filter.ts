import { type Entry } from "@lib/types.ts";

export type Filters = {
  title: string;
  author: string;
  year: string;
  campaigns: string[];
  types: string[];
};

export type FiltersStringKey = keyof Pick<Filters, "title" | "author" | "year">;
export type FiltersArrayKey = keyof Pick<Filters, "campaigns" | "types">;

export function filterEntries(entries: Entry[], filters: Filters): Entry[] {
  return entries.filter(
    (entry) =>
      entry.title.includes(filters.title) &&
      entry.author.includes(filters.author) &&
      entry.year.toString().includes(filters.year) &&
      filters.campaigns.some((filterCammpaign) =>
        entry.expand.campaign.find(
          (campaign) => filterCammpaign == campaign.name,
        ),
      ) &&
      filters.types.includes(entry.expand.type.name),
  );
}
