<script lang="ts">
	import * as Table from '$lib/components/ui/table';

	export let data;
</script>

<div class="container mx-auto">
	<header class="mt-4">
		<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
			SAUDI CYBERFEMINISM VISUAL INDEX
		</h1>
	</header>

	<Table.Root>
		<Table.Header>
			<Table.Row>
				<Table.Head class="font-bold">Year</Table.Head>
				<Table.Head class="font-bold">Title</Table.Head>
				<Table.Head class="font-bold">Author</Table.Head>
				<Table.Head class="font-bold">Campaign</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each data.entries as entry}
				<Table.Row>
					<Table.Cell>{entry.year}</Table.Cell>
					<Table.Cell>{entry.title}</Table.Cell>
					<Table.Cell>{entry.author}</Table.Cell>
					<Table.Cell>{entry.expand['campaign'].name}</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
</div>
