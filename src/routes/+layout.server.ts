import type { LayoutServerLoad } from "./$types";
import { loadFlash, redirect } from "sveltekit-flash-message/server";
import type { User } from "lucia";

export const load: LayoutServerLoad = loadFlash(async (event) => {

	const { locals, route, url } = event;
	const session = await locals.auth.validate();

	if (route?.id?.includes("(protected)")) {
		if (!session) {
			const redirectToUrl = url.pathname + url.search;

			if (redirectToUrl.length > 1) {
				throw redirect(
					302,
					`/login?redirect=${redirectToUrl}`,
					{
						type: "error",
						message: "You must be logged in to access this resource"
					},
					event
				);
			}

			throw redirect(302, `/login`);
		}
	}

	return { user: session?.user as User };
});
