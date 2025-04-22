<script lang="ts">
	import * as Select from '$lib/components/ui/select';
	import { labelForFilterSelection } from '$lib/utils';

	export let defaultSelection = { value: '', label: '' };
	export let selected = defaultSelection;
	export let items = [{ name: '', id: '' }];
</script>

<Select.Root bind:selected>
	<Select.Trigger {...$$restProps}>
		<Select.Value placeholder="Type" />
	</Select.Trigger>
	<Select.Content>
		<Select.Item value={defaultSelection.value}>{defaultSelection.label}</Select.Item>
		{#each items as item}
			<Select.Item value={item.id}>{labelForFilterSelection(item)}</Select.Item>
		{/each}
	</Select.Content>
</Select.Root>
