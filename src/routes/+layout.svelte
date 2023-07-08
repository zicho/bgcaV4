<script lang="ts">
	import '../app.css';
	import type { PageData } from './(protected)/$types';
	import { realtimeStore } from '$lib/stores/realTimeStore';
	import 'notyf/notyf.min.css';
	import NavbarLink from '$lib/components/ui/NavbarLink.svelte';
	import { initFlash } from 'sveltekit-flash-message/client';
	import { page } from '$app/stores';
	import { Toaster } from 'svelte-sonner';
	import FlashMessage from '$lib/components/ui/FlashMessage.svelte';
	import { afterNavigate } from '$app/navigation';

	export let data: PageData;

	$: data.user && realtimeStore.sub(data.user.username);
	const flash = initFlash(page);

	afterNavigate((nav) => {
		if ($flash && nav.from?.url.toString() !== nav.to?.url.toString()) {
			$flash = undefined;
		}
	});
</script>

<Toaster richColors />

<div class="navbar bg-neutral text-neutral-content sticky top-0 z-50">
	<div class="flex-1">
		<a href="/" class="btn btn-ghost normal-case text-xl">BGCA</a>
	</div>

	<div class="flex-none">
		<ul class="menu menu-horizontal px-1 bg-neutral text-neutral-content">
			{#if data.user}
				<NavbarLink
					url="/profile/{data.user.username}"
					displayText={data.user.username}
					icon="fa-user"
				/>
				<NavbarLink url="/games" displayText="Games" icon="fa-dice" />
				<NavbarLink url="/events" displayText="Events" icon="fa-calendar-alt" />
				<NavbarLink url="/logout" displayText="Sign Out" icon="fa-sign-out" />
			{:else}
				<NavbarLink url="/login" displayText="Login" icon="fa-sign-in" />
				<NavbarLink url="/register" displayText="Register" icon="fa-user-plus" />
			{/if}
		</ul>
	</div>
</div>

{#if $flash}
	<FlashMessage message={$flash.message} type={$flash.type} />
{/if}

<div class="py-6 lg:py-10 px-6 lg:px-16">
	<slot />
</div>

<footer class="footer items-center p-4 bg-neutral text-neutral-content sticky bottom-0">
	<div class="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
		<a href="/rules">Rules</a> |
		<a href="/contact">Contact</a> |
		<a href="/about">About</a>
	</div>
</footer>
