import { db } from '$lib/db/client';
import { auth_user } from '$lib/db';
import type { PageServerLoad } from './$types';

export const load = (async () => {

    const users = await db
    .select({
        username: auth_user.username,
    })
    .from(auth_user)
    .orderBy(auth_user.createdAt)
    .limit(10);

    return {
        users
    };
}) satisfies PageServerLoad;