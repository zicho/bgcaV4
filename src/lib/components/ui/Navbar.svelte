<script lang="ts">
	import type { IUser } from '$lib/data/interfaces/IUser';
	import NavbarLink from '$lib/components/ui/NavbarLink.svelte';

	export let user: IUser;
	let open: boolean;

	interface INavbarLink {
		url: string;
		displayText: string;
		aria: string;
		icon: string;
		authOnly: boolean;
	}

	let navbarLinks: INavbarLink[];

	// reactive to changes in user state
	$: navbarLinks = [
		{
			url: `/profile/${user?.username}`,
			displayText: user?.username,
			aria: 'View and edit user profile',
			icon: 'fa-user',
			authOnly: true
		},
		{
			url: '/games',
			displayText: 'Games',
			aria: 'Find and organize games',
			icon: 'fa-dice',
			authOnly: true
		},
		{
			url: '/events',
			displayText: 'Events',
			aria: 'Find and organize events',
			icon: 'fa-calendar-alt',
			authOnly: true
		},
		{
			url: '/logout',
			displayText: 'Sign Out',
			aria: 'Sign out',
			icon: 'fa-sign-out',
			authOnly: true
		},
		{
			url: '/login',
			displayText: 'Login',
			aria: 'Log in',
			icon: 'fa-sign-in',
			authOnly: false
		},
		{
			url: '/register',
			displayText: 'Register',
			aria: 'Register a new user',
			icon: 'fa-user-plus',
			authOnly: false
		}
	];

	$: menuDataAuthenticated = navbarLinks.filter((item) => item.authOnly);
	$: menuDataNotAuthenticated = navbarLinks.filter((item) => !item.authOnly);

	const closeMenu = (event) => (open = false);
</script>

<div class="navbar bg-neutral text-neutral-content sticky top-0 z-50">
	<div class="flex-1">
		<a href="/" class="btn btn-ghost normal-case text-xl">BGCA</a>
	</div>

	<!-- Menu for MD and above -->
	<div class="flex-none hidden md:flex">
		<ul class="menu menu-horizontal px-1 bg-neutral text-neutral-content">
			{#if user}
				{#each menuDataAuthenticated as link}
					<NavbarLink
						url={link.url}
						displayText={link.displayText}
						aria={link.aria}
						icon={link.icon}
					/>
				{/each}
			{:else}
				{#each menuDataNotAuthenticated as link}
					<NavbarLink
						url={link.url}
						displayText={link.displayText}
						aria={link.aria}
						icon={link.icon}
					/>
				{/each}
			{/if}
		</ul>
	</div>

	<div class="drawer flex md:hidden justify-end drawer-end">
		<input id="my-drawer" type="checkbox" class="drawer-toggle" bind:checked={open} />
		<div class="drawer-content">
			<!-- Page content here -->
			<label for="my-drawer" class="mr-4 swap swap-rotate"><i class="fa fa-bars" /></label>
		</div>
		<div class="drawer-side">
			<label for="my-drawer" class="drawer-overlay" />
			<ul
				for="my-drawer"
				class="menu p-4 w-80 h-full bg-base-200 text-base-content"
				on:click={closeMenu}
			>
				{#if user}
					{#each menuDataAuthenticated as link}
						<NavbarLink
							url={link.url}
							displayText={link.displayText}
							aria={link.aria}
							icon={link.icon}
						/>
					{/each}
				{:else}
					{#each menuDataNotAuthenticated as link}
						<NavbarLink
							url={link.url}
							displayText={link.displayText}
							aria={link.aria}
							icon={link.icon}
						/>
					{/each}
				{/if}
			</ul>
		</div>
	</div>

	<!-- <div class="flex-none md:hidden flex">
		<ul class="menu menu-horizontal px-1 bg-neutral text-neutral-content">
			<NavbarLink displayText="Open menu" aria="Open menu" icon="fa-bars" />
			<label for="my-drawer" class="btn btn-primary drawer-button">Open drawer</label>
		</ul>
		<div class="drawer-side">
			<label for="my-drawer" class="drawer-overlay" />
			<ul class="menu p-4 w-80 h-full bg-base-200 text-base-content">
				<li><a>Sidebar Item 1</a></li>
				<li><a>Sidebar Item 2</a></li>
			</ul>
		</div>
	</div> -->
</div>

<style>
	#hide-drawer-checkbox:checked ~ .drawer-side {
		display: none;
	}
</style>
