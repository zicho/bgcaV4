import { redirect, type Actions, fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms/server';
import { upsertProfileSchema } from '$lib/validationSchemas/upsertProfileSchema';
import postgres from 'postgres';
import { SECRET_PG_HOST } from '$env/static/private';
import * as schema from '$lib/db/schema';
import { drizzle } from 'drizzle-orm/postgres-js';
import { auth_user, profileInfo } from '$lib/db/schema';
import { eq } from 'drizzle-orm';

const client = postgres(SECRET_PG_HOST);
const db = drizzle(client, { schema });

export const load = (async (event) => {
	let username = (await event.parent()).user.username;
	if (event.params.username !== username) throw redirect(302, `/profile/${username}`);

	const form = await superValidate(event, upsertProfileSchema);

	const data = (
		await db
			.select({
				description: profileInfo.description,
				signature: profileInfo.signature
			})
			.from(profileInfo)
			.where(eq(auth_user.username, event.params.username))
			.leftJoin(auth_user, eq(profileInfo.userId, auth_user.id))
	)[0];

	form.data = { ...data };

	return {
		form
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	default: async ({ request, params }) => {
		const form = await superValidate(request, upsertProfileSchema);
		if (!form.valid) return fail(400, { form });

		const data = (
			await db
				.select()
				.from(auth_user)
				.where(eq(auth_user.username, params.username as string))
				.leftJoin(profileInfo, eq(profileInfo.userId, auth_user.id))
		)[0];

		const parsedFormModel = upsertProfileSchema.parse({
			...form.data
		});

		await db
			.insert(profileInfo)
			.values({
				id: data.profile_info?.id,
				userId: data.auth_user.id,
				...parsedFormModel
			})
			.onConflictDoUpdate({
				target: profileInfo.id,
				set: { ...parsedFormModel }
			});

			throw redirect(302, `/profile/${params.username}`)

		return {
			form
		};
	}
};
