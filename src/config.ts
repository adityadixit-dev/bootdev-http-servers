import type { MigrationConfig } from "drizzle-orm/migrator";

try {
  process.loadEnvFile();
} catch (err) {}

type APIConfig = {
  fileserverHits: number;
  platform: string;
  saltRounds: number;
  jwtSecret: string;
  defaultExpTimeSeconds: number;
  refreshTokenExpTimeSecs: number;
  polkaKey: string;
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
    platform: envOrThrow("PLATFORM"),
    saltRounds: 10,
    jwtSecret: envOrThrow("JWT_SECRET"),
    defaultExpTimeSeconds: 60 * 60,
    refreshTokenExpTimeSecs: 60 * 24 * 60 * 60,
    polkaKey: envOrThrow("POLKA_KEY"),
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
