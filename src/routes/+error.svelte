<script>
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>{$page?.status} - {$page?.error?.message}</title>
</svelte:head>

<div class="prose w-max">
    <h2>There has been an error!</h2>
	{#if $page?.error}
		<h3>Code: {$page?.status}</h3>
        <h3>Message: {$page?.error?.message}</h3>
	{/if}

	<h3 class="mt-8"><a href="/">Click here to return to main page</a></h3>
</div>
