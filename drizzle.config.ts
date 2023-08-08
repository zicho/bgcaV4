import type { Config } from "drizzle-kit";

export default {
	out: "./drizzle",
	schema: "./src/lib/db/schema/*.ts"
} satisfies Config;
