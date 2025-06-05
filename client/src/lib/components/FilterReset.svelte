<script lang="ts">
  import { defaultFilters } from "@lib/filter.ts";
  import { filters } from "@lib/stores/filters.ts";
  import { useTranslations, type SupportedLocale } from "@lib/i18n.ts";

  const { locale }: { locale: SupportedLocale } = $props();
  const i18n = useTranslations(locale);

  function resetFilters() {
    filters.set(defaultFilters);
  }
</script>

<button onclick={resetFilters}>{i18n("reset")}</button>

<style>
  button {
    font-size: 1rem;
  }
</style>
