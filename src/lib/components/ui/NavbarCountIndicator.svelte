<style>
	a {
		color: inherit !important;
	}

	a:hover {
		color: inherit !important;
	}

	@keyframes bounce {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-2px);
		}
	}

	.bounce {
		animation: bounce 1s infinite;
	}
</style>

<script lang="ts">
	import { fade } from "svelte/transition";

	export let displayText: string = "";
	export let url: string;
	export let aria: string;
	export let icon: string = "fa-check";
	export let altIcon: string | undefined = undefined; // used if count is over 0
	export let count: number = 0;

	$: displayAltIcon = altIcon && count > 0;
</script>

<li class="flex justify-start">
	<a href={url} aria-label={aria} class="lg:hover:text-neutral-content flex items-center">
		{#if displayText}<span class="text-xl md:text-base">{displayText}</span>{/if}
		<!-- <div class="indicator" class:bounce={count > 0}> -->
		<div class="indicator">
			<i class={`fa ${displayAltIcon ? altIcon : icon} mr-2 md:w-auto text-xl md:text-base`} />
			{#if count > 0}
				<span class="badge badge-warning badge-sm indicator-item">{count}</span>
			{/if}
		</div>
	</a>
</li>
