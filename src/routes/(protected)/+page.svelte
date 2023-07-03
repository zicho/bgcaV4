<script lang="ts">
	import PageHeaderToolbar from '$lib/components/ui/PageHeaderToolbar.svelte';
	import PageHeaderToolbarButton from '$lib/components/ui/PageHeaderToolbarButton.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<PageHeaderToolbar title="Home">
	<PageHeaderToolbarButton
		displayText="Go to your profile"
		url="/profile/{data.user.username}"
		icon="fa-user"
	/>
	<PageHeaderToolbarButton displayText="Find users" url="/users" icon="fa-person-circle-plus" />
	<PageHeaderToolbarButton displayText="Find events" url="/events/find" icon="fa-search" />
	<PageHeaderToolbarButton displayText="Import collection" url="/games/import" icon="fa-download" />
</PageHeaderToolbar>

<section class="prose md:w-1/2">
	<h2>Greetings, {data.user.username}!</h2>

	<p>
		Welcome to our gaming events hub! In the toolbar above you can quickly reach some of the core
		features of the site. You can add games to your collection, edit your profile, look for gaming
		events or connect with other users. Let the games begin!
	</p>

	<p>
		<strong>Please note</strong> that while i <i>try</i> to make this site mobile friendly, it is
		primarily a desktop experience. If you experience any usability issues on mobile, feel free to
		<a href="/contact">contact me!</a>
	</p>
</section>
