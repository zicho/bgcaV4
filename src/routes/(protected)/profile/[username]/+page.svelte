<script lang="ts">
	import PageHeaderToolbar from '$lib/components/ui/PageHeaderToolbar.svelte';
	import PageHeaderToolbarButton from '$lib/components/ui/PageHeaderToolbarButton.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>
		{data.profile.username}'s profile
	</title>
</svelte:head>

<PageHeaderToolbar
	title={data.isProfileYours ? 'Your profile' : `${data.profile.username}`}
	subheader={data.isProfileYours
		? 'Edit your profile'
		: `This is the profile of ${data.profile.username}`}
>
	{#if data.isProfileYours}
		<PageHeaderToolbarButton
			displayText="Edit profile"
			url="/profile/{data.profile.username}/edit"
			icon="fa-edit"
		/>
	{/if}
</PageHeaderToolbar>

<div class="prose">
	<h2 class="mt-0">Description</h2>
	<p>
		{#if data.profile.description}
			{data.profile.description}
		{:else if data.isProfileYours}
			<p>
				<i
					>You have not written a description yet! <a href="/profile/{data.profile.username}/edit"
						>Do it!</a
					></i
				>
			</p>
		{:else}
			<i>This user has not written a description yet :(</i>
		{/if}
	</p>
</div>
