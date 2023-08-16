import { db } from "$lib/db/client";
import { conversation_messages } from "$lib/db/schema/conversations";

export async function insertConversationReply(
    conversationId: number,
    from_username: string,
    to_username: string,
    content: string) {

    await db.insert(conversation_messages).values({
        conversationId,
        sender_username: from_username,
        recipient_username: to_username,
        content
    });
}