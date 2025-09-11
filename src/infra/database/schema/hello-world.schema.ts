import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const helloWorld = pgTable("hello_world", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
});

export type HelloWorld = typeof helloWorld.$inferSelect;