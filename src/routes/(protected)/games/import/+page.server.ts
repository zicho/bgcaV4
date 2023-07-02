import { message, superValidate } from 'sveltekit-superforms/server';
import type { Actions, PageServerLoad } from '../$types';
import { bggImportSchema } from '$lib/validationSchemas/bggImportSchema';
import { fail, redirect } from '@sveltejs/kit';
import { importBggCollection } from '$lib/functions/importBggCollection';

export const load = (async (event) => {
	const form = await superValidate(event, bggImportSchema);
	return {
		form
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const form = await superValidate(request, bggImportSchema);
		if (!form.valid) return fail(400, { form });

		const { nickname } = form.data;

		await importBggCollection(nickname).then(() => {
			throw redirect(302, '/games');
		});
	}
};
