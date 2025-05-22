import { map } from "nanostores";
import {
  defaultFilters,
  type Filters,
  type FiltersArrayKey,
  type FiltersStringKey,
} from "@lib/filter.ts";

export const filters = map<Filters>(defaultFilters);

export function toggleOneArrayValue(key: FiltersArrayKey, value: string) {
  let currentFilters = filters.get()[key];
  let i = currentFilters.indexOf(value);
  if (i < 0) {
    filters.setKey(key, [...currentFilters, value]);
  } else {
    filters.setKey(key, [...currentFilters.filter((v) => v != value)]);
  }
}

export function toggleAllButOneArrayValue(
  key: FiltersArrayKey,
  targetValue: string,
  allValues: string[],
) {
  const targetArray = allValues.filter((v) => v !== targetValue);
  const currentArray = filters.get()[key];
  if (JSON.stringify(currentArray) === JSON.stringify(targetArray)) {
    filters.setKey(key, []);
  } else {
    filters.setKey(key, [...targetArray]);
  }
}

export function toggleAllArrayValues(key: FiltersArrayKey, values: string[]) {
  if (filters.get()[key].length) {
    filters.setKey(key, []);
  } else {
    filters.setKey(key, [...values]);
  }
}

export function toggleString(key: FiltersStringKey, value: string) {
  if (filters.get()[key] === value) {
    filters.setKey(key, "");
  } else {
    filters.setKey(key, value);
  }
}
