<script lang="ts">
	import PageHeaderToolbar from "$lib/components/ui/PageHeaderToolbar.svelte";
	import PageHeaderToolbarButton from "$lib/components/ui/PageHeaderToolbarButton.svelte";
	import type { IPrivateMessage } from "$lib/interfaces/IPrivateMessage";
	import type { PageData } from "./$types";

	export let data: PageData;

	let inbox = data.inbox as IPrivateMessage[];
</script>

<PageHeaderToolbar title="Messages" subheader="Stay in touch with people">
	<PageHeaderToolbarButton displayText="New conversation" url="/events/create" icon="fa-comments" />
</PageHeaderToolbar>

<section>
	<div class="divider">Latest conversations</div>
	<div class="space-y-8">
		{#each inbox as message}
			<div class="card card-side bg-base-100 shadow-md">
				<!-- <figure><img src="/images/stock/photo-1635805737707-575885ab0820.jpg" alt="Movie" /></figure> -->
				<div class="card-body">
					<div class="flex justify-between">
						<h2 class="card-title">Conversation with {message.username}</h2>
						{#if message.unread && !message.isYou}<span class="badge bg-warning">Unread</span>{/if}
					</div>
					<p>
						{#if message.isYou}<b>You wrote</b>{:else}{message.username}{/if}: {message.content}
					</p>
					<div class="card-actions justify-end">
						<a href="/messages/{message.username}" class="btn btn-primary">
							{#if message.isYou}
								View <i class="fa fa-arrow-right" />
							{:else}
								Reply <i class="fa fa-reply" />
							{/if}
						</a>
					</div>
				</div>
			</div>
		{/each}
	</div>
</section>
