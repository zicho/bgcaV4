import { redirect, error, type Actions, fail } from '@sveltejs/kit';
import { auth } from '$lib/server/lucia';
import { registerSchema } from '$lib/validationSchemas/registerSchema';
import type { PageServerLoad } from './$types';
import { message, superValidate } from 'sveltekit-superforms/server';
import { parseLuciaError } from '$lib/functions/parseLuciaError';
import type { LuciaError } from 'lucia-auth';

export const load = (async (event) => {
	const form = await superValidate(event, registerSchema);
	return {
		form
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const form = await superValidate(request, registerSchema);

		if (!form.valid) return fail(400, { form });

		const { username, password } = form.data;

		try {
			await auth.createUser({
				primaryKey: {
					providerId: 'username',
					providerUserId: username,
					password
				},
				attributes: {
					username
				}
			});
			const key = await auth.useKey('username', username, password);
			const session = await auth.createSession(key.userId);
			locals.auth.setSession(session);
		} catch (err) {
			console.dir(err);
			return message(form, parseLuciaError(err as unknown as LuciaError));
		}

		throw redirect(302, '/');
	}
};
