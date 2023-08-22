<style>
	a {
		color: inherit !important;
	}

	a:hover {
		color: inherit !important;
	}
</style>

<script lang="ts">
	export let displayText: string = "";
	export let url: string;
	export let aria: string;
	export let icon: string = "fa-check";
	export let count: number = 0;
</script>

<li class="flex justify-start">
	<a href={url} aria-label={aria} class="lg:hover:text-neutral-content flex items-center">
		{#if displayText}<span class="text-xl md:text-base">{displayText}</span>{/if}
		<div class="indicator">
			<i class={`fa ${icon} mr-2 md:w-auto text-xl md:text-base`} />
			{#if count > 0}
				<span class="badge badge-warning badge-sm indicator-item">{count}</span>
			{/if}
		</div>
	</a>
</li>
