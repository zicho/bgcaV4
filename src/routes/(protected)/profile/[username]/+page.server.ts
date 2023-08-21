import type { PageServerLoad } from "./$types";
import { users, userProfiles } from "$lib/db/schema/users";
import { eq, and, or } from "drizzle-orm";
import { error, type Actions } from "@sveltejs/kit";
import { db } from "$lib/db/client";
import { REQUEST_STATUS } from "$lib/data/enums/REQUEST_STATUS";
import { answerFriendRequest, removeFriend, sendFriendRequest } from "$lib/form_actions/friendRequests";
import { answerFriendRequestSchema, sendFriendRequestSchema } from "$lib/validationSchemas/friendRequestSchemas";
import { superValidate } from "sveltekit-superforms/server";
import { friends } from "$lib/db/schema/relationships";
import { FRIENDSHIP_STATUS } from "$lib/data/enums/FRIENDSHIP_STATUS";

export const load = (async ({ parent, params }) => {

	const username = (await parent()).user.username;

	const isProfileYours = username === params.username;
	const sendFriendRequestForm = await superValidate(sendFriendRequestSchema);
	const answerFriendRequestForm = await superValidate(answerFriendRequestSchema);

	const friendRequest = (await db.select().
		from(friends).where(
			or(
				and(
					eq(friends.recipientUsername, params.username),
					eq(friends.senderUsername, username),
				),
				and(
					eq(friends.recipientUsername, username),
					eq(friends.senderUsername, params.username),
				)
			)
		))[0];

	const friendRequestStatus: FRIENDSHIP_STATUS = (() => {

		if (!friendRequest) {
			return FRIENDSHIP_STATUS.NONE;
		}

		if (friendRequest.requestStatus === REQUEST_STATUS.DECLINED && friendRequest.senderUsername === username) {
			return FRIENDSHIP_STATUS.REQUEST_SENT;
		}

		if (friendRequest.requestStatus === REQUEST_STATUS.ACCEPTED) {
			return FRIENDSHIP_STATUS.ACCEPTED;
		} else if (friendRequest.requestStatus === REQUEST_STATUS.PENDING) {
			if (friendRequest.recipientUsername === username) {
				return FRIENDSHIP_STATUS.REQUEST_RECEIVED;
			}

			return FRIENDSHIP_STATUS.REQUEST_SENT;
		}

		// fail safe, shouldn't happen...
		return FRIENDSHIP_STATUS.NONE;
	})();

	const userAndProfile = await db
		.select({
			username: users.username,
			description: userProfiles.description
		})
		.from(users)
		.where(eq(users.username, params.username))
		.leftJoin(userProfiles, eq(userProfiles.userId, users.id));

	const profile = userAndProfile[0];

	if (!profile) {
		throw error(404, {
			message: `User ${params.username} was not found`
		});
	}

	return {
		isProfileYours,
		friendRequestStatus,
		friendRequest,
		profile,
		sendFriendRequestForm,
		answerFriendRequestForm
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	sendFriendRequest,
	answerFriendRequest,
	removeFriend,
};
