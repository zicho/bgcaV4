<script lang="ts">
	import PageHeaderToolbar from '$lib/components/ui/PageHeaderToolbar.svelte';
	import PageHeaderToolbarButton from '$lib/components/ui/PageHeaderToolbarButton.svelte';
	import type { PageData } from './$types';
	import Table from '$lib/components/table/Table.svelte';

	export let data: PageData;
	$: ({ pageNo, totalPages, totalHits, searchParam, limit } = data);
</script>

<PageHeaderToolbar title="Collection" subheader="Organize your game collection">
	<PageHeaderToolbarButton displayText="Import collection" url="/games/import" icon="fa-download" />
</PageHeaderToolbar>

<Table
	{pageNo}
	{totalPages}
	{totalHits}
	{searchParam}
	{limit}
	resultsAreEmpty={data.games.length == 0}
>
	<slot slot="headers">
		<th class="w-auto px-0">Name</th>
		<th class="w-full hidden md:table-cell">About</th>
		<th class="w-auto">Rating</th>
		<th class="w-auto hidden md:block" />
	</slot>
	<slot slot="body">
		{#each data.games as game}
			<tr>
				<td class="px-0">
					<div class="flex items-center space-x-3">
						<div class="avatar">
							<div class="w-32 h-32">
								<a href="/games/{game.bggId}">
									<img src={game.thumbnail} alt="{game.name} cover art" />
								</a>
							</div>
						</div>
						<div>
							<div class="font-bold hover:underline min-w-[200px]">
								<a href="/games/{game.bggId}">{game.name}</a>
							</div>
							<div class="text-sm opacity-50">{game.yearPublished}</div>
						</div>
					</div>
				</td>
				<td>
					<div class="hidden md:block flex items-center justify-center">
						{#if game.desc}
							{game.desc}
						{:else}
							<i class="text-secondary">Description missing</i>
						{/if}
					</div>
				</td>

				<td>
					<div class="badge-neutral text-xl p-4">{game.rating?.substring(0, 3)}</div>
				</td>
				<th class="hidden md:table-cell px-0">
					<a href="/games/{game.bggId}" class="btn btn-secondary">details</a>
				</th>
			</tr>
		{/each}
	</slot>
</Table>
