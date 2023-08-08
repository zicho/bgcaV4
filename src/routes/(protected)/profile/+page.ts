import { redirect } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load = (async ({ parent }) => {
	const username = (await parent()).user.username;

	throw redirect(302, `/profile/${username}`);
}) satisfies PageLoad;
