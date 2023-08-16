import type { Session } from 'lucia';
import type { Actions, PageServerLoad } from './$types';
import { getConversation } from '$lib/db/queries/conversations/getConversationMessages';
import { getConversationUsernameList } from '$lib/db/queries/conversations/getConversationUsernameList';
import { createInsertSchema } from 'drizzle-zod';
import { conversation_messages } from '$lib/db/schema/conversations';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { insertConversationReply } from '$lib/db/queries/conversations/insertConversationReply';

export const load = (async (event) => {

    const { locals, params } = event;

    const { user } = (await locals.auth.validate()) as Session;

    const conversation = await getConversation(user.username, params.username);
    const otherConversations = await getConversationUsernameList(user.username);

    return {
        username: params.username,
        conversation,
        otherConversations
    };
}) satisfies PageServerLoad;

export const actions: Actions = {
    default: async (event) => {
        const { request, params, locals } = event;

        const { user } = (await locals.auth.validate()) as Session;

        const insertConversationMessageSchema = createInsertSchema(conversation_messages);

        const form = await superValidate(request, insertConversationMessageSchema);

        if (!form.valid) return fail(400, { form });

        try {
            await insertConversationReply(
                form.data.conversationId as number,
                user.username,
                params.username,
                form.data.content
            );

            return { success: true };
        } catch {
            return fail(500);
        }
    },
};