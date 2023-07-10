import { eq, type AnyColumn } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import { games, usersToGames } from '$lib/db/schema';
import { db } from '$lib/db/client';
import { isNumber } from '$lib/functions/validators/isNumber';
import { error } from '@sveltejs/kit';
import { importBggGame } from '$lib/functions/importBggGame';

export const load = (async ({ params, parent }) => {
	if (!isNumber(params.bggId)) {
		throw error(400, 'Invalid game id in URL');
	}

	const bggId = Number(params.bggId);

	let game = await db.query.games.findFirst({
		where: eq(games.bggId, bggId)
	});

	if (!game) {
		throw error(404, `Could not find game with id ${params.bggId}`);
	}

	const { user } = await parent();

	const inCollection = await db.query.usersToGames.findFirst({
		where:
			eq(game?.id as unknown as AnyColumn, usersToGames.gameId) &&
			eq(user.user_id, usersToGames.userId)
	});

	if (!game?.desc) {
		await importBggGame(bggId);

		game = await db.query.games.findFirst({
			where: eq(games.bggId, bggId)
		});
	}

	return { game, inCollection };
}) satisfies PageServerLoad;
