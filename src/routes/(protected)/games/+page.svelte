<script lang="ts">
	import LinkCard from '$lib/components/ui/LinkCard.svelte';
	import PageHeaderToolbar from '$lib/components/ui/PageHeaderToolbar.svelte';
	import PageHeaderToolbarButton from '$lib/components/ui/PageHeaderToolbarButton.svelte';
	import { desc } from 'drizzle-orm';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>Games</title>
</svelte:head>

<PageHeaderToolbar title="Games" subheader="Organize your game collection">
	<PageHeaderToolbarButton displayText="Import collection" url="/games/import" icon="fa-download" />
</PageHeaderToolbar>

<div class="grid grid-cols-8 border border-base-200">
	<!-- Column headers -->

	<div
		class="col-span-8 grid grid-cols-8 font-semibold border-b border-base-200 bg-primary-content"
	>
		<div class="p-4 col-span-1" />
		<div class="p-4 col-span-1">Title</div>
		<div class="p-4 col-span-4">About</div>
		<div class="p-4 col-span-1">Rating</div>
		<div class="p-4 col-span-1" />
	</div>

	{#each data.games as game}
		<a
			href="/games/{game.bggId}/{game.slug}"
			class="col-span-8 grid grid-cols-8 border-base-200 border-b hover:bg-base-200 cursor-pointer"
		>
			<div class="p-4 col-span-1 flex justify-center items-center">
				<img alt="Image of {game.name} box cover art" class="h-32 w-32" src={game.thumbnail} />
			</div>
			<div class="p-4 col-span-1 flex items-center">
				<div class="flex flex-col">
					<div class="font-bold overflow-hidden">{game.name}</div>
					<div class="text-sm opacity-50 overflow-hidden">{game.yearPublished}</div>
				</div>
			</div>
			<div class="p-4 col-span-4 flex items-center">
				<span>
					{#if game.desc}
						{game.desc}
					{:else}
						<i>No description yet for this game.</i>
					{/if}
				</span>
			</div>
			<div class="p-4 col-span-1 flex items-center">
				<span>{game.rating}</span>
			</div>
			<div class="p-4 col-span-1 flex items-center justify-center">
				<a
					href="https://boardgamegeek.com/boardgame/{game.bggId}"
					target="_blank"
					class="btn btn-secondary"><i class="fa fa-external-link" /> View on BGG</a
				>
			</div>
		</a>
	{/each}
</div>
