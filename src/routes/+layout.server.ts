import { redirect } from '@sveltejs/kit';
import { handleLoginRedirect } from '$lib/functions/handleLoginRedirect';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, route, url }) => {
	const { session, user } = await locals.auth.validateUser();

	if (route?.id?.includes('(protected)')) {
		if (!session) throw redirect(302, handleLoginRedirect(url));	
	} 

	return { user };
};
