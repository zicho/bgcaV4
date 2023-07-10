<script lang="ts">
	import PageHeaderToolbar from '$lib/components/ui/PageHeaderToolbar.svelte';
	import PageHeaderToolbarButton from '$lib/components/ui/PageHeaderToolbarButton.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<PageHeaderToolbar title={data.game?.name} subheader={data.game?.yearPublished?.toString()}>
	{#if data.inCollection}
		<PageHeaderToolbarButton
			displayText="Remove from collection"
			url="/events/create"
            className="secondary"
			icon="fa-minus"
		/>
	{:else}
		<PageHeaderToolbarButton
			displayText="Add to collection"
			url="/events/create"
			icon="fa-plus"
		/>
	{/if}

	<PageHeaderToolbarButton displayText="Create event" url="/events/create" icon="fa-calendar" />
</PageHeaderToolbar>

<section class="grid grid-cols-5 gap-8">
	<article class="col-span-1 flex items-start">
		<img
			class="aspect-square border border-primary h-64"
			alt="{data.game?.name} box art"
			src={data.game?.imageUrl}
		/>
	</article>

	<article>
		<div class="flex justify-between">
			<span class="font-semibold">Column 1 (force left)</span>
			<span class="text-right">content1 (force right)</span>
		</div>
		<!-- Add more rows here -->
	</article>
</section>

<section class="mt-8 prose-sm">
	<h1>Game description</h1>
	<p>{data.game?.desc}</p>
</section>
<!-- 
<div class="grid grid-cols-3">
	<div class="col-span-3 md:col-span-1 flex items-start">
		<img class="aspect-square border border-primary" alt="{data.game?.name} box art" src={data.game?.imageUrl} />
	</div>
	<div class="md:px-4 col-span-3 md:col-span-2 mt-4 md:mt-0">
		<p>{data.game?.desc}</p>
	</div>
</div> -->
