<script lang="ts">
	import LinkCard from '$lib/components/ui/LinkCard.svelte';
	import PageHeaderToolbar from '$lib/components/ui/PageHeaderToolbar.svelte';
	import PageHeaderToolbarButton from '$lib/components/ui/PageHeaderToolbarButton.svelte';
	import { desc } from 'drizzle-orm';
	import type { PageData } from './$types';
	import DataTable from '$lib/components/table/DataTable.svelte';
	import DataTableHeader from '$lib/components/table/DataTableHeader.svelte';
	import DataTableHeaderContainer from '$lib/components/table/DataTableHeaderContainer.svelte';
	import DataTableDataContainer from '$lib/components/table/DataTableDataContainer.svelte';
	import DataTableImageCell from '$lib/components/table/DataTableImageCell.svelte';
	import DataTableTitleCell from '$lib/components/table/DataTableTitleCell.svelte';
	import DataTableTextCell from '$lib/components/table/DataTableTextCell.svelte';
	import DataTableLinkButtonCell from '$lib/components/table/DataTableLinkButtonCell.svelte';
	import DataTableRow from '$lib/components/table/DataTableRow.svelte';

	export let data: PageData;
</script>

<svelte:head>
	<title>Games</title>
</svelte:head>

<PageHeaderToolbar title="Games" subheader="Organize your game collection">
	<PageHeaderToolbarButton displayText="Import collection" url="/games/import" icon="fa-download" />
</PageHeaderToolbar>

{#if data.games.length == 0}
	<span
		>No games yet. <a class="link" href="/games/import">Import your collection</a> or add games manually.</span
	>
{:else}
	<DataTable width={8}>
		<DataTableHeaderContainer width={8} slot="headers">
			<DataTableHeader />
			<DataTableHeader title="Title" />
			<DataTableHeader title="About" width={4} />
			<DataTableHeader title="Rating" />
			<DataTableHeader />
		</DataTableHeaderContainer>
		<DataTableDataContainer width={8} slot="data">
			{#each data.games as game}
				<DataTableRow width={8} href="/games/{game.bggId}/{game.slug}">
					<DataTableImageCell src={game.thumbnail} alt="Image of {game.name} box cover art" />
					<DataTableTitleCell title={game.name} />
					<DataTableTextCell width={4} content={game.desc} />
					<DataTableTextCell content={game.rating} />
					<DataTableLinkButtonCell
						href="https://boardgamegeek.com/boardgame/{game.bggId}"
						text="View on BGG"
					/>
				</DataTableRow>
			{/each}
		</DataTableDataContainer>
	</DataTable>
{/if}
