import { db } from "$lib/db/client";
import type { IConversationMessage } from "$lib/interfaces/IConversationMessage";

export async function getLatestConversationsForUsername(username: string) {
    const conversations = await db.query.conversations.findMany({
        with: {
            messages: {
                where: (messages, { or, eq }) =>
                    or(
                        eq(messages.sender_username, username),
                        eq(messages.recipient_username, username),
                    ),
                limit: 1,
                orderBy: (conversation_messages, { desc }) => [desc(conversation_messages.sentAt)],
            },
        },
        where: ((conversations, { eq, or }) =>
            or(
                eq(conversations.started_by_username, username),
                eq(conversations.talking_to_username, username),
            )),
        orderBy: (conversations, { desc }) => [desc(conversations.latest_activity)],
    });

    const messages: IConversationMessage[] = [];

    conversations.forEach(conversation => {

        if (conversation?.messages?.length === 0) {
            return;
        }

        const latestMsg = conversation.messages[0];

        messages.push({
            username: latestMsg.sender_username === username ? latestMsg.recipient_username : latestMsg.sender_username,
            content: latestMsg.content,
            sentAt: latestMsg.sentAt as unknown as string,
            unread: latestMsg.readAt === null,
            isYou: latestMsg.sender_username === username
        });
    });

    return messages;
}