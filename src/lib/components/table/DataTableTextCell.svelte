<script lang="ts">
	export let content: string | null;
	export let width: number = 1;
	export let fallback: string = 'No data';
</script>

<div class="p-4 col-span-{width} flex items-center">
	<span class="font-normal">
		{#if content}
			{content}
		{:else}
			<i>{fallback}</i>
		{/if}
	</span>
</div>
