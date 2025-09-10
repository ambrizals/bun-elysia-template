import { ENV } from "@/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  schema: "./src/infra/database/schema/index.ts",
  dialect: "postgresql",
  dbCredentials: {
    host: ENV.DB_HOST,
    port: ENV.DB_PORT,
    user: ENV.DB_USER,
    password: ENV.DB_PWD,
    database: ENV.DB_NAME,
  },
  verbose: true,
});
