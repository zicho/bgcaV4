<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	let timer: NodeJS.Timeout | null = null;
	let searchQuery: string = '';

	export let queryParam: string = 'search';
	export let isLoading: boolean = false;

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
		goto(searchQuery ? `${$page.url.pathname}?${queryParam}=${searchQuery}` : $page.url.pathname);
	}
</script>

<form method="get" class="w-full flex flex-row items-center">
	<label for="query" class="mr-4 label-text">Search title</label>
	<input
		name="query"
		id="query"
		bind:value={searchQuery}
		on:input={resetTimer}
		placeholder="Search by title"
		aria-label="Search by title"
		class="input input-bordered w-full md:w-auto mr-1"
	/>
</form>
