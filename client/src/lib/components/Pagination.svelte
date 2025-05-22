<script lang="ts">
  import { filteredEntries } from "@lib/stores/entries.ts";
  import { page, PAGE_SIZE } from "@lib/stores/page.ts";

  let numPages = $state(0);

  filteredEntries.subscribe((entries) => {
    numPages = Math.ceil(entries.length / PAGE_SIZE);
  });
</script>

<nav>
  {#if $page !== 0}
    <button onclick={() => page.set(page.get() - 1)}>&lt;</button>
  {/if}
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
  {#if $page !== numPages - 1}
    <button onclick={() => page.set(page.get() + 1)}>&gt;</button>
  {/if}
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
