import { handleLoginRedirect } from "$lib/functions/handleLoginRedirect";
import type { LayoutServerLoad } from "./$types";
import { loadFlashMessage, redirect } from "sveltekit-flash-message/server";
import type { User } from "lucia";
import { error } from "@sveltejs/kit";

export const load: LayoutServerLoad = loadFlashMessage(async (event) => {
	const { locals, route, url } = event;

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

		// throw redirect(302, handleLoginRedirect({ url }));
	}

	return { user: session?.user as User };
});
