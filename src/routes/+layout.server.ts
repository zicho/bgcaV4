import type { LayoutServerLoad } from "./$types";
import { loadFlash, redirect } from "sveltekit-flash-message/server";
import type { User } from "lucia";

export const load: LayoutServerLoad = loadFlash(async (event) => {
	const { locals, route } = event;

	const session = await locals.auth.validate();

	if (route?.id?.includes("(protected)")) {
		if (!session) {
			throw redirect(
				302,
				"/login",
				{
					type: "error",
					message: "You must be logged in to access this resource"
				},
				event
			);
		}
	}

	return { user: session?.user as User };
});
