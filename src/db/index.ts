import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";

import * as schema from "./schema.js";
import { cfg } from "../config.js";

const migrationClient = postgres(cfg.dbConfig.dbUrl, { max: 1 });
await migrate(drizzle(migrationClient), cfg.dbConfig.migrationConfig);

const conn = postgres(cfg.dbConfig.dbUrl);
export const db = drizzle(conn, { schema });
