import { z } from 'zod';

export const registerSchema = z
	.object({
		username: z.string().min(3),
		password: z.string().min(3),
		confirm_password: z.string().min(3)
	})
	.refine((data) => data.password === data.confirm_password, {
		message: "Passwords don't match",
		path: ['confirm']
	});
