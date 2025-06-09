<script lang="ts">
  import type { FiltersArrayKey } from "@lib/filter.ts";
  import { filters, toggleOneArrayValue } from "@lib/stores/filters.ts";

  let {
    key,
    value,
    values,
  }: { key: FiltersArrayKey; value: string; values: string[] } = $props();
  let active = $state(false);

  filters.subscribe((newFilters) => {
    active = newFilters[key].includes(value);
  });
</script>

<button class:active onclick={() => toggleOneArrayValue(key, value, values)}>
  <!-- svelte-ignore slot_element_deprecated -->
  <slot />
</button>

<style>
  .active {
    text-decoration: line-through;
  }
</style>
