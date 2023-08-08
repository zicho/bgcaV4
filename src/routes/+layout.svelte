<script lang="ts">
	import '../app.css';
	import type { PageData } from './(protected)/$types';
	import { realtimeStore } from '$lib/stores/realTimeStore';
	import { initFlash } from 'sveltekit-flash-message/client';
	import { page } from '$app/stores';
	import { Toaster, toast } from 'svelte-sonner';
	import FlashMessage from '$lib/components/ui/FlashMessage.svelte';
	import { afterNavigate } from '$app/navigation';
	import Navbar from '$lib/components/ui/Navbar.svelte';

	export let data: PageData;

	$: ({ user } = data);
	$: data.user && realtimeStore.sub(data.user?.username);

	const flash = initFlash(page);

	afterNavigate((nav) => {
		if ($flash && nav.from?.url.toString() !== nav.to?.url.toString()) {
			$flash = undefined;
		}
	});

	$: {
		if ($flash?.message) {
			// todo: style the warning and info alerts if they are gonna be used
			switch ($flash?.type) {
				case 'success':
					toast.success($flash?.message as string);
					break;
				case 'info':
					toast($flash?.message as string);
					break;
				case 'warning':
					toast($flash?.message as string);
					break;
				case 'error':
					toast.error($flash?.message as string);
					break;
				default:
					toast($flash?.message as string);
			}
		}
	}
</script>

<Toaster richColors closeButton />
<Navbar {user} />

<noscript>
	{#if $flash}
		<FlashMessage message={$flash.message} type={$flash.type} />
	{/if}
</noscript>

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
