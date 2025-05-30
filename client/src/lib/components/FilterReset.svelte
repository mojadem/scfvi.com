<script lang="ts">
  import { defaultFilters } from "@lib/filter.ts";
  import { filters } from "@lib/stores/filters.ts";

  function resetFilters() {
    filters.set(defaultFilters);
  }
</script>

<button onclick={resetFilters}>reset</button>

<style>
  button {
    font-size: 1rem;
  }
</style>
