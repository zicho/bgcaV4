import { redirect } from '@sveltejs/kit';
import { handleLoginRedirect } from '$lib/functions/handleLoginRedirect';
import type { LayoutServerLoad } from './$types';
import { loadFlashMessage } from 'sveltekit-flash-message/server';
import type { User } from 'lucia';

export const load: LayoutServerLoad = loadFlashMessage(async ({ locals, route, url }) => {
	const session = await locals.auth.validate();

	if (route?.id?.includes('(protected)')) {
		if (!session) throw redirect(302, handleLoginRedirect(url));
	}

	return { user: session?.user as User };
});
