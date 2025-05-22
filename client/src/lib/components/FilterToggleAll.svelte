<script lang="ts">
  import type { FiltersArrayKey } from "@lib/filter.ts";
  import { toggleAllArrayValues } from "@lib/stores/filters.ts";

  let { key, values }: { key: FiltersArrayKey; values: string[] } = $props();
</script>

<button onclick={() => toggleAllArrayValues(key, values)}> toggle all </button>

<style>
  button {
    display: block;
    margin-top: 1rem;
  }
</style>
