<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<svelte:head>
	<title>
		{data.profile.username}'s profile
	</title>
</svelte:head>

<div class="prose">
	{#if data.isProfileYours}
		<div class="grid md:grid-cols-2 md:mb-0 mb-8">
			<div>
				<h1>Your profile</h1>
			</div>
			<div>
				<a
					href="/profile/{data.profile.username}/edit"
					class="md:float-right btn btn-primary w-full md:btn-wide">Edit profile</a
				>
			</div>
		</div>
	{:else}
		<h1>
			Profile of {data.profile.username}
		</h1>
	{/if}

	<h2 class="mt-0">Description</h2>
	<p>
		{#if data.profile.description}
			{data.profile.description}
		{:else if data.isProfileYours}
			<a href="/profile/{data.profile.username}/edit">Edit your profile to add a description!</a>
		{:else}
			<i>This user has not written a description yet :(</i>
		{/if}
	</p>
</div>
