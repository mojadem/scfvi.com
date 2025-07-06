<script lang="ts">
  import type { FiltersStringKey } from "@lib/filter.ts";
  import { filters } from "@lib/stores/filters.ts";

  let { key }: { key: FiltersStringKey } = $props();
  let value = $state("");

  filters.subscribe((newFilters) => {
    value = newFilters[key];
  });

  function updateFilters() {
    filters.setKey(key, value);
  }
</script>

<input type="text" bind:value oninput={updateFilters} />

<style>
  input {
    display: block;
    box-sizing: border-box;
    width: 100%;
  }
</style>
