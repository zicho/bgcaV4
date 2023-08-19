import { db } from "$lib/db/client";
import { conversationMessages } from "$lib/db/schema/conversations";

export async function insertConversationReply(
    conversationId: number,
    from_username: string,
    to_username: string,
    content: string) {

    await db.insert(conversationMessages).values({
        conversationId,
        sender_username: from_username,
        recipient_username: to_username,
        content
    });
}