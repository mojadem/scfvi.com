<script lang="ts">
	import * as Pagination from '$lib/components/ui/pagination';
	import { Button } from '$lib/components/ui/button/index.js';
	import FilterSelection from '$lib/components/filter-selection.svelte';
	import EntryCard from '$lib/components/entry-card.svelte';
	import { browser } from '$app/environment';

	export let data;

	const allCampaigns = { value: 'all', label: 'All Campaigns' };
	const allTypes = { value: 'all', label: 'All Content' };
	const pageSize = 20;

	let campaignSelection = allCampaigns;
	let typeSelection = allTypes;
	let currentPage = 1;

	function resetFilters() {
		campaignSelection = allCampaigns;
		typeSelection = allTypes;
	}

	function scrollToTop() {
		if (browser) {
			window.scrollTo(0, 0);
		}
	}

	function resetPage() {
		currentPage = 1;
	}

	$: campaignSelection.value, resetPage();
	$: typeSelection.value, resetPage();

	$: filteredEntries = data.entries
		.filter((entry) => {
			if (campaignSelection.value === 'all') {
				return true;
			} else {
				return entry.campaign === campaignSelection.value;
			}
		})
		.filter((entry) => {
			if (typeSelection.value === 'all') {
				return true;
			} else {
				return entry.type === typeSelection.value;
			}
		});

	$: pageEntries = filteredEntries.slice((currentPage - 1) * pageSize, currentPage * pageSize);

	$: currentPage, scrollToTop();
</script>

<div class="container mx-auto">
	<header class="my-4">
		<h1 class="scroll-m-20 font-display text-4xl font-extrabold tracking-tight lg:text-5xl">
			SAUDI CYBERFEMINISM VISUAL INDEX
		</h1>
		<div class="my-2"></div>
		<div class="flex justify-start">
			<FilterSelection
				defaultSelection={allCampaigns}
				bind:selected={campaignSelection}
				items={data.campaigns}
				class="w-[250px]"
			/>
			<div class="mx-2"></div>

			<FilterSelection
				defaultSelection={allTypes}
				bind:selected={typeSelection}
				items={data.types}
				class="w-[125px]"
			/>
			<div class="mx-2"></div>

			<Button on:click={resetFilters}>Reset</Button>
		</div>
	</header>

	<p>{filteredEntries.length} results found</p>
	<div class="my-2"></div>

	{#if filteredEntries.length > 0}
		<Pagination.Root
			count={filteredEntries.length}
			perPage={pageSize}
			bind:page={currentPage}
			let:pages
		>
			<div class="grid grid-cols-1 gap-4 md:grid-cols-2" style="grid-template-rows: 1fr;">
				{#each pageEntries as entry, index}
					{#if index === 1}
						<!-- column stagger -->
						<div class="hidden md:block"></div>
					{/if}
					<div class="row-span-2">
						<EntryCard {entry} bind:campaignSelection bind:typeSelection />
					</div>
				{/each}
			</div>
			<div class="my-2"></div>

			<Pagination.Content>
				<Pagination.Item>
					<Pagination.PrevButton />
				</Pagination.Item>
				{#each pages as page (page.key)}
					{#if page.type === 'ellipsis'}
						<Pagination.Item>
							<Pagination.Ellipsis />
						</Pagination.Item>
					{:else}
						<Pagination.Item isVisible={currentPage == page.value}>
							<Pagination.Link {page} isActive={currentPage == page.value}>
								{page.value}
							</Pagination.Link>
						</Pagination.Item>
					{/if}
				{/each}
				<Pagination.Item>
					<Pagination.NextButton />
				</Pagination.Item>
			</Pagination.Content>
		</Pagination.Root>
	{/if}

	<div class="my-4"></div>
</div>
