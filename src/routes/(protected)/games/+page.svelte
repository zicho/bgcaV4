<script lang="ts">
	import PageHeaderToolbar from '$lib/components/ui/PageHeaderToolbar.svelte';
	import PageHeaderToolbarButton from '$lib/components/ui/PageHeaderToolbarButton.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>Games</title>
</svelte:head>

<PageHeaderToolbar title="Games" subheader="Organize your game collection">
	<PageHeaderToolbarButton displayText="Import collection" url="/games/import" icon="fa-import" />
</PageHeaderToolbar>

<div class="prose">
	{#if data.games.length > 0}
		{#each data.games as game}
			<span>{game.name}</span><br />
		{/each}
	{:else}
		<span>No games found! Import your collection or add games manually.</span>
	{/if}
</div>
