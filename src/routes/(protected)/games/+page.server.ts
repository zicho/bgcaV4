import { db } from '$lib/db/client';
import type { PageServerLoad } from './$types';
import { games as g } from '$lib/db/schema';

export const load = (async ({ parent }) => {
	const games = await db
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
		.from(g);

    // console.dir(gameCollection)

	return {
		games
	};
}) satisfies PageServerLoad;
