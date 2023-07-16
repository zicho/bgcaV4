<script lang="ts">
	import TimeoutSearchInput from '$lib/components/TimeoutSearchInput.svelte';
	import PageHeaderToolbar from '$lib/components/ui/PageHeaderToolbar.svelte';
	import PageHeaderToolbarButton from '$lib/components/ui/PageHeaderToolbarButton.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	$: ({ page, totalPages, totalHits, searchParam } = data);
</script>

<PageHeaderToolbar title="Games" subheader="Find and view games">
	<PageHeaderToolbarButton
		displayText="View your collection"
		url="/games/collection"
		icon="fa-list"
	/>
</PageHeaderToolbar>

<div class="overflow-x-auto">
	<div class="flex items-center justify-between py-4 mb-4">
		<TimeoutSearchInput />
	</div>

	<div class="flex items-center justify-between">
		<div>
			<a
				class="btn btn-secondary lg:btn-wide"
				href="/games?search={searchParam}"
				class:btn-disabled={page == 1}>First</a
			>
			<a
				class="btn btn-primary lg:btn-wide"
				href="/games?page={page - 1}&search={searchParam}"
				class:btn-disabled={page == 1 || totalPages == 0}>Previous</a
				class:btn-disabled={page == 1 || totalPages == 0}>Previous</a
			>
		</div>

		<div class="flex items-center">
			<span class="mr-2">Page</span>

			<form method="get">
				<input
					class="w-16 px-2 py-1 border border-gray-300 rounded-md"
					type="text"
					name="page"
					disabled={totalPages == 0}
					value={page}
				/>
			</form>
			<span class="ml-2">of {totalPages} <span class="label-text font-thin">({totalHits} hits)</span></span>
		</div>

		<div>
			<a
				class="btn btn-primary lg:btn-wide"
				href="/games?page={page + 1}&search={searchParam}"
				class:btn-disabled={page == totalPages || totalPages == 0}>Next</a
			>
			<a
				class="btn btn-secondary lg:btn-wide"
				href="/games?page={totalPages}&search={searchParam}"
				class:btn-disabled={page == totalPages || totalPages == 0}>Last</a
			>
		</div>
	</div>
	{#if data.games.length == 0}
		<div class="prose-lg text-center mt-16">
			<span>No results!</span>
		</div>
	{:else}
		<table class="table w-full table-auto">
			<thead>
				<tr>
					<th class="w-auto px-0 min-w-10rem">Name</th>
					<th class="w-full hidden md:table-cell">About</th>
					<th class="w-auto">Rating</th>
					<th class="w-auto hidden md:block" />
				</tr>
			</thead>
			<tbody>
				{#each data.games as game}
					<tr>
						<td class="px-0 ">
							<div class="flex items-center space-x-3 ">
								<div class="avatar">
									<div class="w-32 h-32">
										<a href="/games/{game.bggId}">
											<img src={game.thumbnail} alt="{game.name} cover art" />
										</a>
									</div>
								</div>
								<div>
									<div class="font-bold hover:underline">
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
							<!-- <span class="text-lg">{game.rating?.substring(0, 3)}</span> -->
						</td>
						<th class="hidden md:table-cell px-0">
							<a href="/games/{game.bggId}" class="btn btn-secondary">details</a>
						</th>
					</tr>
				{/each}
			</tbody>
		</table>
	{/if}
</div>
