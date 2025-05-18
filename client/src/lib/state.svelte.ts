import { filterEntries, type Filters, type FiltersArrayKey } from "./filter.ts";

export const filters = $state<Filters>({
  title: "",
  author: "",
  year: "",
  campaigns: [],
  types: [],
});

export function resetFilters() {
  filters.title = "";
  filters.author = "";
  filters.year = "";
  filters.campaigns = [];
  filters.types = [];
}

export function toggleElement(key: FiltersArrayKey, value: string) {
  let i = filters[key].indexOf(value);
  if (i < 0) {
    filters[key].push(value);
  } else {
    filters[key].splice(i);
  }
}
