<script lang="ts">
  import { filteredEntries } from "@lib/stores/entries.ts";
  import { page, PAGE_SIZE } from "@lib/stores/page.ts";
  import { effect } from "nanostores";

  let numPages = $state(0);
  let paginationNumbers = $state<number[]>([]);

  filteredEntries.subscribe((entries) => {
    numPages = Math.ceil(entries.length / PAGE_SIZE);
  });

  effect([page, filteredEntries], (newPage) => {
    paginationNumbers = getPaginationNumbers(newPage);
    window.scrollTo(0, 0);
  });

  function getPaginationNumbers(curPage: number) {
    if (numPages < 7) {
      let arr = [];
      for (let i = 0; i < numPages; i++) {
        arr.push(i);
      }
      return arr;
    }

    if (curPage < 4) {
      return [0, 1, 2, 3, 4, numPages - 1];
    }

    if (curPage > numPages - 5) {
      return [
        0,
        numPages - 5,
        numPages - 4,
        numPages - 3,
        numPages - 2,
        numPages - 1,
      ];
    }

    return [0, curPage - 1, curPage, curPage + 1, numPages - 1];
  }
</script>

<nav>
  {#if numPages > 1}
    {#if $page !== 0}
      <button
        class="pagination-button"
        onclick={() => page.set(page.get() - 1)}
      >
        &lt;
      </button>
    {:else}
      <span class="pagination-button">&nbsp;</span>
    {/if}
    {#each paginationNumbers as p}
      {#if p === $page}
        <span class="bold pagination-button">{p + 1}</span>
      {:else}
        <button
          class="pagination-button"
          onclick={() => {
            page.set(p);
          }}
        >
          {p + 1}
        </button>
      {/if}
    {/each}
    {#if $page !== numPages - 1}
      <button
        class="pagination-button"
        onclick={() => page.set(page.get() + 1)}
      >
        &gt;
      </button>
    {:else}
      <span class="pagination-button">&nbsp;</span>
    {/if}
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

  .pagination-button {
    width: 2rem;
    text-align: center;
  }
</style>
