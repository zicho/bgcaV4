import type { Session } from 'lucia';
import type { PageServerLoad } from './$types';
import { db } from '$lib/db/client';
import { messages } from '$lib/db/schema/messages';
import { eq, or, type AnyColumn, and } from 'drizzle-orm';
import { auth_user } from '$lib/db/schema/users';
import type { IPrivateMessage } from '$lib/interfaces/IPrivateMessage';

export const load = (async (event) => {

    const { locals } = event;
    const { user } = (await locals.auth.validate()) as Session;

    const allSendersUnique = (await db
        .selectDistinct({
            id: auth_user.id,
            username: auth_user.username,
        })
        .from(messages)
        .leftJoin(auth_user, eq(auth_user.id, messages.sender))
        .where(eq(messages.recipient, user.userId))
        .groupBy(({ username }) => username)
        .groupBy(({ id }) => id));

    const inbox: IPrivateMessage[] = [];

    for (const sender of allSendersUnique) {

        const latestMsgContent = await db.query.messages.findFirst({
            columns: {
                recipient: true,
                sender: true,
                content: true,
                sentAt: true,
                readAt: true
            },

            where: or(
                and(
                    eq(messages.recipient, sender.id as unknown as AnyColumn),
                    eq(messages.sender, user.userId)
                ),
                and(
                    eq(messages.sender, sender.id as unknown as AnyColumn),
                    eq(messages.recipient, user.userId)
                )

            ),
            orderBy: (messages, { desc }) => [desc(messages.sentAt)],
        });

        inbox.push({
            username: sender.username as string,
            content: latestMsgContent?.content as string,
            sentAt: latestMsgContent?.sentAt.toString(),
            unread: latestMsgContent?.readAt === null,
            isYou: latestMsgContent?.sender === user.userId.toString()
        });
    }

    // const m = (await db
    //     .selectDistinctOn([
    //         auth_user.username
    //     ])
    //     .from(messages)
    //     .leftJoin(auth_user, eq(auth_user.id, messages.sender))
    //     .where(
    //         or(
    //             eq(messages.recipient, user.userId),
    //             eq(messages.sender, user.userId)
    //         )
    //     ));

    // console.dir(m);

    // const receivedMessages = (
    //     await db.select().from(messages)
    //         .where(inArray(messages.sender as unknown as AnyColumn, allSenderIdsUnique))
    // );

    // const count = await db.select({
    //     sender: messages.sender,
    //     count: sql<number>`count(${messages.sender})`,

    // })
    //     .from(messages)
    //     .where(inArray(messages.sender as unknown as AnyColumn, allSenderIdsUnique))
    //     .groupBy(({ sender }) => sender);

    // console.dir(allSendersUnique);

    return {
        inbox
    };
}) satisfies PageServerLoad;