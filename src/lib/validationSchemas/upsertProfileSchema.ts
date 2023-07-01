import { profileInfo } from '$lib/db/schema';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

export const upsertProfileSchema = createInsertSchema(profileInfo, {
	description: z.string({}).max(200, { message: "Profile description can't exceed 200 characters." }),
    signature: z.string({}).max(45, { message: "Signature can't exceed 40 characters." })
}).pick({
	// put the fields you want to validate here
	description: true,
    signature: true
});
