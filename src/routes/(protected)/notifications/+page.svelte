<script lang="ts">
	import { superForm } from "sveltekit-superforms/client";
	import type { PageData } from "./$types";

	export let data: PageData;

	$: friendRequests = data.friendRequests;

	const { enhance } = superForm(data.answerFriendRequestForm);
</script>

<div>
	<!-- <h2>Friend requests</h2> -->

	{#if friendRequests && friendRequests.length > 0}
		{#each friendRequests as request}
			<div class="card lg:card-side bg-base-100 shadow-xl">
				<div class="card-body">
					<div class="flex flex-row mb-4">
						<div class="avatar">
							<div class="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
								<img
									alt="User {request.senderUsername}'s avatar"
									src="https://avatars.dicebear.com/api/identicon/{request.senderUsername}.svg"
								/>
							</div>
						</div>
						<h2 class="card-title ml-4">Friend request from {request.senderUsername}</h2>
						<a href="/profile/{request?.senderUsername}" class="btn ml-auto">view profile</a>
					</div>
					<p>
						User <a class="underline" href="/profile/{request.senderUsername}"
							>{request.senderUsername}</a
						> wants to be your friend.
					</p>
					<div class="card-actions justify-end">
						<form use:enhance method="post" action="?/answerFriendRequest">
							<input type="hidden" name="senderUsername" value={request?.senderUsername} />
							<input type="hidden" name="recipientUsername" value={request?.recipientUsername} />
							<button name="accepted" value="true" class="btn btn-primary btn-wide" type="submit"
								>Accept</button
							>
							<button name="accepted" value="false" class="btn btn-secondary btn-wide" type="submit"
								>Deny</button
							>
						</form>
					</div>
				</div>
			</div>
		{/each}
	{:else}
		<span>No incoming friend requests</span>
	{/if}
</div>
