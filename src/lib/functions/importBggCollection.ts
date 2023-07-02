import { db } from "$lib/db/client";
import { games } from "$lib/db/schema";
import { parseIntoGame, type IBggGameSimple } from "$lib/interfaces/bgg/IBggGameSimple";

export async function importBggCollection(username: string) {
    try {
      const response = await fetch(`https://bgg-json.azurewebsites.net/collection/${username}`);
      const data = await response.json();
      const parsedBggGameData: IBggGameSimple[] = data.map((item: any) => item as IBggGameSimple);
      let test = parsedBggGameData[0];

      console.dir(parsedBggGameData.map(parseIntoGame))

      await db
        .insert(games)
        .values(parsedBggGameData.map(parseIntoGame))
        .onConflictDoNothing({ target: games.bggId });

    } catch (error) {
      console.error('Error:', error);
      // Handle any errors that occur during the request
    }
  }