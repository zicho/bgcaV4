<script lang="ts">
	import "../app.css";
	import type { PageData } from "./(protected)/$types";
	import { realtimeStore } from "$lib/stores/realTimeStore";
	import { getFlash } from "sveltekit-flash-message/client";
	import { page } from "$app/stores";
	import { Toaster } from "svelte-sonner";
	import FlashMessage from "$lib/components/ui/FlashMessage.svelte";
	import { beforeNavigate } from "$app/navigation";
	import Navbar from "$lib/components/ui/Navbar.svelte";

	export let data: PageData;

	$: ({ user, notificationCount } = data);
	$: data.user && realtimeStore.sub(data.user?.username);

	const flash = getFlash(page);

	beforeNavigate((nav) => {
		if ($flash && nav.from?.url.toString() !== nav.to?.url.toString()) {
			$flash = undefined;
		}
	});
</script>

<Toaster richColors closeButton />
<Navbar {user} {notificationCount} />

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
