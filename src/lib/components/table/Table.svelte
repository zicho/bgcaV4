<script lang="ts">
	import { afterNavigate } from "$app/navigation";
	import { page } from "$app/stores";
	import { onMount } from "svelte";
	export let limit: number = 10;
	export let queryParam: string = "search";
	export let searchParam: string = "";
	export let pageNo: number = 1;
	export let totalPages: number;
	export let totalHits: number;
	export let resultsAreEmpty: boolean;
	export let resultsAreEmptyMessage: string = "No results!";

	$: pagesArray = Array.from({ length: totalPages }, (x, i) => i + 1); // [1,2,3,4,5,6,7,8,9,10]

	let timer: NodeJS.Timeout | null = null;
	let searchQuery: string = "";
	let searchForm: HTMLFormElement;
	let inputField: HTMLInputElement;

	let scriptUser: boolean = false;

	onMount(() => (scriptUser = true));

	function startTimer() {
		if (timer) {
			clearTimeout(timer);
		}

		timer = setTimeout(() => {
			searchForm.requestSubmit();
		}, 1000);
	}

	function resetTimer() {
		clearTimeout(timer as NodeJS.Timeout);
		startTimer();
	}

	afterNavigate(() => {
		inputField.focus();
	});
</script>

<div class="overflow-x-auto">
	<div class="flex flex-col xl:flex-row xl:space-y-0 space-y-4 py-4 items-center justify-between">
		<form
			id="searchForm"
			bind:this={searchForm}
			on:change={() => searchForm.requestSubmit()}
			class="space-x-0 space-y-2 flex-col xl:space-y-0 xl:space-x-2 xl:flex-row w-full"
		>
			<label for={queryParam} class="label-text">Search title</label>
			<input
				bind:this={inputField}
				name={queryParam}
				id={queryParam}
				bind:value={searchQuery}
				on:input={resetTimer}
				placeholder="Search by title"
				aria-label="Search by title"
				class="input input-bordered w-full md:w-auto"
			/>
			<label for="limit" class="label-text">Results per page</label>
			<select name="limit" id="limit" class="select select-bordered xl:mt-0 w-full xl:w-auto">
				<option selected={limit == 10}>10</option>
				<option selected={limit == 25}>25</option>
				<option selected={limit == 50}>50</option>
				<option selected={limit == 100}>100</option>
			</select>
		</form>
		<div class="mr-auto flex items-center w-full xl:w-auto">
			<!-- If user does not have JS, enable this form by adding a button (not needed for JS users!) -->
			<noscript>
				<button type="submit" form="searchForm" class="w-full xl:w-auto btn btn-wide btn-primary"
					>search</button
				>
			</noscript>
		</div>
	</div>

	<div class="flex items-center justify-between mb-4 flex-col xl:space-x-2 xl:flex-row">
		<div class="space-x-0 xl:space-x-4 space-y-2 xl:space-y-0 flex flex-col xl:flex-row w-full">
			<a
				class="btn btn-secondary flex-1"
				href="{$page.url.pathname}?search={searchParam}&limit={limit}"
				class:btn-disabled={pageNo == 1}
			>
				First
			</a>
			<a
				class="btn btn-primary flex-1"
				href="{$page.url.pathname}?page={pageNo - 1}&search={searchParam}&limit={limit}"
				class:btn-disabled={pageNo == 1 || totalPages == 0}
			>
				Previous
			</a>
		</div>

		<div class="py-4 xl:py-0 flex items-center justify-center w-full">
			<span class="mr-2">Page</span>

			<form method="get" bind:this={searchForm} on:change={() => searchForm.requestSubmit()}>
				<label for="page" class="hidden" />
				{#if !scriptUser}
					<input
						class="w-16 p-2 border border-gray-300 rounded-md h-full"
						type="text"
						name="page"
						disabled={totalPages == 0}
						value={pageNo}
					/>
				{:else}
					<select
						name="page"
						id="page"
						class="select select-bordered xl:mt-0 w-full xl:w-auto"
						value={pageNo}
					>
						{#each pagesArray as page}
							<option selected>{page}</option>
						{/each}
					</select>
				{/if}
			</form>
			<span class="ml-2">
				of {totalPages} <span class="label-text font-thin">({totalHits} hits)</span>
			</span>
		</div>

		<div
			class="space-x-0 xl:space-x-4 space-y-2 xl:space-y-0 flex flex-col xl:flex-row w-full justify-end"
		>
			<a
				class="btn btn-primary flex-1"
				href="{$page.url.pathname}?page={pageNo + 1}&search={searchParam}&limit={limit}"
				class:btn-disabled={pageNo == totalPages || totalPages == 0}
			>
				Next
			</a>
			<a
				class="btn btn-secondary flex-1"
				href="{$page.url.pathname}?page={totalPages}&search={searchParam}&limit={limit}"
				class:btn-disabled={pageNo == totalPages || totalPages == 0}
			>
				Last
			</a>
		</div>
	</div>

	{#if resultsAreEmpty}
		<div class="prose-xl text-center mt-16">
			<span>{resultsAreEmptyMessage}</span>
		</div>
	{:else}
		<table class="table w-full table-auto">
			<thead>
				<tr>
					<slot name="headers" />
				</tr>
			</thead>
			<tbody>
				<slot name="body" />
			</tbody>
		</table>
	{/if}
</div>
