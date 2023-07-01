<script lang="ts">
	import { page } from '$app/stores';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="prose">
	{#if data.isProfileYours}
		<h1>Your profile</h1>
	{:else}
		<h1>
			Profile of {data.profile.username}
		</h1>
	{/if}

	<h2>Description</h2>
	<p>
		{#if data.profile.description}
			{data.profile.description}
		{:else if data.isProfileYours}
			Edit your profile to add a description!
		{:else}
			<i>This user has not written a description yet :(</i>
		{/if}
	</p>
</div>
