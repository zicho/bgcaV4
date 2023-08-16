import type { Session } from 'lucia';
import type { PageServerLoad } from './$types';
import { db } from '$lib/db/client';
import { messages } from '$lib/db/schema/messages';
import { eq, or, type AnyColumn, and, asc, desc } from 'drizzle-orm';
import { auth_user } from '$lib/db/schema/users';
import type { IPrivateMessage } from '$lib/interfaces/IPrivateMessage';

export const load = (async (event) => {

    const { locals, params } = event;

    const { user } = (await locals.auth.validate()) as Session;

    const senderId = (await db.query.auth_user.findFirst({
        columns: {
            id: true
        },
        where: eq(auth_user.username, params.username)
    }))?.id;

    const inbox: IPrivateMessage[] = [];

    const conversation = (await db
        .select()
        .from(messages)
        .where(or(
            and(
                eq(messages.recipient, senderId as unknown as AnyColumn),
                eq(messages.sender, user.userId)
            ),
            and(
                eq(messages.sender, senderId as unknown as AnyColumn),
                eq(messages.recipient, user.userId)
            )
        ))
        .orderBy(asc(messages.sentAt))
    );

    const all_convos = (await db
        .selectDistinct({
            username: auth_user.username,
            sent: messages.sentAt
        })
        .from(messages)
        .where(
            and(
                eq(messages.sender, senderId as unknown as AnyColumn),
                eq(messages.recipient, user.userId)
            )
        )
        .leftJoin(auth_user, eq(messages.sender, auth_user.id))
        .orderBy(desc(messages.sentAt))
    );

    const latestPostsMap = new Map();

    all_convos.forEach(message => {
        const { username, sent } = message;
        if (!latestPostsMap.has(username) || new Date(sent) > new Date(latestPostsMap.get(username).sent)) {
            latestPostsMap.set(username, message);
        }
    });

    const latestPosts = Array.from(latestPostsMap.values());

    console.dir(latestPosts);

    for (const msg of conversation) {
        inbox.push({
            username: msg?.sender === user.userId.toString() ? user.username : params.username,
            content: msg?.content as string,
            sentAt: msg?.sentAt.toString() as string,
            unread: msg?.readAt === null,
            isYou: msg?.sender === user.userId.toString()
        });
    }

    return {
        username: params.username,
        inbox,
        convos: latestPosts.map(x => x.username)
    };
}) satisfies PageServerLoad;