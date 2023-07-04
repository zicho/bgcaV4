import { message, superValidate } from 'sveltekit-superforms/server';
import type { Actions, PageServerLoad } from '../$types';
import { bggImportSchema } from '$lib/validationSchemas/bggImportSchema';
import { fail } from '@sveltejs/kit';
import { importBggCollection } from '$lib/functions/importBggCollection';
import { redirect } from 'sveltekit-flash-message/server';

export const load = (async (event) => {
	const form = await superValidate(event, bggImportSchema);
	return {
		form
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	default: async (event) => {
		const { request, locals } = event;

		const form = await superValidate(request, bggImportSchema);
		if (!form.valid) return fail(400, { form });

		const { user } = await locals.auth.validateUser();

		const { nickname } = form.data;

		await importBggCollection(nickname, user.user_id).then((result) => {
			throw redirect(
				302,
				'/games',
				{
					type: result.status,
					message: result.message
				},
				event
			);
		});
	}
};
