import { db } from "$lib/db/client";
import { conversations } from "$lib/db/schema/conversations";
import { eq, or } from 'drizzle-orm';


export async function getConversationUsernameList(username: string) {

    const data = await db
        .select()
        .from(conversations)
        .where(or(
            eq(conversations.started_by_username, username),
            eq(conversations.talking_to_username, username),
        ),
        );


    const latest = data.map(x =>
        x.started_by_username !== username ? x.started_by_username : x.talking_to_username
    );

    return latest;
}