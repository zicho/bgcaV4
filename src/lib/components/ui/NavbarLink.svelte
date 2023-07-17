<script lang="ts">
	export let displayText: string;
	export let url: string;
	export let aria: string;
	export let icon: string = 'fa-check';
</script>

<li>
	<a href={url} aria-label={aria} class="hover:text-neutral-content"><i class="fa {icon}" /><span class="hidden sm:block">{displayText}</span></a>
</li>
