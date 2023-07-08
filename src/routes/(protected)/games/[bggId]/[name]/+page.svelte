<script lang="ts">
	import PageHeaderToolbar from '$lib/components/ui/PageHeaderToolbar.svelte';
	import PageHeaderToolbarButton from '$lib/components/ui/PageHeaderToolbarButton.svelte';
    import type { PageData } from './$types';
    
    export let data: PageData;
</script>

<PageHeaderToolbar title="{data.game?.name}" subheader="{data.game?.yearPublished?.toString()}">
    <PageHeaderToolbarButton displayText="Add to collection" url="/events/create" icon="fa-plus" />
	<PageHeaderToolbarButton displayText="Create event" url="/events/create" icon="fa-calendar" />
</PageHeaderToolbar>

{data.game?.desc}