import { z } from 'zod';

export const registerSchema = z
	.object({
		username: z
			.string()
			.regex(/^[\w]+$/, { message: 'Username contains an illegal sign' })
			.min(3, { message: 'Username must be minimum 3 characters' })
			.max(25, { message: 'Username can be max 25 characters' })
			.trim()
			.nonempty(),
		password: z.string().min(3),
		confirm_password: z.string().min(3)
	})
	.refine((data) => data.password === data.confirm_password, {
		message: "Passwords don't match",
		path: ['confirm']
	});
