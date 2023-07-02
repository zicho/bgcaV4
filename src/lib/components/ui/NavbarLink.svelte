<script lang="ts">
	export let displayText: string;
	export let url: string;
	export let icon: string = 'fa-check';
</script>

<li>
	<a href={url} class="hover:text-neutral-content"><i class="fa {icon}" />{displayText}</a>
</li>
