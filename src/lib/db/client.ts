import { SECRET_PG_HOST } from "$env/static/private";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "$lib/db/schema/_index";

const client = postgres(SECRET_PG_HOST);

export const db = drizzle(client, { schema });
