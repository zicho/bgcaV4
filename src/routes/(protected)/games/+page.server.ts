import { db } from '$lib/db/client';
import type { PageServerLoad } from './$types';
import { games as g } from '$lib/db/schema';
import { ilike, like, sql } from 'drizzle-orm';
import { redirect, type Actions } from '@sveltejs/kit';
import { isNumber } from '$lib/functions/validators/isNumber';

export const load = (async ({ url }) => {
	let searchParam = url.searchParams.get('search');
	let page = Number(url.searchParams.get('page'));
	let limit = Number(url.searchParams.get('limit'));

	if (!limit) {
		limit = 10;
	}

	if (!page) {
		page = 1;
	}

	if (!searchParam) {
		searchParam = '';
	}

	console.log(searchParam);

	const totalHits = (await db.select({ count: sql<number>`count(*)` }).from(g))[0].count;
	const totalPages = Math.ceil(totalHits / limit);

	if (page > totalPages || page < 1) {
		throw redirect(302, `/games`);
	}

	let query = db
		.select({
			id: g.id,
			bggId: g.bggId,
			name: g.name,
			desc: g.desc,
			slug: g.slug,
			rating: g.averageRating,
			thumbnail: g.thumbnailUrl,
			yearPublished: g.yearPublished
		})
		.from(g)
		.limit(limit)
		.offset((page - 1) * limit);

	if (searchParam) query = query.where(ilike(g.name, searchParam));

	const pageResult = await query;

	// console.dir(gameCollection)

	return {
		games: pageResult,
		page,
		limit,
		query: searchParam,
		totalHits,
		totalPages
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await request.formData();

		const page = form.get('page') as string;

		if (!isNumber(page)) {
			throw redirect(302, `/games`);
		}

		throw redirect(302, `/games?page=${page}`);
	}
};
