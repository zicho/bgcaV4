import { db } from "$lib/db/client";
import { friends } from "$lib/db/schema/relationships";
import { REQUEST_STATUS } from "$lib/data/enums/REQUEST_STATUS";
import { answerFriendRequestSchema, removeFriendshipRequestSchema, sendFriendRequestSchema } from "$lib/validationSchemas/friendRequestSchemas";
import { error, fail, type RequestEvent } from "@sveltejs/kit";
import { eq, or, and } from "drizzle-orm";
import type { Session } from "lucia";
import { superValidate } from "sveltekit-superforms/server";
import { getFriendship } from "$lib/db/queries/relationships/getFriendship";
import { upsertFriendship } from "$lib/db/queries/relationships/upsertFriendship";

export async function sendFriendRequest(event: RequestEvent) {
    const sendFriendRequestForm = await superValidate(event.request, sendFriendRequestSchema);

    if (!sendFriendRequestForm.valid) return fail(400, { sendFriendRequestForm });

    const { user } = (await event.locals.auth.validate()) as Session;
    const { senderUsername, recipientUsername } = sendFriendRequestForm.data;

    const existing = await getFriendship(senderUsername, recipientUsername);

    if (existing && existing.requestStatus !== REQUEST_STATUS.DECLINED) {
        throw error(403, "Friend request already sent.");
    }

    if (user.username !== senderUsername) {
        throw error(403, "Forbidden");
    }

    await upsertFriendship(senderUsername, recipientUsername, existing?.id);

    return {
        sendFriendRequestForm
    };
}

export async function answerFriendRequest(event: RequestEvent) {

    const answerFriendRequestForm = await superValidate(event.request, answerFriendRequestSchema);

    if (!answerFriendRequestForm.valid) return fail(400, { acceptFriendRequestForm: answerFriendRequestForm });

    const { user } = (await event.locals.auth.validate()) as Session;
    const { senderUsername, recipientUsername, accepted } = answerFriendRequestForm.data;
    const existing = await checkForExistingRequest(recipientUsername, senderUsername);

    if (user.username !== recipientUsername) {
        throw error(403, "Forbidden");
    } else if (!existing) {
        throw error(404, "No friend request found");
    }

    await changeFriendShipStatus(
        accepted
            ? REQUEST_STATUS.ACCEPTED
            : REQUEST_STATUS.DECLINED,
        senderUsername, recipientUsername);

    return {
        acceptFriendRequestForm: answerFriendRequestForm
    };
}

export async function removeFriend(event: RequestEvent) {

    const removeFriendshipRequestForm = await superValidate(event.request, removeFriendshipRequestSchema);

    if (!removeFriendshipRequestForm.valid) return fail(400, { acceptFriendRequestForm: removeFriendshipRequestForm });

    const friendshipDetails = (await db.select(
        {
            sender: friends.senderUsername,
            recipient: friends.recipientUsername,
        }
    ).from(friends).where(eq(friends.id, removeFriendshipRequestForm.data.friendshipId)))[0];

    const { user } = (await event.locals.auth.validate()) as Session;

    if (user.username === friendshipDetails.sender || user.username === friendshipDetails.recipient) {
        await db.delete(friends).where(eq(friends.id, removeFriendshipRequestForm.data.friendshipId));

        return {
            removeFriendshipRequestForm
        };
    } else {
        throw error(403);
    }
}


async function changeFriendShipStatus(newStatus: REQUEST_STATUS, senderUsername: string, recipientUsername: string) {
    type RequestStatusLiteral = keyof typeof REQUEST_STATUS;
    const requestStatus: RequestStatusLiteral = newStatus;

    await db.update(friends).set({
        requestStatus
    }).where(and(
        eq(friends.senderUsername, senderUsername),
        eq(friends.recipientUsername, recipientUsername)
    ));
}

async function checkForExistingRequest(recipientUsername: string, senderUsername: string) {
    return (await db.select().
        from(friends).where(
            or(
                and(
                    eq(friends.recipientUsername, recipientUsername),
                    eq(friends.senderUsername, senderUsername)
                ),
                and(
                    eq(friends.recipientUsername, senderUsername),
                    eq(friends.senderUsername, recipientUsername)
                )
            )
        ))[0];
}
