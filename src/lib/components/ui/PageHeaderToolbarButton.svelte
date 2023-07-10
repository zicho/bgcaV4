<script lang="ts">
	export let displayText: string;
	export let url: string;
	export let icon: string = 'fa-check';

	export let className: 'primary' | 'secondary' = 'primary';
</script>

<a href={url} class="btn btn-{className} w-full md:btn-wide"><i class="fa {icon}" />{displayText}</a
>
