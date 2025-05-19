<script lang="ts">
  import { defaultFilters } from "@lib/filter.ts";
  import { filters } from "@lib/store.ts";

  function resetFilters() {
    filters.set(defaultFilters);
  }
</script>

<button onclick={resetFilters}>reset</button>
