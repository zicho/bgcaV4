<script lang="ts">
	import PageHeaderToolbar from "$lib/components/ui/PageHeaderToolbar.svelte";
	import PageHeaderToolbarButton from "$lib/components/ui/PageHeaderToolbarButton.svelte";
	import type { PageData } from "./$types";
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

<section class="grid md:grid-cols-2 md:gap-16">
	<article class="prose">
		<h2>Greetings, {data.user.username}!</h2>

		<p>
			Welcome to our gaming events hub! In the toolbar above you can quickly reach some of the core
			features of the site. You can add games to your collection, edit your profile, look for gaming
			events, or connect with other users. Let the games begin!
		</p>

		<p>
			<strong>Please note</strong> that while I <i>try</i> to make this site mobile-friendly, it is
			primarily a desktop experience. If you experience any usability issues on mobile, feel free to
			<a href="/contact">contact me!</a>
		</p>
	</article>
	<article class="md:col-span-1 mt-8 md:mt-0">
		<div class="card p-4 bg-base-100 shadow-md h-full">
			<h2 class="mb-4 text-xl font-medium">Most recently registered users. Say hello!</h2>
			<ul class="space-y-2 list-disc ml-4 prose">
				{#each data.users as user}
					<li class="px-0 text-md font-medium hover:underline">
						<a href="/profile/{user.username}"
							>{user.username}
							{#if user.username === data.user.username}(you){/if}</a
						>
					</li>
				{/each}
			</ul>
		</div>
	</article>
</section>
