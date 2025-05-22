<script lang="ts">
  import { filteredEntries } from "@lib/store.ts";
  import { page, PAGE_SIZE } from "@lib/stores/page.ts";

  let numPages = $state(0);

  filteredEntries.subscribe((entries) => {
    numPages = Math.ceil(entries.length / PAGE_SIZE);
  });
</script>

<nav>
  {#each Array(numPages) as _, i}
    {#if i === $page}
      <span class="bold">{i + 1}</span>
    {:else}
      <button
        onclick={() => {
          page.set(i);
        }}
      >
        {i + 1}
      </button>
    {/if}
  {/each}
</nav>

<style>
  nav {
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 0.5rem;
  }

  button {
    font: inherit;
    padding: 0;
  }
</style>
