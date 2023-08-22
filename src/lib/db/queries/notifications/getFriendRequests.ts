import type { RequestEvent } from "@sveltejs/kit";
import { validateUser } from "../util/validateUser";
import { db } from "$lib/db/client";
import { and, eq } from "drizzle-orm";
import { friends } from "$lib/db/schema/relationships";
import { REQUEST_STATUS } from "$lib/data/enums/REQUEST_STATUS";

export async function getFriendRequests(event: RequestEvent) {
    const user = await validateUser(event);

    if (!user) return;

    const friendRequests = await db
        .select()
        .from(friends)
        .where(
            and(
                eq(friends.recipientUsername, user.username),
                eq(friends.requestStatus, REQUEST_STATUS.PENDING),
            ),
        );

    return friendRequests;
}