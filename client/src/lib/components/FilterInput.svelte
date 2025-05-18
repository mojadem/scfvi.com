<script lang="ts">
  import type { FiltersStringKey } from "@lib/filter.ts";
  import { filters as filters } from "@lib/state.svelte.ts";

  let { key }: { key: FiltersStringKey } = $props();
</script>

<input type="text" bind:value={filters[key]} />

<style>
  input {
    display: block;
    box-sizing: border-box;
    width: 100%;
  }
</style>
