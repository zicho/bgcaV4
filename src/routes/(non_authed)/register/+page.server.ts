import { type Actions, fail } from '@sveltejs/kit';
import { auth } from '$lib/server/lucia';
import { registerSchema } from '$lib/validationSchemas/registerSchema';
import type { PageServerLoad } from './$types';
import { message, superValidate } from 'sveltekit-superforms/server';
import { parseLuciaError } from '$lib/functions/parseLuciaError';
import type { LuciaError } from 'lucia-auth';
import { redirect } from 'sveltekit-flash-message/server';

export const load = (async (event) => {
	const form = await superValidate(event, registerSchema);
	return {
		form
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	default: async (event) => {

		const { request, locals } = event;

		const form = await superValidate(request, registerSchema);

		if (!form.valid) {
			if ('username' in form.errors) {
				return message(form, 'Username can only contain letters, numbers and underscores,');
			}
			return fail(400, { form });
		}

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

		throw redirect(
			302, 
			'/', { 
				type: "success", 
				message: `Your account has been created!`
			},
			event);
	}
};
