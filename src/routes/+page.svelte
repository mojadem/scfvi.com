<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import FilterSelection from '$lib/components/filter-selection.svelte';
	import EntryCard from '$lib/components/entry-card.svelte';

	export let data;

	const allCampaigns = { value: 'all', label: 'All Campaigns' };
	const allTypes = { value: 'all', label: 'All Content' };

	let campaignSelection = allCampaigns;
	let typeSelection = allTypes;

	$: entriesToDisplay = data.entries
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

	function resetFilters() {
		campaignSelection = allCampaigns;
		typeSelection = allTypes;
	}
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

	<div class="grid grid-cols-1 gap-4 md:grid-cols-2" style="grid-template-rows: 1fr;">
		{#each entriesToDisplay as entry, index}
			{#if index === 1}
				<div></div>
			{/if}
			<div class="row-span-2">
				<EntryCard {entry} bind:campaignSelection bind:typeSelection />
			</div>
		{/each}
	</div>

	<div class="my-4"></div>
</div>
