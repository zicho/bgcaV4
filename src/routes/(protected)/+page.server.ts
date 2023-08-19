import { db } from "$lib/db/client";
import { users as users_table } from "$lib/db/schema/users";
import type { PageServerLoad } from "./$types";

export const load = (async () => {
	const users = await db
		.select({
			username: users_table.username
		})
		.from(users_table)
		.orderBy(users_table.createdAt)
		.limit(10);

	return {
		users
	};
}) satisfies PageServerLoad;
