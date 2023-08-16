import { db } from "$lib/db/client";
import { conversation_messages } from "$lib/db/schema/messages";
import type { IPrivateMessage } from "$lib/interfaces/IPrivateMessage";
import { eq, or, and } from 'drizzle-orm';


export async function getConversationMessages(to_username: string, from_username: string) {

    const data = await db
        .select()
        .from(conversation_messages)
        .where(or(
            and(
                eq(conversation_messages.recipient_username, to_username),
                eq(conversation_messages.sender_username, from_username),
            ),
            and(
                eq(conversation_messages.recipient_username, from_username),
                eq(conversation_messages.sender_username, to_username),
            ),
        ));

    const messages: IPrivateMessage[] = [];

    data.forEach(message => {
        messages.push({
            username: message.sender_username as string,
            content: message.content as string,
            sentAt: message.sentAt as unknown as string,
            unread: message.readAt === null,
            isYou: message.sender_username === to_username
        });
    });

    return messages;
}