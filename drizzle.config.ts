import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "src/db",
  out: "src/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: "",
  },
});
