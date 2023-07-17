<script lang="ts">
	import { page } from '$app/stores';

	export let limit: number = 10;
	export let queryParam: string = 'search';
	export let searchParam: string = '';
	export let pageNo: number = 1;
	export let totalPages: number;
	export let totalHits: number;
	export let resultsAreEmpty: boolean;
	export let resultsAreEmptyMessage: string = 'No results!';

	let timer: NodeJS.Timeout | null = null;
	let searchQuery: string = '';
	let searchForm: HTMLFormElement;

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
</script>

<div class="overflow-x-auto">
	<div class="flex items-center justify-between py-4 w-auto flex flex-row items-center">
		<form
			id="searchForm"
			bind:this={searchForm}
			on:change={() => searchForm.requestSubmit()}
			class="space-x-2"
		>
			<label for={queryParam} class="label-text">Search title</label>
			<input
				name={queryParam}
				id={queryParam}
				bind:value={searchQuery}
				on:input={resetTimer}
				placeholder="Search by title"
				aria-label="Search by title"
				class="input input-bordered w-full md:w-auto mr-1"
			/>
			<label for="limit" class="label-text">Results per page</label>
			<select name="limit" id="limit" class="select select-bordered">
				<option selected={limit == 10}>10</option>
				<option selected={limit == 25}>25</option>
				<option selected={limit == 50}>50</option>
				<option selected={limit == 100}>100</option>
			</select>
		</form>
		<div class="mr-auto ml-4">
			<!-- If user does not have JS, enable this form by adding a button (not needed for JS users!) -->
			<noscript>
				<button type="submit" form="searchForm" class="btn btn-primary">Update</button>
			</noscript>
		</div>
	</div>

	<div class="flex items-center justify-between mb-4">
		<div>
			<a
				class="btn btn-secondary lg:btn-wide"
				href="{$page.url.pathname}?search={searchParam}&limit={limit}"
				class:btn-disabled={pageNo == 1}>First</a
			>
			<a
				class="btn btn-primary lg:btn-wide"
				href="{$page.url.pathname}?page={pageNo - 1}&search={searchParam}&limit={limit}"
				class:btn-disabled={pageNo == 1 || totalPages == 0}
				>Previous
			</a>
		</div>

		<div class="flex items-center">
			<span class="mr-2">Page</span>

			<form method="get">
				<label for="page" class="hidden" />
				<input
					class="w-16 px-2 py-1 border border-gray-300 rounded-md"
					type="text"
					name="page"
					disabled={totalPages == 0}
					value={pageNo}
				/>
			</form>
			<span class="ml-2"
				>of {totalPages} <span class="label-text font-thin">({totalHits} hits)</span></span
			>
		</div>

		<div>
			<a
				class="btn btn-primary lg:btn-wide"
				href="{$page.url.pathname}?page={pageNo + 1}&search={searchParam}&limit={limit}"
				class:btn-disabled={pageNo == totalPages || totalPages == 0}>Next</a
			>
			<a
				class="btn btn-secondary lg:btn-wide"
				href="{$page.url.pathname}?page={totalPages}&search={searchParam}&limit={limit}"
				class:btn-disabled={pageNo == totalPages || totalPages == 0}>Last</a
			>
		</div>
	</div>
	{#if resultsAreEmpty}
		<div class="prose-lg text-center mt-16">
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
