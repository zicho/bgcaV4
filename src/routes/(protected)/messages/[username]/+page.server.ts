import type { Session } from 'lucia';
import type { PageServerLoad } from './$types';
import { getConversationMessages } from '$lib/db/queries/conversations/getConversationMessages';
import { getConversationUsernameList } from '$lib/db/queries/conversations/getConversationUsernameList';

export const load = (async (event) => {

    const { locals, params } = event;

    const { user } = (await locals.auth.validate()) as Session;

    const inbox = await getConversationMessages(user.username, params.username);
    const conversations = await getConversationUsernameList(user.username);

    return {
        username: params.username,
        inbox,
        conversations
    };
}) satisfies PageServerLoad;