import { defineConfig } from "drizzle-kit";

import { cfg } from "./src/config";

export default defineConfig({
  schema: "src/db/schema.ts",
  out: "src/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: cfg.dbConfig.dbUrl,
  },
});
