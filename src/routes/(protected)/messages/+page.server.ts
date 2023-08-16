import type { Session } from 'lucia';
import type { PageServerLoad } from './$types';
import { getLatestConversationsForUsername } from '$lib/db/queries/conversations/getLatestConversations';

export const load = (async (event) => {

    const { locals } = event;
    const { user } = (await locals.auth.validate()) as Session;

    return {
        inbox: await getLatestConversationsForUsername(user.username),
    };
}) satisfies PageServerLoad;