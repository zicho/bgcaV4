import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import { games } from '$lib/db/schema';
import { db } from '$lib/db/client';
import { isNumber } from '$lib/functions/validators/isNumber';
import { error } from '@sveltejs/kit';
import { importBggGame } from '$lib/functions/importBggGame';

export const load = (async ({ params }) => {
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

	if (!game?.desc) {
		await importBggGame(bggId);

        game = await db.query.games.findFirst({
            where: eq(games.bggId, bggId)
        });
	}

	return { game };
}) satisfies PageServerLoad;
