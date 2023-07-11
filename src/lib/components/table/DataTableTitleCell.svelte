<script lang="ts">
	export let title: string | null;
	export let width: number = 1;
</script>

<div class="p-4 col-span-{width} flex items-center">
	<div class="flex flex-col">
		<div class="font-bold overflow-hidden">{title}</div>
		<slot name="subheaders" />
	</div>
</div>
