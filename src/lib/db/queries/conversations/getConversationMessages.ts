import { db } from "$lib/db/client";
import type { IConversation } from "$lib/data/interfaces/IConversation";
import type { IConversationMessage } from "$lib/interfaces/IConversationMessage";


export async function getConversation(to_username: string, from_username: string): Promise<IConversation> {

    const conversation = await db.query.conversations.findFirst({
        with: {
            messages: {
                orderBy: (conversationMessages, { desc }) => [desc(conversationMessages.sentAt)],
            }
        },
        where: ((conversations, { eq, or, and }) =>
            or(
                and(
                    eq(conversations.talking_to_username, to_username),
                    eq(conversations.started_by_username, from_username),
                ),
                and(
                    eq(conversations.started_by_username, to_username),
                    eq(conversations.talking_to_username, from_username),
                ),
            )),
        orderBy: (conversations, { desc }) => [desc(conversations.latest_activity)],
    });

    const messages: IConversationMessage[] = [];

    conversation?.messages.forEach(message => {
        messages.push({
            username: message.sender_username as string,
            content: message.content as string,
            sentAt: message.sentAt as unknown as string,
            unread: message.readAt === null,
            isYou: message.sender_username === to_username
        });
    });

    return {
        id: conversation?.id as number,
        started_by: conversation?.started_by as string,
        talking_to: conversation?.talking_to as string,
        messages: messages
    };
}