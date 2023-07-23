import type { Config } from 'drizzle-kit';

export default {
	out: './drizzle',
	schema: './src/lib/db/schema/schema.ts'
} satisfies Config;
