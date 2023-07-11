<script lang="ts">
	export let src: string | null;
	export let alt: string | null;
	export let width: number = 1;
</script>

<div class="p-4 col-span-{width} flex justify-center items-center">
	<img {alt} {src} class="h-32 w-32" />
</div>
