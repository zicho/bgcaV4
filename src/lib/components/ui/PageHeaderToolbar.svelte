<script lang="ts">
	export let title: string | undefined;
	export let subheader: string | undefined = '';
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<div class="prose prose-sm">
	<div class="flex flex-col md:flex-row mb-8">
		<div>
			<h1 class="m-0 p-0">{title}</h1>
			{#if subheader}
				<h2 class="p-0 m-0 md:mb-0 mb-4 font-extralight">{subheader}</h2>
			{/if}
		</div>
		<div class="ml-auto w-full md:w-auto space-y-2 md:space-y-0 md:space-x-4">
			<slot />
		</div>
	</div>
</div>
