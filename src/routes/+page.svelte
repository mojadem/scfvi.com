<script lang="ts">
	import * as Sheet from '$lib/components/ui/sheet';
	import * as Select from '$lib/components/ui/select';
	import * as Pagination from '$lib/components/ui/pagination';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button/index.js';
	import FilterSelection from '$lib/components/filter-selection.svelte';
	import EntryCard from '$lib/components/entry-card.svelte';
	import { browser } from '$app/environment';

	export let data;

	const searchableFields = ['title', 'author'];

	const allCampaigns = { value: 'all', label: 'All Campaigns' };
	const allTypes = { value: 'all', label: 'All Content' };

	const defaultSearchSelection = 'title';

	let campaignSelection = allCampaigns;
	let typeSelection = allTypes;
	let searchSelection = defaultSearchSelection;

	let searchString = '';

	const pageSize = 20;
	let currentPage = 1;

	function resetFilters() {
		campaignSelection = allCampaigns;
		typeSelection = allTypes;
		searchSelection = defaultSearchSelection;
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
			if (searchSelection === 'title') {
				return entry.title.toLowerCase().includes(searchString.toLowerCase());
			} else if (searchSelection === 'author') {
				return entry.author.toLowerCase().includes(searchString.toLowerCase());
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
	</header>

	<div class="flex">
		<Input bind:value={searchString} placeholder={`Search by ${searchSelection}...`} />
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

					<Select.Root
						onSelectedChange={(selection) => {
							if (selection === undefined) {
								return;
							}

							searchSelection = selection.value;
						}}
						selected={{ value: searchSelection, label: `Search by ${searchSelection}` }}
					>
						<Select.Trigger>
							<Select.Value />
						</Select.Trigger>
						<Select.Content>
							{#each searchableFields as field}
								<Select.Item value={field}>{`Search by ${field}`}</Select.Item>
							{/each}
						</Select.Content>
					</Select.Root>

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
			<button class="text-sm underline" on:click={scrollToTop}>Back to top</button>
		</div>

		<div class="my-4"></div>
	{/if}
</div>
