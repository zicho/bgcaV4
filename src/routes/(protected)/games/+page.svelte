<script lang="ts">
    import type { PageData } from './$types';
    
    export let data: PageData;
</script>

<svelte:head>
    <title>Games</title>
</svelte:head>

<div class="prose">
		<div class="grid md:grid-cols-2 md:mb-0 mb-8">
			<div>
				<h1>Your games</h1>
			</div>
			<div>
				<a
					href="/games/import"
					class="md:float-right btn btn-primary w-full md:btn-wide">Import collection</a
				>
			</div>
		</div>
</div>