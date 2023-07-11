<script lang="ts">
	export let href: string;
</script>

<a
	{href}
	class="col-span-8 grid grid-cols-8 border-base-200 border-b hover:bg-base-200 cursor-pointer"
>
	<slot />
</a>
