import { db } from "$lib/db/client";
import { friends } from "$lib/db/schema/relationships";
import { or, and, eq } from "drizzle-orm";

export async function getFriendship(senderUsername: string, recipientUsername: string) {
    return (await db.select().
        from(friends).where(
            or(
                and(
                    eq(friends.recipientUsername, recipientUsername),
                    eq(friends.senderUsername, senderUsername),
                ),
                and(
                    eq(friends.recipientUsername, senderUsername),
                    eq(friends.senderUsername, recipientUsername),
                )
            )
        ).limit(1))[0];
}