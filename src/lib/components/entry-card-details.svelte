<script lang="ts">
	import Tweet from '$lib/components/tweet.svelte';
	import { YouTube } from 'sveltekit-embed';

	import type { Entry } from '$lib/types';

	export let entry: Entry;

	const youTubePrefix = 'https://www.youtube.com/watch?v=';
	const tweetPrefix = 'https://x.com/';

	const shouldShowTweet = () =>
		['Artwork', 'Tweet'].includes(entry.expand['type'].name) && entry.link.startsWith(tweetPrefix);

	const shouldShowYouTube = () =>
		entry.expand['type'].name === 'Video' && entry.link.startsWith(youTubePrefix);
</script>

<div>
	<h2 class="text-xl font-bold">{entry.title}</h2>
	<div class="text-lg">{entry.author}, {entry.year}</div>
	<div>
		<span class="font-bold">{entry.expand['campaign'].name}</span>
		•
		{entry.expand['type'].name}
	</div>
	{@html entry.description}
	{#if shouldShowTweet()}
		<Tweet tweetLink={entry.link.replace(tweetPrefix, '')} />
	{/if}
	{#if shouldShowYouTube()}
		<YouTube youTubeId={entry.link.replace(youTubePrefix, '')} />
	{/if}
</div>
