<script lang="ts">
	export let displayText: string;
	export let url: string;
	export let aria: string;
	export let icon: string = "fa-check";
</script>

<li class="flex justify-start">
	<a href={url} aria-label={aria} class="lg:hover:text-neutral-content flex items-center">
		<i class={`fa ${icon} w-8 md:w-auto text-xl md:text-base`} />
		<span class="text-xl md:text-base">{displayText}</span>
	</a>
</li>
