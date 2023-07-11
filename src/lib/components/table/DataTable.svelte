<script lang="ts">
	export let width: number;
</script>

<div class="grid grid-cols-{width} border border-base-200">
	<div
		class="col-span-{width} grid grid-cols-{width} font-semibold border-base-200"
	>
		<slot name="headers" />
	</div>
    <slot name="data" />
</div>
