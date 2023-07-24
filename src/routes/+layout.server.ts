import { redirect } from '@sveltejs/kit';
import { handleLoginRedirect } from '$lib/functions/handleLoginRedirect';
import type { LayoutServerLoad } from './$types';
import { loadFlashMessage } from "sveltekit-flash-message/server"
import type { IUser } from '$lib/data/interfaces/IUser';

export const load: LayoutServerLoad = loadFlashMessage(async ({ locals, route, url }) => {
	const { session, user } = await locals.auth.validateUser();

	if (route?.id?.includes('(protected)')) {
		if (!session) throw redirect(302, handleLoginRedirect(url));	
	} 

	const u = user as IUser; // workaround because Lucia typing is not working

	return { user: u };
});
