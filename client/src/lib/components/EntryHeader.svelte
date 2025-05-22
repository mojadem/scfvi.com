<script lang="ts">
  import { campaigns, types } from "@lib/stores/entries.ts";
  import {
    toggleAllButOneArrayValue,
    toggleString,
  } from "@lib/stores/filters.ts";
  import type { Entry } from "@lib/types.ts";

  let { entry }: { entry: Entry } = $props();

  function formatIndex() {
    return (entry.index + 1).toString().padStart(3, "0");
  }
</script>

<header>
  <span class="index">
    {formatIndex()}
  </span>
  <div class="flex-pad-gap content">
    <button
      onclick={() => {
        toggleString("title", entry.title);
      }}
    >
      <h3>{entry.title}</h3>
    </button>
    <div>
      <button
        onclick={() =>
          toggleAllButOneArrayValue(
            "types",
            entry.expand.type.name,
            types.get().map((t) => t.name),
          )}
      >
        {entry.expand.type.name}
      </button>,
      <button onclick={() => toggleString("author", entry.author)}>
        {entry.author}
      </button>,
      <button onclick={() => toggleString("year", entry.year.toString())}>
        {entry.year}
      </button>
    </div>
    <div class="bold">
      {#each entry.expand.campaign as campaign}
        <button
          onclick={() =>
            toggleAllButOneArrayValue(
              "campaigns",
              campaign.name,
              campaigns.get().map((c) => c.name),
            )}
        >
          {campaign.name}
        </button>
      {/each}
    </div>
  </div>
</header>

<style>
  header {
    display: flex;
  }

  button {
    font: inherit;
    text-align: inherit;
    padding: 0;
  }

  h3 {
    margin: 0;
  }

  .index {
    font-size: 1.5rem;
    margin-right: 1rem;
  }

  .content {
    gap: 0.25rem;
  }
</style>
