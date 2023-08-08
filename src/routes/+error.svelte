<script lang="ts">
	import { page } from "$app/stores";

	let errorMessage: string;

	switch ($page?.status) {
		case 400:
			errorMessage = "Bad request!";
			break;
		case 403:
			errorMessage = "Forbidden!";
			break;
		case 404:
			errorMessage = "Not found!";
			break;
		case 500:
			errorMessage = "Internal server error!";
			break;
		default:
			errorMessage = "Unknown error";
			break;
	}
</script>

<svelte:head>
	<title>{$page?.status} - {$page?.error?.message}</title>
</svelte:head>

<div class="prose w-max">
	<h2>{errorMessage}</h2>
	{#if $page?.error}
		<h3>Code: {$page?.status}</h3>
		<h3>Message: {$page?.error?.message}</h3>
	{/if}

	<h3 class="mt-8"><a href="/">Click here to return to main page</a></h3>
</div>
