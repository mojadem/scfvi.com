<script lang="ts">
	import * as Table from '$lib/components/ui/table';

	export let data;
</script>

<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
	SAUDI CYBERFEMINISM VISUAL INDEX
</h1>

<Table.Root>
	<Table.Header>
		<Table.Row>
			<Table.Head>Year</Table.Head>
			<Table.Head>Title</Table.Head>
			<Table.Head>Author</Table.Head>
			<Table.Head>Campaign</Table.Head>
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
