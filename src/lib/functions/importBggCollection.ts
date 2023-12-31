import { db } from "$lib/db/client";
import { games, usersToGameCollections } from "$lib/db/schema/games";
import { parseIntoGame, type IBggGameSimple } from "$lib/data/interfaces/bgg/IBggGameSimple";
import { inArray } from "drizzle-orm";

type BggGameImportResult = {
	numberOfGamesImported?: number;
	status: "success" | "error" | "info" | "warning";
	message: string;
};

export async function importBggCollection(
	username: string,
	user_id: string
): Promise<BggGameImportResult> {
	try {
		const response = await fetch(`https://bgg-json.azurewebsites.net/collection/${username}`);
		const data = await response.json();

		// todo: use inferred drizzle types, not custom interface
		const parsedBggGameData: IBggGameSimple[] = data.map((item: IBggGameSimple) => item);

		if (parsedBggGameData.length == 0) {
			return {
				status: "warning",
				message: `No games found for user '${username}'`
			};
		}

		const entities = parsedBggGameData.map(parseIntoGame);

		// insert games first
		await db.insert(games).values(entities).onConflictDoNothing({ target: games.bggId });

		// then insert game ids in collection tables to map user to games

		// we need to get game IDs (our own primary key) based on added bggIds
		const gameIds = await db
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

		const insertedGames = await db
			.insert(usersToGameCollections)
			.values(mapped)
			.onConflictDoNothing()
			.returning({ insertedId: usersToGameCollections.gameId });

		if (insertedGames.length > 0) {
			return {
				status: "success",
				message: `Imported ${insertedGames.length} games!`
			};
		} else {
			return {
				status: "info",
				message: "Import could not find any games not already in your collection."
			};
		}
	} catch (error) {
		console.error("Error:", error);
		return {
			status: "error",
			message: `Unknown error. Service might be down. Try again later.`
		};
	}
}
