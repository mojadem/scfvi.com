<script lang="ts">
  import {
    filters,
    toggleElement,
    type FiltersArrayKey,
  } from "@lib/state.svelte.ts";

  let { key, value }: { key: FiltersArrayKey; value: string } = $props();
  let active = $derived(filters[key].includes(value));
</script>

<button class:active onclick={() => toggleElement(key, value)}>{value}</button>

<style>
  .active {
    text-decoration: line-through;
  }
</style>
