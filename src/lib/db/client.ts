import { SECRET_PG_HOST } from "$env/static/private";
import postgres from "postgres";
import * as schema from '$lib/db/schema';
import { drizzle } from 'drizzle-orm/postgres-js';

const client = postgres(SECRET_PG_HOST);

export const db = drizzle(client, { schema });

