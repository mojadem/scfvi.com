import { atom, computed } from "nanostores";
import { type Type, type Campaign, type Entry } from "@lib/types.ts";
import { filters } from "@lib/stores/filters.ts";
import { filterEntries } from "@lib/filter.ts";

export const entries = atom<Entry[]>([]);
export const campaigns = atom<Campaign[]>([]);
export const types = atom<Type[]>([]);

export const filteredEntries = computed(
  [entries, filters],
  (entries, filters) => {
    return filterEntries(entries, filters).map((entry) => entry.id);
  },
);
