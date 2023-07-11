<script lang="ts">
	export let content: string | null;
	export let fallback: string = 'No data';
	export let wide: boolean = false;
</script>

<div class="p-4 col-span-{wide ? '4' : '1'} flex items-center">
	<span class="font-normal">
		{#if content}
			{content}
		{:else}
			<i>{fallback}</i>
		{/if}
	</span>
</div>
