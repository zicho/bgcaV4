<script lang="ts">
	export let width: number;
	export let href: string;
</script>

<a
	{href}
	class="col-span-{width} grid grid-cols-{width} border-base-200 border-b hover:bg-base-200 cursor-pointer"
>
	<slot />
</a>
