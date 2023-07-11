<script lang="ts">
	export let title: string = '';
	export let wide: boolean = false;
</script>

<div class="p-4 col-span-{wide ? '4' : '1'}">{title}</div>
