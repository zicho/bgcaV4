import { db } from '$lib/db/client';
import type { PageServerLoad } from './$types';
import { games, usersToGames } from '$lib/db/schema';
import { eq } from 'drizzle-orm';

export const load = (async ({ parent }) => {
	let user_id = (await parent()).user.user_id;

	const gameCollection = await db
		.select()
		.from(usersToGames)
		.where(eq(usersToGames.userId, user_id))
		.leftJoin(games, eq(usersToGames.gameId, games.id));

    console.dir(gameCollection)

	return {};
}) satisfies PageServerLoad;
