import { db } from '$lib/db/client';
import type { PageServerLoad } from './$types';
import { games, usersToGames } from '$lib/db/schema';
import { eq } from 'drizzle-orm';

export const load = (async ({ parent }) => {
	let user_id = (await parent()).user.user_id;

	const gameCollection = await db
		.select({
			id: games.id,
			bggId: games.bggId,
			name: games.name,
			rating: games.averageRating,
			thumbnail: games.thumbnailUrl,
			yearPublished: games.yearPublished
		})
		.from(usersToGames)
		.where(eq(usersToGames.userId, user_id))
		.leftJoin(games, eq(usersToGames.gameId, games.id));

    // console.dir(gameCollection)

	return {
		games: gameCollection
	};
}) satisfies PageServerLoad;
