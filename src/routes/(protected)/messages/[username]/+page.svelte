<script lang="ts">
	import { enhance } from "$app/forms";
	import { page } from "$app/stores";
	import PageHeaderToolbar from "$lib/components/ui/PageHeaderToolbar.svelte";
	import { formatTimestamp } from "$lib/functions/parseDate";
	import type { PageData } from "./$types";
	import { superForm } from "sveltekit-superforms/client";

	export let data: PageData;
	const { form, errors, constraints } = superForm(data.form);
</script>

<PageHeaderToolbar title="Conversation with {data.username}" />

<div class="flex space-x-0 md:space-x-16 grow-1">
	<div class="hidden md:flex-col md:flex w-1/4 bg-white rounded p-4">
		<h2
			class="mb-4 text-xl font-medium
		"
		>
			Conversations
		</h2>

		{#each data.otherConversations as c}
			<a
				href="/messages/{c}"
				class="flex hover:bg-accent-content py-4 px-2 rounded"
				class:bg-accent-content={$page.params.username === c}
			>
				<div class="avatar">
					<div class="w-12 mask">
						<img alt="User {c}'s avatar" src="https://avatars.dicebear.com/api/identicon/{c}.svg" />
					</div>
				</div>
				<span class=" my-auto ml-6">{c}</span>
			</a>
			<hr />
		{/each}
	</div>
	<div class="flex-col w-full md:w-3/4">
		<section class="mb-4">
			<form use:enhance method="post" class="flex flex-row">
				<input
					name="content"
					id="content"
					placeholder="New message"
					aria-label="New message"
					bind:value={$form.content}
					{...$constraints.content}
					aria-invalid={$errors.content ? "true" : undefined}
					required
					class="textarea textarea-bordered w-full"
				/>
				<input
					type="hidden"
					id="conversationId"
					name="conversationId"
					value={data.conversation.id}
				/>
				<button type="submit" class="btn btn-primary md:btn-wide ml-8">Send</button>
			</form>
		</section>

		<div class="divider hidden md:flex" />

		<section class="overflow-y-scroll h-[calc(100vh-376px)]">
			<div>
				{#each data.conversation.messages as message, i}
					<div class="chat {message.isYou ? 'chat-end' : 'chat-start'} ">
						<div class="chat-header">
							{#if i === 0 || data.conversation.messages[i - 1].username !== message.username}
								{message.isYou ? "You" : message.username}
							{/if}
							<time class="text-xs opacity-50">{formatTimestamp(message.sentAt)}</time>
						</div>
						<div class="chat-bubble" class:chat-bubble-primary={!message.isYou}>
							{message.content}
						</div>
					</div>
				{/each}
			</div>
		</section>
	</div>
</div>
