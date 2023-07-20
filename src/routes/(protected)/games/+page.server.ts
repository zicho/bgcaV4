import { db } from '$lib/db/client';
import type { PageServerLoad } from './$types';
import { games as g } from '$lib/db';
import { ilike, sql } from 'drizzle-orm';
import { redirect, type Actions } from '@sveltejs/kit';
import { isNumber } from '$lib/functions/validators/isNumber';

export const load = (async ({ url }) => {
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
			.from(g)
			.where(ilike(g.name, `%${searchParam}%`))
	)[0].count;

	const totalPages = Math.ceil(totalHits / limit);

	if ((pageNo > totalPages || pageNo < 1) && !searchParam) {
		throw redirect(302, `/games`);
	}

	const pageResult = await db
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
		.orderBy(g.name)
		.where(ilike(g.name, `%${searchParam}%`))
		.limit(limit)
		.offset((pageNo - 1) * limit);

	return {
		games: pageResult,
		searchParam,
		pageNo: Number(pageNo),
		limit: Number(limit),
		totalHits: Number(totalHits),
		totalPages: Number(totalPages)
	};
}) satisfies PageServerLoad;
