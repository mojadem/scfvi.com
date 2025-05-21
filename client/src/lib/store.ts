import { atom, computed, map } from "nanostores";
import { type Type, type Campaign, type Entry } from "@lib/types.ts";
import { defaultFilters, filterEntries, type Filters } from "@lib/filter.ts";

export const entries = atom<Entry[]>([]);
export const campaigns = atom<Campaign[]>([]);
export const types = atom<Type[]>([]);

export const filters = map<Filters>(defaultFilters);

export const filteredEntries = computed(
  [entries, filters],
  (entries, filters) => {
    return filterEntries(entries, filters).map((entry) => entry.id);
  },
);
