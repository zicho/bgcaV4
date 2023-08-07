import { type Actions, fail } from '@sveltejs/kit';
import { auth } from '$lib/server/lucia';
import { generateRandomString } from 'lucia/utils';
import { registerSchema } from '$lib/validationSchemas/registerSchema';
import type { PageServerLoad } from './$types';
import { message, superValidate } from 'sveltekit-superforms/server';
import { redirect } from 'sveltekit-flash-message/server';
import { LuciaError } from 'lucia';

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

		if (typeof password !== 'string' || password.length < 4 || password.length > 255) {
			return message(form, 'Invalid password');
		}

		// TODO: update lucia. it seems to create user even when error gets thrown for duplicate username. do workaround for now

		// workaround
		// const existingUser = await db.query.auth_user.findFirst({
		// 	columns: {
		// 		username: true
		// 	},
		// 	where: eq(auth_user.username, username)
		// });

		// if (existingUser) {
		// 	return message(form, 'Username already taken');
		// }

		// console.dir('user: ' + existingUser);
		// END workaround

		try {
			const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
			const userId = generateRandomString(15, alphabet);

			console.dir('creating user');
			const user = await auth.createUser({
				userId: userId,
				key: {
					providerId: 'username', // auth method
					providerUserId: username.toLowerCase(), // unique id when using "username" auth method
					password // hashed by Lucia
				},
				attributes: {
					username
				}
			});

			const session = await auth.createSession({
				userId: user.userId,
				attributes: {}
			});

			locals.auth.setSession(session); 

			throw redirect(
				302,
				'/',
				{
					type: 'success',
					message: `Your account has been created!`
				},
				event
			);
		} catch (e) {
			if (e instanceof LuciaError && e.message === 'AUTH_DUPLICATE_KEY_ID') {
				return message(form, 'Username already taken');
			}

			console.dir(e); // todo: log?
			return message(form, 'Failed to create user');
		}

		// const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

		// try {
		// 	const userId = generateRandomString(15, alphabet);

		// 	await auth.createUser({
		// 		userId: userId,
		// 		key: {
		// 			providerId: 'username',
		// 			providerUserId: username,
		// 			password
		// 		},
		// 		attributes: {
		// 			username
		// 		}
		// 	});

		// 	await auth.createSession({
		// 		userId,
		// 		attributes: {
		// 			username
		// 		},
		// 	});
		// } catch (err) {
		// 	// console.dir(err);
		// 	console.dir("prprporpåpkpewoq")
		// 	return message(form, parseLuciaError(err as unknown as LuciaError));
		// }
	}
};
