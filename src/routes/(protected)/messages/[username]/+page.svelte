<script lang="ts">
	import PageHeaderToolbar from "$lib/components/ui/PageHeaderToolbar.svelte";
	import type { PageData } from "./$types";

	export let data: PageData;
</script>

<PageHeaderToolbar title="Conversation with {data.username}" />

<section class="w-50">
	{#each data.inbox as message}
		{#if message.isYou}
			<div class="chat chat-end">
				<div class="chat-header mb-2">You</div>
				<div class="chat-bubble">{message.content}</div>
				<div class="chat-footer opacity-50"><time class="text-xs">2 hours ago</time></div>
			</div>
		{:else}
			<div class="chat chat-start">
				<div class="chat-header mb-2">{message.username}</div>
				<div class="chat-bubble chat-bubble-primary">{message.content}</div>
				<div class="chat-footer opacity-50"><time class="text-xs">2 hours ago</time></div>
			</div>
		{/if}
	{/each}
</section>
