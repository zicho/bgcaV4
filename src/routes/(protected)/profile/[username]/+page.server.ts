import type { PageServerLoad } from './$types';
import { SECRET_PG_HOST } from '$env/static/private';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { auth_user, profileInfo } from '$lib/db/schema';
import * as schema from '$lib/db/schema';
import { eq } from 'drizzle-orm';
import { error } from '@sveltejs/kit';

export const load = (async ({ parent, url, params }) => {
	let username = (await parent()).user.username;
	const isProfileYours = username === params.username;

	const client = postgres(SECRET_PG_HOST);
	const db = drizzle(client, { schema });

	const userAndProfile = await db
		.select({
			username: auth_user.username,
			description: profileInfo.description
		})
		.from(auth_user)
		.where(eq(auth_user.username, params.username))
		.leftJoin(profileInfo, eq(profileInfo.userId, auth_user.id));

    const profile = userAndProfile[0]

	if (!profile) {
		throw error(404, {
			message: `User ${params.username} was not found`
		});
	}

	return {
		isProfileYours,
		profile
	};
}) satisfies PageServerLoad;
