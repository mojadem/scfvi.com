<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import * as Dialog from '$lib/components/ui/dialog';

	import type { Entry } from '$lib/types';

	export let entry: Entry;

	const maxTitleLength = 40;
</script>

<Dialog.Root>
	<Card.Root>
		<Card.Content>
			<div class="flex">
				<span class="text-3xl font-bold">{entry.index + 1}</span>
				<div class="mx-2"></div>
				<div class="min-w-0">
					<p class="truncate text-xl font-bold">
						{entry.title}
					</p>
					<p>{entry.author}</p>
					<p>
						<span class="font-bold">{entry.expand['campaign'].name}</span>
						•
						<span>{entry.expand['type'].name}</span>
					</p>
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
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<p>Header</p>
		</Dialog.Header>
		<p>Content</p>
	</Dialog.Content>
</Dialog.Root>
