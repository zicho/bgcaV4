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

			<div
				class="col-span-8 grid grid-cols-8 border-base-200 border-b hover:bg-base-200 cursor-pointer"
			>

			<a href="/games/{game.bggId}/{game.name}">
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
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel mauris enim. In
						mauris purus, fringilla ac consequat id, mollis at eros. Proin laoreet aliquam risus.
						Maecenas hendrerit justo ac libero fermentum, a auctor felis auctor. Orci varius natoque
						penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam faucibus ut eros
						in suscipit. Sed in mi pretium, viverra augue vel, viverra tellus. Nullam nec eros
						vulputate, congue felis at, lacinia ante. Donec rhoncus sapien id nibh efficitur
						consectetur. Praesent justo enim, rhoncus non feugiat eu, molestie ac lacus.
					</span>
				</div>
				<div class="p-4 col-span-1 flex items-center">
					<span>{game.rating}</span>
				</div>
				<div class="p-4 col-span-1 flex items-center justify-center">
					<a href="/" class="btn btn-secondary">View on BGG</a>
				</div>
			</a>
			</div>
		
	{/each}
</div>
