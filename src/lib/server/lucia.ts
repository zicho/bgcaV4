import { drizzle } from 'drizzle-orm/node-postgres';
import { SECRET_PG_HOST } from '$env/static/private';
import { dev } from '$app/environment';
import lucia from 'lucia-auth';
import postgres from 'pg';
import { sveltekit } from 'lucia-auth/middleware';
import { pg } from '@lucia-auth/adapter-postgresql';

const connectionPool = new postgres.Pool({
	connectionString: SECRET_PG_HOST
	// ...
});

const db = drizzle(connectionPool);

export const auth = lucia({
	adapter: pg(connectionPool),
	env: dev ? 'DEV' : 'PROD',
	middleware: sveltekit(),
	transformDatabaseUser: (user) => {
		return {
			user_id: user.id,
			username: user.username
		};
	}
});

export type Auth = typeof auth;
