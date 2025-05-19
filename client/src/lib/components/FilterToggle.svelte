<script lang="ts">
  import type { FiltersArrayKey } from "@lib/filter.ts";
  import { filters } from "@lib/store.ts";

  let { key, value }: { key: FiltersArrayKey; value: string } = $props();
  let active = $state(false);

  filters.subscribe((newFilters) => {
    active = newFilters[key].includes(value);
  });

  function updateFilters() {
    let currentFilters = filters.get()[key];
    let i = currentFilters.indexOf(value);
    if (i < 0) {
      filters.setKey(key, [...currentFilters, value]);
    } else {
      filters.setKey(key, [...currentFilters.filter((v) => v != value)]);
    }
  }
</script>

<button class:active onclick={updateFilters}>
  {value}
</button>

<style>
  .active {
    text-decoration: line-through;
  }
</style>
