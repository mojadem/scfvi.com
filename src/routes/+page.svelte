<script lang="ts">
	import * as Sheet from '$lib/components/ui/sheet';
	import * as Pagination from '$lib/components/ui/pagination';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button/index.js';
	import FilterSelection from '$lib/components/filter-selection.svelte';
	import EntryCard from '$lib/components/entry-card.svelte';
	import { browser } from '$app/environment';

	export let data;

	const allCampaigns = { value: 'all', label: 'All Campaigns' };
	const allTypes = { value: 'all', label: 'All Content' };

	let campaignSelection = allCampaigns;
	let typeSelection = allTypes;

	let searchString = '';

	const pageSize = 20;
	let currentPage = 1;

	function resetFilters() {
		campaignSelection = allCampaigns;
		typeSelection = allTypes;
		searchString = '';
	}

	function scrollToTop() {
		if (!browser) {
			return;
		}

		window.scrollTo(0, 0);
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
		})
		.filter((entry) => {
			return (
				entry.title.toLowerCase().includes(searchString.toLowerCase()) ||
				entry.author.toLowerCase().includes(searchString.toLowerCase())
			);
		});

	$: pageEntries = filteredEntries.slice((currentPage - 1) * pageSize, currentPage * pageSize);

	$: currentPage, scrollToTop();
</script>

<div>
	<div class="flex">
		<Input bind:value={searchString} placeholder={`Search entries...`} />
		<div class="mx-2" />
		<Sheet.Root>
			<Sheet.Trigger>
				<Button>filters</Button>
			</Sheet.Trigger>
			<Sheet.Content>
				<Sheet.Header>
					<Sheet.Title>Filter Entries</Sheet.Title>
				</Sheet.Header>
				<div class="my-2" />
				<div class="grid w-full grid-cols-1 gap-2">
					<FilterSelection
						defaultSelection={allCampaigns}
						bind:selected={campaignSelection}
						items={data.campaigns}
					/>

					<FilterSelection
						defaultSelection={allTypes}
						bind:selected={typeSelection}
						items={data.types}
					/>

					<Button on:click={resetFilters}>reset</Button>
				</div>
			</Sheet.Content>
		</Sheet.Root>
	</div>
	<div class="my-2"></div>

	<div>
		<span>{filteredEntries.length} result{filteredEntries.length === 1 ? '' : 's'} found</span>
		{#if campaignSelection.value !== 'all'}
			<button
				class="font-bold hover:line-through"
				on:click={() => {
					campaignSelection = allCampaigns;
				}}
				>{campaignSelection.label}
			</button>
		{/if}
		{#if typeSelection.value !== 'all'}
			<button
				class="font-bold hover:line-through"
				on:click={() => {
					typeSelection = allTypes;
				}}
				>{typeSelection.label}
			</button>
		{/if}
	</div>
	<div class="my-2"></div>

	{#if filteredEntries.length > 0}
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

		{#if filteredEntries.length > pageSize}
			<Pagination.Root
				count={filteredEntries.length}
				perPage={pageSize}
				bind:page={currentPage}
				let:pages
			>
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

		<div class="my-2"></div>
		<div class="flex justify-center">
			<button class="hover:underline" on:click={scrollToTop}>back to top</button>
		</div>
	{/if}
</div>
