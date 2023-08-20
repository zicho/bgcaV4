import { db } from "$lib/db/client";
import { games } from "$lib/db/schema/games";
import { eq } from "drizzle-orm";

export async function getGame(id: number) {
    const result = await db.select().from(games).where(
        eq(games.id, id)
    );

    return result[0];
}