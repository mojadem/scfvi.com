<script lang="ts">
  import type { FiltersArrayKey } from "@lib/filter.ts";
  import { filters } from "@lib/store.ts";

  let { key, values }: { key: FiltersArrayKey; values: string[] } = $props();

  function updateFilters() {
    if (filters.get()[key].length) {
      filters.setKey(key, []);
    } else {
      filters.setKey(key, [...values]);
    }
  }
</script>

<button onclick={updateFilters}> toggle all </button>

<style>
  button {
    display: block;
    margin-top: 1rem;
  }
</style>
