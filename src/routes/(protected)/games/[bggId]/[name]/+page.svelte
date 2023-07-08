<script lang="ts">
	import PageHeaderToolbar from '$lib/components/ui/PageHeaderToolbar.svelte';
	import PageHeaderToolbarButton from '$lib/components/ui/PageHeaderToolbarButton.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<PageHeaderToolbar title={data.game?.name} subheader={data.game?.yearPublished?.toString()}>
	<PageHeaderToolbarButton displayText="Add to collection" url="/events/create" icon="fa-plus" />
	<PageHeaderToolbarButton displayText="Create event" url="/events/create" icon="fa-calendar" />
</PageHeaderToolbar>

<div class="grid grid-cols-3">
	<div class="col-span-3 md:col-span-1 flex justify-center items-center ">
		<img class="aspect-square border border-primary" alt="{data.game?.name} box art" src={data.game?.imageUrl} />
	</div>
	<div class="md:px-4 col-span-3 md:col-span-2 mt-4 md:mt-0">
		<p>{data.game?.desc}</p>
	</div>
</div>
