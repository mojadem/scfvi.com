<script lang="ts">
  import {
    filters as filters,
    type FiltersStringKey,
  } from "@lib/state.svelte.ts";

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
