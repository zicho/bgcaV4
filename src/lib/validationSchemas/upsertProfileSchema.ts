import { userProfiles } from '$lib/db/schema/users';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

export const upsertProfileSchema = createInsertSchema(userProfiles, {
	description: z
		.string({})
		.max(200, { message: "Profile description can't exceed 200 characters." })
		.trim(),
	signature: z.string({}).max(45, { message: "Signature can't exceed 40 characters." }).trim()
}).pick({
	// put the fields you want to validate here
	description: true,
	signature: true
});
