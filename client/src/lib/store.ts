import { atom, computed, map } from "nanostores";
import { type Type, type Campaign, type Entry } from "@lib/types.ts";
import {
  defaultFilters,
  filterEntries,
  type Filters,
  type FiltersArrayKey,
} from "@lib/filter.ts";

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

export function toggleOneArrayValue(key: FiltersArrayKey, value: string) {
  let currentFilters = filters.get()[key];
  let i = currentFilters.indexOf(value);
  if (i < 0) {
    filters.setKey(key, [...currentFilters, value]);
  } else {
    filters.setKey(key, [...currentFilters.filter((v) => v != value)]);
  }
}

export function toggleAllArrayValues(key: FiltersArrayKey, values: string[]) {
  if (filters.get()[key].length) {
    filters.setKey(key, []);
  } else {
    filters.setKey(key, [...values]);
  }
}
