import { db } from '$lib/db/client';
import type { PageServerLoad } from './$types';
import { games, usersToGames } from '$lib/db/schema';
import { eq, sql, ilike, and } from 'drizzle-orm';
import { isNumber } from '$lib/functions/validators/isNumber';
import { redirect } from '@sveltejs/kit';

export const load = (async ({ parent, url }) => {
	let user_id = (await parent()).user.user_id;

	let searchParam = url.searchParams.get('search');
	let pageNo = Number(url.searchParams.get('page'));
	let limit = Number(url.searchParams.get('limit'));

	const validLimitValues = [10, 25, 50, 100];

	if (!limit) {
		limit = 10;
	} else if (!isNumber(limit.toString())) {
		limit = 10;
	} else if (!validLimitValues.includes(limit)) {
		limit = 10;
	}

	if (!pageNo) {
		pageNo = 1;
	}

	if (!searchParam) {
		searchParam = '';
	}

	const totalHits = (
		await db
			.select({ count: sql<number>`count(*)` })
			.from(usersToGames)
			.where(and(
				eq(usersToGames.userId, user_id),
				ilike(games.name, `%${searchParam}%`)))
			.leftJoin(games, eq(usersToGames.gameId, games.id))
	)[0].count;

	const totalPages = Math.ceil(totalHits / limit);

	if ((pageNo > totalPages || pageNo < 1) && !searchParam) {
		throw redirect(302, `/games/collection`);
	}

	const gameCollection = await db
		.select({
			id: games.id,
			bggId: games.bggId,
			name: games.name,
			desc: games.desc,
			slug: games.slug,
			rating: games.averageRating,
			thumbnail: games.thumbnailUrl,
			yearPublished: games.yearPublished
		})
		.from(usersToGames)
		.where(and(
			eq(usersToGames.userId, user_id),
			ilike(games.name, `%${searchParam}%`)))
		.leftJoin(games, eq(usersToGames.gameId, games.id))
		.limit(limit)
		.offset((pageNo - 1) * limit);

	return {
		games: gameCollection,
		searchParam,
		pageNo: Number(pageNo),
		limit: Number(limit),
		totalHits: Number(totalHits),
		totalPages: Number(totalPages)
	};
}) satisfies PageServerLoad;
