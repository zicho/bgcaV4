<script lang="ts">
	import PageHeaderToolbar from "$lib/components/ui/PageHeaderToolbar.svelte";
	import PageHeaderToolbarButton from "$lib/components/ui/PageHeaderToolbarButton.svelte";
	import { getDate } from "$lib/functions/util/getDate";
	import type { PageData } from "./$types";

	export let data: PageData;
</script>

<svelte:head>
	<title>Events</title>
</svelte:head>

<PageHeaderToolbar title="Events" subheader="Find, plan organize events here">
	<PageHeaderToolbarButton displayText="Create event" url="/events/create" icon="fa-plus" />
	<PageHeaderToolbarButton displayText="Find events" url="/events/find" icon="fa-search" />
</PageHeaderToolbar>

<input
	type="date"
	id="start"
	name="trip-start"
	value={getDate()}
	min={getDate()}
	max={getDate({ addMonths: 1 })}
/>
