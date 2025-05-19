<script lang="ts">
  import type { FiltersArrayKey } from "@lib/filter.ts";
  import { filters } from "@lib/store.ts";

  let { key, value }: { key: FiltersArrayKey; value: string } = $props();
  let active = $state(false);

  filters.listen((newFilters) => {
    active = newFilters[key].includes(value);
  });

  function updateFilters() {
    let i = filters.get()[key].indexOf(value);
    if (i < 0) {
      filters.setKey(key, [...filters.get()[key], value]);
    } else {
      filters.setKey(key, filters.get()[key].splice(i));
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
