<script lang="ts">
	export let width: number = 1;
</script>

<div class="col-span-{width} grid grid-cols-{width} font-semibold">
	<slot />
</div>
