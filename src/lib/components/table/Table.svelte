<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	export let hitsPerPage: number = 10;
	export let queryParam: string = 'search';
	export let searchParam: string = '';
	export let pageNo: number = 1;
	export let totalPages: number;
	export let totalHits: number;
	export let resultsAreEmpty: boolean;
	export let resultsAreEmptyMessage: string = 'No results!';

	let timer: NodeJS.Timeout | null = null;
	let searchQuery: string = '';
	let optionForm: HTMLFormElement;

	function startTimer() {
		if (timer) {
			clearTimeout(timer);
		}

		timer = setTimeout(() => {
			runSearch();
		}, 1000);
	}

	function resetTimer() {
		clearTimeout(timer as NodeJS.Timeout);
		startTimer();
	}

	function runSearch() {
		goto(
			searchQuery
				? `${$page.url.pathname}?${queryParam}=${searchQuery}&limit=${hitsPerPage}`
				: `${$page.url.pathname}?$limit=${hitsPerPage}`
		);
	}
</script>

<div class="overflow-x-auto">
	<div class="flex items-center justify-between py-4 mb-4">
		<form method="get" class="w-full flex flex-row items-center">
			<label for={queryParam} class="mr-4 label-text">Search title</label>
			<input
				name={queryParam}
				id={queryParam}
				bind:value={searchQuery}
				on:input={resetTimer}
				placeholder="Search by title"
				aria-label="Search by title"
				class="input input-bordered w-full md:w-auto mr-1"
			/>
		</form>
		<span class="mr-4 w-fit whitespace-nowrap label-text">Results per page</span>
		<form
			class=" mr-1 w-auto flex flex-row"
			bind:this={optionForm}
			on:change={() => optionForm.requestSubmit()}
		>
			<select name="limit" id="limit" class="select select-bordered">
				<option selected={hitsPerPage == 10}>10</option>
				<option selected={hitsPerPage == 25}>25</option>
				<option selected={hitsPerPage == 50}>50</option>
				<option selected={hitsPerPage == 100}>100</option>
			</select>
            <!-- If user does not have JS, enable this form by adding a button (not needed for JS users!) -->
			<noscript>
				<button type="submit" class="btn btn-primary ml-4">Update</button>
			</noscript>
		</form>
	</div>

	<div class="flex items-center justify-between">
		<div>
			<a
				class="btn btn-secondary lg:btn-wide"
				href="/games?search={searchParam}&limit={hitsPerPage}"
				class:btn-disabled={pageNo == 1}>First</a
			>
			<a
				class="btn btn-primary lg:btn-wide"
				href="/games?page={pageNo - 1}&search={searchParam}&limit={hitsPerPage}"
				class:btn-disabled={pageNo == 1 || totalPages == 0}
				>Previous
			</a>
		</div>

		<div class="flex items-center">
			<span class="mr-2">Page</span>

			<form method="get">
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
				href="/games?page={pageNo + 1}&search={searchParam}&limit={hitsPerPage}"
				class:btn-disabled={pageNo == totalPages || totalPages == 0}>Next</a
			>
			<a
				class="btn btn-secondary lg:btn-wide"
				href="/games?page={totalPages}&search={searchParam}&limit={hitsPerPage}"
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
                    <slot name="headers"></slot>
				</tr>
			</thead>
			<tbody>
                <slot name="body"></slot>
			</tbody>
		</table>
	{/if}
</div>
