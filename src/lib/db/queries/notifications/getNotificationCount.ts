import type { RequestEvent } from "@sveltejs/kit";
import { validateUser } from "../util/validateUser";
import { db } from "$lib/db/client";
import { and, eq, sql } from "drizzle-orm";
import { friends } from "$lib/db/schema/relationships";
import { REQUEST_STATUS } from "$lib/data/enums/REQUEST_STATUS";

export async function getNotificationCount(event: RequestEvent) {
    const user = await validateUser(event);

    if (!user) return;

    const result = await db
        .select({ count: sql<number>`count(*)` })
        .from(friends)
        .where(
            and(
                eq(friends.recipientUsername, user.username),
                eq(friends.requestStatus, REQUEST_STATUS.PENDING),
            ),
        );

    return result[0].count;
}