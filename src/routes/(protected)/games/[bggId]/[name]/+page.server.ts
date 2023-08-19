import { eq, and } from "drizzle-orm";
import type { PageServerLoad } from "./$types";
import { db } from "$lib/db/client";
import { isNumber } from "$lib/functions/validators/isNumber";
import { error, type Actions } from "@sveltejs/kit";
import { importBggGame } from "$lib/functions/importBggGame";
import { usersToGameCollections, games, userFavoriteGames } from "$lib/db/schema/games";
import type { Session } from "lucia";

export const load = (async ({ params, parent }) => {
	if (!isNumber(params.bggId)) {
		throw error(400, "Invalid game id in URL");
	}

	const bggId = Number(params.bggId);

	const { user } = await parent();

	const gameId = (await db.select({ id: games.id }).from(games)
		.where(eq(games.bggId, bggId)).limit(1))[0].id;

	if (!gameId) {
		throw error(404, `Could not find game with id ${params.bggId}`);
	}

	const game = (await db.query.games.findFirst({
		where: eq(games.id, gameId),
		with: {
			usersToGames: {
				where: and(
					eq(usersToGameCollections.gameId, gameId),
					eq(usersToGameCollections.userId, user.userId)
				)
			},
			usersToFavoriteGames: {
				where: and(
					eq(usersToGameCollections.gameId, gameId),
					eq(usersToGameCollections.userId, user.userId)
				)
			},
		},
	}));

	if (!game?.desc) {
		await importBggGame(bggId);

		const desc = await db.query.games.findFirst({
			where: eq(games.bggId, bggId),
			columns: {
				desc: true
			}
		});

		if (!game) return;

		game.desc = desc as unknown as string;
	}

	return {
		game,
		inCollection: game?.usersToGames.length > 0,
		favorite: game?.usersToFavoriteGames.length > 0,
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	remove: async (event) => {

		const { request, locals } = event;
		const form = await request.formData();
		const id = Number(form.get("id"));
		const { user } = (await locals.auth.validate()) as Session;

		await db
			.delete(usersToGameCollections)
			.where(and(eq(usersToGameCollections.gameId, id), eq(usersToGameCollections.userId, user.userId)));

		return {
			success: true
		};
	},
	add: async (event) => {

		const { request, locals } = event;
		const form = await request.formData();
		const id = Number(form.get("id"));
		const { user } = (await locals.auth.validate()) as Session;

		await db.insert(usersToGameCollections).values({
			userId: user.userId,
			gameId: id
		});

		return {
			success: true
		};
	},
	swap_favorite_status: async (event) => {

		const { request, locals } = event;
		const form = await request.formData();
		const id = Number(form.get("id"));
		const { user } = (await locals.auth.validate()) as Session;

		const isFavorite = await db.query.userFavoriteGames.findFirst({
			where: and(
				eq(usersToGameCollections.gameId, id),
				eq(usersToGameCollections.userId, user.userId)
			)
		});

		if (!isFavorite) {
			await db.insert(userFavoriteGames).values({
				userId: user.userId,
				gameId: id
			});
		} else {
			await db.delete(userFavoriteGames).where(
				and(
					eq(userFavoriteGames.userId, user.userId),
					eq(userFavoriteGames.gameId, id)
				)
			);
		}

		return {
			success: true
		};
	},
};
