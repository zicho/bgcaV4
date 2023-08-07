import { redirect, type Actions, fail, error } from '@sveltejs/kit';
import { auth } from '$lib/server/lucia';
import { loginSchema } from '$lib/validationSchemas/loginSchema';
import { message, superValidate } from 'sveltekit-superforms/server';
import { parseLuciaError } from '$lib/functions/parseLuciaError';
import { LuciaError } from 'lucia';
import type { PageServerLoad } from './$types';

export const load = (async (event) => {
	const form = await superValidate(event, loginSchema);
	return {
		form
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const form = await superValidate(request, loginSchema);
		if (!form.valid) return fail(400, { form });

		const { username, password } = form.data;

		try {
			const key = await auth.useKey('username', username.toLowerCase(), password);
			const session = await auth.createSession({
				userId: key.userId,
				attributes: {}
			});
			locals.auth.setSession(session); // set session cookie
		} catch (e) {
			if (
				e instanceof LuciaError &&
				(e.message === 'AUTH_INVALID_KEY_ID' || e.message === 'AUTH_INVALID_PASSWORD')
			) {
				// user does not exist
				// or invalid password
				return message(form, 'Incorrect username or password.');
			}

			return message(form, 'An unknown error occurred.');
		}

		throw redirect(302, '/');
	}
};
