<script lang="ts">
	import type { Entry } from '$lib/types';
	import * as Card from '$lib/components/ui/card';
	import * as Dialog from '$lib/components/ui/dialog';
	import EntryCardDetails from '$lib/components/entry-card-details.svelte';

	export let entry: Entry;

	const entryCampaignSelection = {
		value: entry.expand['campaign'].id,
		label: entry.expand['campaign'].name
	};
	const entryTypeSelection = {
		value: entry.expand['type'].id,
		label: entry.expand['type'].name
	};

	export let campaignSelection = entryCampaignSelection;
	export let typeSelection = entryTypeSelection;
</script>

<Card.Root>
	<Card.Content class="flex pb-0 text-left">
		<span class="text-3xl font-bold">{entry.index + 1}</span>
		<div class="mx-2" />
		<div class="min-w-0">
			<h2 class="truncate text-xl font-bold">
				{entry.title}
			</h2>
			<div class="text-lg">{entry.author}, {entry.year}</div>
			<div>
				<button
					class="font-bold hover:underline"
					on:click={() => {
						campaignSelection = entryCampaignSelection;
					}}
				>
					{entry.expand['campaign'].name}
				</button>
				•
				<button
					class="hover:underline"
					on:click={() => {
						typeSelection = entryTypeSelection;
					}}
				>
					{entry.expand['type'].name}
				</button>
			</div>
		</div>
	</Card.Content>
	<Card.Footer class="flex p-4">
		<Dialog.Root>
			<Dialog.Trigger class="grow bg-primary p-2 text-center text-bright-green">view</Dialog.Trigger
			>
			<Dialog.Content class="w-[350px]">
				<EntryCardDetails {entry} />
			</Dialog.Content>
		</Dialog.Root>
		<div class="mx-2" />
		<a class="grow bg-primary p-2 text-center text-bright-green" href={entry.link} target="_blank">
			link
		</a>
	</Card.Footer>
</Card.Root>
