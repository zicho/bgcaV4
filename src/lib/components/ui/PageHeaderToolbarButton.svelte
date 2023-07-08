<script lang="ts">
	export let displayText: string;
	export let url: string;
	export let icon: string = 'fa-check';
</script>

<a href={url} class="btn btn-primary w-full md:btn-wide"><i class="fa {icon}" />{displayText}</a>
