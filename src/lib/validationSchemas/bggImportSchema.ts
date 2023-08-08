import { z } from 'zod';

export const bggImportSchema = z.object({
	nickname: z.string().min(1)
});
