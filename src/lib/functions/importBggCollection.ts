import { db } from '$lib/db/client';
import { games, usersToGames } from '$lib/db/schema';
import { parseIntoGame, type IBggGameSimple } from '$lib/interfaces/bgg/IBggGameSimple';
import { inArray } from 'drizzle-orm';

export async function importBggCollection(username: string, user_id: string) {
	try {
		const response = await fetch(`https://bgg-json.azurewebsites.net/collection/${username}`);
		const data = await response.json();
		const parsedBggGameData: IBggGameSimple[] = data.map((item: any) => item as IBggGameSimple);

		const entities = parsedBggGameData.map(parseIntoGame);

		// insert games first
		await db.insert(games).values(entities).onConflictDoNothing({ target: games.bggId });

		// then insert game ids in collection tables to map user to games

		// we need to get game IDs (our own primary key) based on added bggIds
		let gameIds = await db
			.select({
				gameId: games.id
			})
			.from(games)
			.where(
				inArray(
					games.bggId,
					entities.map((x) => x.bggId)
				)
			);

		// map game ids to user id
		const mapped = gameIds.map(({ gameId }) => ({ userId: user_id, gameId }));

		await db.insert(usersToGames).values(mapped).onConflictDoNothing();
	} catch (error) {
		console.error('Error:', error);
		// Handle any errors that occur during the request
	}
}
