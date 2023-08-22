import { getFriendRequests } from '$lib/db/queries/notifications/getFriendRequests';
import { answerFriendRequest } from '$lib/form_actions/friendRequests';
import { answerFriendRequestSchema } from '$lib/validationSchemas/friendRequestSchemas';
import { superValidate } from 'sveltekit-superforms/server';
import type { Actions, PageServerLoad } from './$types';

export const load = (async (event) => {

    const friendRequests = await getFriendRequests(event);
    const answerFriendRequestForm = await superValidate(answerFriendRequestSchema);

    return {
        friendRequests,
        answerFriendRequestForm
    };

}) satisfies PageServerLoad;

export const actions: Actions = {
    answerFriendRequest,
};
