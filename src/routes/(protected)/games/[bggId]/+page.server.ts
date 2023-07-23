import { db } from '$lib/db/client';
import { games } from '$lib/db/schema/games';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';
import { isNumber } from '$lib/functions/validators/isNumber';

export const load = (async ({ params }) => {
	if (!isNumber(params.bggId)) {
		throw error(400, 'Invalid game id in URL');
	}

	const game = await db.query.games.findFirst({
		columns: {
			slug: true
		},
		where: eq(games.bggId, Number(params.bggId))
	});

	if (!game) {
		throw error(404, `Could not find game with id ${params.bggId}`);
	}

	throw redirect(302, `/games/${params.bggId}/${game?.slug}`);
}) satisfies PageServerLoad;
