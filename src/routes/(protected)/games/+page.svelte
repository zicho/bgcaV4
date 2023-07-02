<script lang="ts">
	import LinkCard from '$lib/components/ui/LinkCard.svelte';
	import PageHeaderToolbar from '$lib/components/ui/PageHeaderToolbar.svelte';
	import PageHeaderToolbarButton from '$lib/components/ui/PageHeaderToolbarButton.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>Games</title>
</svelte:head>

<PageHeaderToolbar title="Games" subheader="Organize your game collection">
	<PageHeaderToolbarButton displayText="Import collection" url="/games/import" icon="fa-download" />
</PageHeaderToolbar>

<div class="prose">
	{#if data.games.length > 0}

	<div class="flex flex-wrap -mx-4">
		{#each data.games as game}
			<div class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 px-4 mb-8">
				<a href="/games/{game.name}/{game.name?.toLocaleLowerCase()}">
					<div class="bg-white rounded-lg shadow-lg flex flex-col h-full">
						<img
							class="my-0 aspect-square w-full max-h-72"
							src={game.thumbnail}
							alt="{game.name} cover art"
						/>
						<div class="flex-grow p-4 relative">
							<div class="flex justify-between items-center">
								<div class="font-bold text-xl">
									<h2 class="m-0">{game.name}</h2>
								</div>
								<!-- <span class="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
									{game.bggRating}
								</span> -->
							</div>
							<!-- <p class="truncate-lines-2 text-gray-600">
								{game.description ? game.description : 'No description available'}
							</p> -->
						</div>
					</div>
				</a>
			</div>
		{/each}
	</div>

	{:else}
		<span>No games found! Import your collection or add games manually.</span>
	{/if}
</div>

<div
	class="mt-8 mb-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
>
	<LinkCard
		title="SvelteKit"
		imgUrl="https://cdn.hashnode.com/res/hashnode/image/upload/v1619358925225/50e2XssdE.png"
		imgAlt="sveltekit logo"
		url="https://kit.svelte.dev/"
	>
	</LinkCard>
</div>