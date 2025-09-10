import { t } from "elysia";

export const databaseEnvSchema = t.Object({
  DB_USER: t.String({
    message: "DB_USER must be a filled",
  }),
  DB_PWD: t.String({
    message: "DB_PWD must be a filled",
  }),
  DB_NAME: t.String({
    message: "DB_NAME must be a filled",
  }),
  DB_PORT: t.Number({
    message: "DB_PORT must be a number",
  }),
  DB_HOST: t.String({
    message: "DB_HOST must be a filled",
  }),
});
