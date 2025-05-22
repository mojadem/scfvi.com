<script lang="ts">
  import type { FiltersArrayKey } from "@lib/filter.ts";
  import { filters, toggleOneArrayValue } from "@lib/stores/filters.ts";

  let { key, value }: { key: FiltersArrayKey; value: string } = $props();
  let active = $state(false);

  filters.subscribe((newFilters) => {
    active = newFilters[key].includes(value);
  });
</script>

<button class:active onclick={() => toggleOneArrayValue(key, value)}>
  {value}
</button>

<style>
  .active {
    text-decoration: line-through;
  }
</style>
