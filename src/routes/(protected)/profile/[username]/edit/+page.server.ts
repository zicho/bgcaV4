import { type Actions, fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms/server';
import { upsertProfileSchema } from '$lib/validationSchemas/upsertProfileSchema';

import { userProfiles } from '$lib/db/schema/users';
import { eq } from 'drizzle-orm';
import { redirect } from 'sveltekit-flash-message/server';
import { db } from '$lib/db/client';

export const load = (async (event) => {
	let { username, user_id } = (await event.parent()).user;
	if (event.params.username !== username) throw redirect(302, `/profile/${username}`);

	const form = await superValidate(event, upsertProfileSchema);

	const data = await db.query.userProfiles.findFirst({
		columns: {
			description: true,
			signature: true
		},
		where: eq(userProfiles.userId, user_id)
	});

	form.data = { ...data };

	return {
		form
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	default: async (event) => {
		const { request, params, locals } = event;

		const form = await superValidate(request, upsertProfileSchema);
		if (!form.valid) return fail(400, { form });

		const { user } = await locals.auth.validateUser();

		const data = await db.query.userProfiles.findFirst({
			where: eq(userProfiles.userId, user.user_id)
		});

		const parsedFormModel = upsertProfileSchema.parse({
			...form.data
		});

		await db
			.insert(userProfiles)
			.values({
				id: data?.id,
				userId: user.user_id,
				...parsedFormModel
			})
			.onConflictDoUpdate({
				target: userProfiles.id,
				set: { ...parsedFormModel }
			});

		throw redirect(
			302,
			`/profile/${params.username}`,
			{
				type: 'success',
				message: `Your profile has been updated!`
			},
			event
		);
	}
};
