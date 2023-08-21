<script lang="ts">
	import PageHeaderActionButton from "$lib/components/ui/PageHeaderActionButton.svelte";
	import PageHeaderToolbar from "$lib/components/ui/PageHeaderToolbar.svelte";
	import PageHeaderToolbarButton from "$lib/components/ui/PageHeaderToolbarButton.svelte";
	import { superForm } from "sveltekit-superforms/client";
	import type { PageData } from "./$types";
	import { FRIENDSHIP_STATUS } from "$lib/data/enums/FRIENDSHIP_STATUS";

	export let data: PageData;

	const { enhance: sendFriendRequestEnhance } = superForm(data.sendFriendRequestForm);
	const { enhance: answerFriendRequestEnhance } = superForm(data.answerFriendRequestForm);
</script>

<svelte:head>
	<title>
		{data.profile.username}'s profile
	</title>
</svelte:head>

<PageHeaderToolbar
	title={data.isProfileYours ? "Your profile" : `${data.profile.username}`}
	subheader={data.isProfileYours
		? "Edit your profile"
		: `This is the profile of ${data.profile.username}`}
>
	{#if data.isProfileYours}
		<PageHeaderToolbarButton
			displayText="Edit profile"
			url="/profile/{data.profile.username}/edit"
			icon="fa-edit"
		/>
	{:else}
		<PageHeaderToolbarButton
			displayText="Send message"
			url="/message/{data.profile.username}"
			icon="fa-message"
		/>
	{/if}

	{#if !data.isProfileYours}
		<div class="divider divider-horizontal pb-4 hidden md:flex" />
		{#if data.friendRequestStatus === FRIENDSHIP_STATUS.NONE}
			<form use:sendFriendRequestEnhance method="post" action="?/sendFriendRequest">
				<input type="hidden" name="senderUsername" value={data.user.username} />
				<input type="hidden" name="recipientUsername" value={data.profile.username} />
				<PageHeaderActionButton displayText="Send friend request" icon="fa-user-plus" />
			</form>
		{:else if data.friendRequestStatus === FRIENDSHIP_STATUS.REQUEST_SENT}
			<PageHeaderActionButton disabled displayText="Friend request sent" icon="fa-hourglass" />
		{:else if data.friendRequestStatus === FRIENDSHIP_STATUS.REQUEST_RECEIVED}
			<form use:answerFriendRequestEnhance method="post" action="?/answerFriendRequest">
				<input type="hidden" name="senderUsername" value={data.friendRequest?.senderUsername} />
				<input
					type="hidden"
					name="recipientUsername"
					value={data.friendRequest?.recipientUsername}
				/>

				<PageHeaderActionButton
					name="accepted"
					value="true"
					displayText="Accept friend request"
					icon="fa-user-check"
				/>
				<PageHeaderActionButton
					name="accepted"
					value="false"
					displayText="Decline friend request"
					className="secondary"
					icon="fa-user-xmark"
				/>
			</form>
		{:else}
			<form use:answerFriendRequestEnhance method="post" action="?/removeFriend">
				<input type="hidden" name="friendshipId" value={data.friendRequest?.id} />
				<PageHeaderActionButton
					displayText="Remove friend"
					className="secondary"
					icon="fa-user-minus"
				/>
			</form>
		{/if}
	{/if}
</PageHeaderToolbar>

<div class="prose">
	<h2 class="mt-0">Description</h2>
	<p>
		{#if data.profile.description}
			{data.profile.description}
		{:else if data.isProfileYours}
			<p>
				<i
					>You have not written a description yet! <a href="/profile/{data.profile.username}/edit"
						>Do it!</a
					></i
				>
			</p>
		{:else}
			<i>This user has not written a description yet :(</i>
		{/if}
	</p>
</div>
