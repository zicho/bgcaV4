<script lang="ts">
	import PageHeaderToolbar from '$lib/components/ui/PageHeaderToolbar.svelte';
	import PageHeaderToolbarButton from '$lib/components/ui/PageHeaderToolbarButton.svelte';
	import type { PageData } from './$types';
	import DataTable from '$lib/components/table/DataTable.svelte';
	import Header from '$lib/components/table/Header.svelte';
	import ImageCell from '$lib/components/table/ImageCell.svelte';
	import TitleCell from '$lib/components/table/TitleCell.svelte';
	import TextCell from '$lib/components/table/TextCell.svelte';
	import LinkButtonCell from '$lib/components/table/LinkButtonCell.svelte';
	import Row from '$lib/components/table/Row.svelte';
	import TitleCellSubheader from '$lib/components/table/TitleCellSubheader.svelte';

	export let data: PageData;
</script>

<PageHeaderToolbar title="Collection" subheader="Organize your game collection">
	<PageHeaderToolbarButton displayText="Import collection" url="/games/import" icon="fa-download" />
</PageHeaderToolbar>

{#if data.games.length == 0}
	<span
		>No games yet. <a class="link" href="/games/import">Import your collection</a> or add games manually.</span
	>
{:else}
	<DataTable>
		<slot slot="headers">
			<Header />
			<Header title="Title" />
			<Header title="About" wide />
			<Header title="Rating" />
			<Header />
		</slot>
		<slot slot="data">
			{#each data.games as game}
				<Row href="/games/{game.bggId}/{game.slug}">
					<ImageCell src={game.thumbnail} alt="Image of {game.name} box cover art" />
					<TitleCell title={game.name}>
						<TitleCellSubheader content={game.yearPublished} />
					</TitleCell>
					<TextCell wide content={game.desc} />
					<TextCell content={game.rating} />
					<LinkButtonCell
						href="https://boardgamegeek.com/boardgame/{game.bggId}"
						text="View on BGG"
					/>
				</Row>
			{/each}
		</slot>
	</DataTable>
{/if}
