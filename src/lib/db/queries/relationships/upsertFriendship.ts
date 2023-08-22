import { REQUEST_STATUS } from "$lib/data/enums/REQUEST_STATUS";
import { db } from "$lib/db/client";
import { friends } from "$lib/db/schema/relationships";

export async function upsertFriendship(senderUsername: string, recipientUsername: string, existingFriendShipId: number | undefined) {
    await db.insert(friends).values({
        id: existingFriendShipId,
        senderUsername,
        recipientUsername
    }).onConflictDoUpdate({
        target: friends.id,
        set: {
            senderUsername,
            recipientUsername,
            requestStatus: REQUEST_STATUS.PENDING
        }
    });
}