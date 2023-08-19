import type { PageServerLoad } from "./$types";
import { users, userProfiles } from "$lib/db/schema/users";
import { eq } from "drizzle-orm";
import { error } from "@sveltejs/kit";
import { db } from "$lib/db/client";

export const load = (async ({ parent, params }) => {
	const username = (await parent()).user.username;
	const isProfileYours = username === params.username;

	const userAndProfile = await db
		.select({
			username: users.username,
			description: userProfiles.description
		})
		.from(users)
		.where(eq(users.username, params.username))
		.leftJoin(userProfiles, eq(userProfiles.userId, users.id));

	const profile = userAndProfile[0];

	if (!profile) {
		throw error(404, {
			message: `User ${params.username} was not found`
		});
	}

	return {
		isProfileYours,
		profile
	};
}) satisfies PageServerLoad;
