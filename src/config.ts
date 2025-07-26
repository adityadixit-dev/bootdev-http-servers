import type { MigrationConfig } from "drizzle-orm/migrator";

try {
  process.loadEnvFile();
} catch (err) {}

type APIConfig = {
  fileserverHits: number;
};

const migrationConfig: MigrationConfig = {
  migrationsFolder: "./src/migrations",
};

type DBConfig = {
  dbUrl: string;
  migrationConfig: MigrationConfig;
};

type MainConfig = {
  apiConfig: APIConfig;
  dbConfig: DBConfig;
};

export const cfg: MainConfig = {
  apiConfig: {
    fileserverHits: 0,
  },
  dbConfig: {
    dbUrl: envOrThrow("DB_URL"),
    migrationConfig: migrationConfig,
  },
};

function envOrThrow(key: string) {
  const envValue = process.env[key];
  if (!envValue) {
    throw new Error("Env Value not found");
  }
  return envValue;
}
