<script lang="ts">
	import NavbarLink from "$lib/components/ui/NavbarLink.svelte";
	import type { User } from "lucia";

	export let user: User;
	let open: boolean;

	interface INavbarLink {
		url: string;
		displayText?: string;
		aria: string;
		icon: string;
		authOnly: boolean;
		indicator?: boolean;
	}

	// reactive to changes in user state
	$: navbarLinks = [
		{
			url: `/profile/${user?.username}`,
			displayText: user?.username,
			aria: "View and edit user profile",
			icon: "fa-user",
			authOnly: true
		},

		{
			url: `/messages`,
			displayText: "Messages",
			aria: "View and send messages",
			icon: "fa-message",
			authOnly: true
		},
		{
			url: "/games",
			displayText: "Games",
			aria: "Find and organize games",
			icon: "fa-dice",
			authOnly: true
		},
		{
			url: "/events",
			displayText: "Events",
			aria: "Find and organize events",
			icon: "fa-calendar-alt",
			authOnly: true
		},
		{
			url: `/notifications`,
			aria: "View various notifications",
			icon: "fa-bell",
			authOnly: true,
			indicator: true
		},
		{
			url: "/logout",
			displayText: "Sign Out",
			aria: "Sign out",
			icon: "fa-sign-out",
			authOnly: true
		},
		{
			url: "/login",
			displayText: "Login",
			aria: "Log in",
			icon: "fa-sign-in",
			authOnly: false
		},
		{
			url: "/register",
			displayText: "Register",
			aria: "Register a new user",
			icon: "fa-user-plus",
			authOnly: false
		}
	] satisfies INavbarLink[];

	$: menuDataAuthenticated = navbarLinks.filter((item) => item.authOnly);
	$: menuDataNotAuthenticated = navbarLinks.filter((item) => !item.authOnly);

	const closeMenu = (event: Event) => (open = false);
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
						indicator={link.indicator}
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
		<input id="mobile-menu-open" type="checkbox" class="drawer-toggle" bind:checked={open} />
		<div class="drawer-content">
			<!-- Page content here -->
			<label for="mobile-menu-open" class="mr-4 swap swap-rotate"><i class="fa fa-bars" /></label>
		</div>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div class="drawer-side">
			<label for="mobile-menu-open" class="drawer-overlay" />
			<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
			<ul class="menu p-4 w-80 h-full bg-base-200 text-base-content" on:click={closeMenu}>
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
</div>
