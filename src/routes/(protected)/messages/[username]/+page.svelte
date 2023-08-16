<script lang="ts">
	import PageHeaderToolbar from "$lib/components/ui/PageHeaderToolbar.svelte";
	import { formatTimestamp } from "$lib/functions/parseDate";
	import type { PageData } from "./$types";

	export let data: PageData;
</script>

<PageHeaderToolbar title="Conversation with {data.username}" />

<div class="flex space-x-16">
	<div class="flex-col w-1/4 bg-white rounded p-4">
		<h2
			class="mb-4 text-xl font-medium
		"
		>
			Conversations
		</h2>

		{#each data.conversations as c}
			<a href="/messages/{c}" class="flex hover:bg-accent-content p-2 rounded">
				<div class="avatar">
					<div class="w-12 mask mask-squircle">
						<img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
					</div>
				</div>
				<span class=" my-auto ml-4">{c}</span>
			</a>
		{/each}
	</div>
	<div class="flex-col w-3/4">
		<section>
			{#each data.inbox as message, i}
				<div class="chat {message.isYou ? 'chat-end' : 'chat-start'} ">
					<div class="chat-header">
						{#if i === 0 || data.inbox[i - 1].username !== message.username}
							{message.isYou ? "You" : message.username}
						{/if}
						<time class="text-xs opacity-50">{formatTimestamp(message.sentAt)}</time>
					</div>
					<div class="chat-bubble" class:chat-bubble-primary={!message.isYou}>
						{message.content}
					</div>
				</div>
			{/each}
		</section>

		<section class="mt-4">
			<div>
				<div class="divider" />
			</div>

			<input
				name="reply"
				id="reply"
				placeholder="Reply"
				aria-label="Reply"
				class="textarea textarea-bordered w-full"
			/>
		</section>
	</div>
</div>
