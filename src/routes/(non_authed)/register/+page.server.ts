import { type Actions, fail } from '@sveltejs/kit';
import { auth } from '$lib/server/lucia';
import { registerSchema } from '$lib/validationSchemas/registerSchema';
import type { PageServerLoad } from './$types';
import { message, superValidate } from 'sveltekit-superforms/server';
import { parseLuciaError } from '$lib/functions/parseLuciaError';
import type { LuciaError } from 'lucia-auth';
import { redirect } from 'sveltekit-flash-message/server';
import { db } from '$lib/db/client';
import { auth_user } from '$lib/db/schema';
import { eq } from 'drizzle-orm';

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

		// TODO: update lucia. it seems to create user even when error gets thrown for duplicate username. do workaround for now

		// workaround
		const user = await db.query.auth_user.findFirst({
			columns: {
				username: true
			},
			where: eq(auth_user.username, username)
		});

		if (user) {
			return message(form, 'Username already taken');
		}
		// END workaround

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
			'/',
			{
				type: 'success',
				message: `Your account has been created!`
			},
			event
		);
	}
};
