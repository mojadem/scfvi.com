<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import * as Dialog from '$lib/components/ui/dialog';

	import Tweet from '$lib/components/tweet.svelte';
	import { YouTube } from 'sveltekit-embed';

	import type { Entry } from '$lib/types';

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

<Dialog.Root>
	<Card.Root>
		<Card.Content>
			<div class="flex">
				<span class="text-3xl font-bold">{entry.index + 1}</span>
				<div class="mx-2"></div>
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
			</div>
		</Card.Content>
		<Card.Footer>
			<Dialog.Trigger>
				<span class="underline">View</span>
			</Dialog.Trigger>
			<div class="mx-2"></div>
			<a href={entry.link} target="_blank" class="underline">Link</a>
		</Card.Footer>
	</Card.Root>
	<Dialog.Content class="w-[350px]">
		<h2 class="text-xl font-bold">{entry.title}</h2>
		<div class="text-lg">{entry.author}, {entry.year}</div>
		<div>
			<span class="font-bold">{entry.expand['campaign'].name}</span>
			•
			{entry.expand['type'].name}
		</div>
		{#if entry.expand['type'].name === 'Video'}
			<YouTube youTubeId={entry.link.split('=')[1]} />
		{/if}
		{#if entry.expand['type'].name === 'Tweet'}
			<Tweet tweetLink={entry.link.replace('https://x.com/', '')} />
		{/if}
	</Dialog.Content>
</Dialog.Root>
