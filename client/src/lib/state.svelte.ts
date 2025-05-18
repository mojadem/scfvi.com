export type Filters = {
  title: string;
  author: string;
  year: string;
  campaigns: string[];
  types: string[];
};

export type FiltersStringKey = keyof Pick<Filters, "title" | "author" | "year">;
export type FiltersArrayKey = keyof Pick<Filters, "campaigns" | "types">;

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
