import type { PageServerLoad } from "./$types";
import { auth_user, userProfiles } from "$lib/db/schema/users";
import { eq } from "drizzle-orm";
import { error } from "@sveltejs/kit";
import { db } from "$lib/db/client";

export const load = (async ({ parent, params }) => {
	const username = (await parent()).user.username;
	const isProfileYours = username === params.username;

	const userAndProfile = await db
		.select({
			username: auth_user.username,
			description: userProfiles.description
		})
		.from(auth_user)
		.where(eq(auth_user.username, params.username))
		.leftJoin(userProfiles, eq(userProfiles.userId, auth_user.id));

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
