import { db } from "$lib/db/client";
import { games } from "$lib/db/schema/games";
import { parseIntoGame } from "$lib/data/interfaces/bgg/IBggGameDetailed";
import { eq } from "drizzle-orm";

export async function importBggGame(bggId: number) {
	try {
		const response = await fetch(`https://bgg-json.azurewebsites.net/thing/${bggId}`);
		const data = await response.json();
		const model = parseIntoGame(data);

		const game = await db
			.update(games)
			.set({ desc: model.description })
			.where(eq(games.bggId, bggId))
			.returning();

		return game;
	} catch (error) {
		console.error("Error:", error);
		return {
			status: "error",
			message: `Unknown error. Service might be down. Try again later.`
		};
	}
}
