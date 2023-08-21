<style>
	a {
		color: inherit !important;
	}

	a:hover {
		color: inherit !important;
	}
</style>

<script lang="ts">
	export let displayText: string | undefined;
	export let url: string;
	export let aria: string;
	export let icon: string = "fa-check";
	export let indicator: boolean = false;
</script>

<li class="flex justify-start">
	<a href={url} aria-label={aria} class="lg:hover:text-neutral-content flex items-center">
		{#if !indicator}<i class={`fa ${icon} w-8 md:w-auto text-xl md:text-base`} />
		{/if}
		{#if displayText}<span class="text-xl md:text-base">{displayText}</span>{/if}
		{#if indicator}
			<div class="indicator">
				<i class={`fa ${icon} mr-2 md:w-auto text-xl md:text-base`} />
				<span class="badge badge-warning badge-sm indicator-item">8</span>
			</div>
		{/if}
	</a>
</li>
