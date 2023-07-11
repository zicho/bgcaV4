<script lang="ts">
	export let text: string | undefined;
	export let width: number = 1;
	export let href: string;
</script>

<div class="p-4 col-span-{width} flex items-center justify-center">
	<a {href} target="_blank" class="btn btn-secondary"><i class="fa fa-external-link" />{text}</a>
</div>
