import { atom, computed, effect, map } from "nanostores";
import type { Entry } from "@lib/types.ts";
import { defaultFilters, filterEntries, type Filters } from "@lib/filter.ts";

export const filters = map<Filters>(defaultFilters);
export const entries = atom<Entry[]>([]);

export const filteredEntries = computed(
  [entries, filters],
  (entries, filters) => {
    return filterEntries(entries, filters);
  },
);

effect([filters], (filters) => {
  console.log(filters);
});

effect([filteredEntries], (filteredEntries) => {
  console.log(filteredEntries);
});
