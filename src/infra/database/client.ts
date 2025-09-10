import { ENV } from "@/config";
import { drizzle } from "drizzle-orm/bun-sql";
import * as schema from "./schema";
import type { PgTransaction, PgQueryResultHKT } from "drizzle-orm/pg-core";
import type { TSchema } from "elysia";

export const dbClient = drizzle({
  connection: {
    host: ENV.DB_HOST,
    port: ENV.DB_PORT,
    user: ENV.DB_USER,
    password: ENV.DB_PWD,
    database: ENV.DB_NAME,
  },
  schema,
});

export type AppDatabase = typeof dbClient;
export type AppTransaction = PgTransaction<
  PgQueryResultHKT,
  AppDatabase["_"],
  TSchema
>;
