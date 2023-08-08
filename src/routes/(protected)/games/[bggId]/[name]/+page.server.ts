import { eq, and, type AnyColumn } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import { db } from '$lib/db/client';
import { isNumber } from '$lib/functions/validators/isNumber';
import { error, type Actions } from '@sveltejs/kit';
import { importBggGame } from '$lib/functions/importBggGame';
import { redirect } from 'sveltekit-flash-message/server';
import { usersToGames, games } from '$lib/db/schema/games';
import type { Session } from 'lucia';

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
		where: and(
			eq(game?.id as unknown as AnyColumn, usersToGames.gameId),
			eq(user.userId as unknown as AnyColumn, usersToGames.userId)
		)
	});

	if (!game?.desc) {
		await importBggGame(bggId);

		game = await db.query.games.findFirst({
			where: eq(games.bggId, bggId)
		});
	}

	return { game, inCollection };
}) satisfies PageServerLoad;

export const actions: Actions = {
	remove: async (event) => {
		const { request, locals } = event;

		const form = await request.formData();

		const id = Number(form.get('id'));
		const url = form.get('redirect_to') as string;
		const { user } = (await locals.auth.validate()) as Session;

		await db
			.delete(usersToGames)
			.where(and(eq(usersToGames.gameId, id), eq(usersToGames.userId, user.userId)));

		throw redirect(
			302,
			url,
			{
				type: 'warning',
				message: `The game was removed from your collection!`
			},
			event
		);
	},
	add: async (event) => {
		const { request, locals } = event;

		const form = await request.formData();

		const id = Number(form.get('id'));
		const url = form.get('redirect_to') as string;
		const { user } = (await locals.auth.validate()) as Session;

		await db.insert(usersToGames).values({
			userId: user.userId,
			gameId: id
		});

		throw redirect(
			302,
			url,
			{
				type: 'success',
				message: `The game was added to your collection!`
			},
			event
		);
	}
};
