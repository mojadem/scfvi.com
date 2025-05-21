<script lang="ts">
  import type { Entry } from "@lib/types.ts";

  let { entry }: { entry: Entry } = $props();

  function formatIndex(index: number) {
    return (index + 1).toString().padStart(3, "0");
  }
</script>

<header>
  <span class="index">
    {formatIndex(entry.index)}
  </span>
  <div class="flex-pad-gap content">
    <h3>{entry.title != "" ? entry.title : entry.expand.type.name}</h3>
    <div>
      {entry.expand.type.name}, {entry.author}, {entry.year}
    </div>
    <div class="bold">
      {entry.expand.campaign.map((campaign) => campaign.name).join(" ")}
    </div>
  </div>
</header>

<style>
  header {
    display: flex;
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
