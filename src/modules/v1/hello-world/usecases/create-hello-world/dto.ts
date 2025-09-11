import { helloWorld } from "@/infra/database/schema";
import { createInsertSchema } from "drizzle-typebox";
import { t } from "elysia";

export const CreateHelloWorldInputPayloadSchema =
  createInsertSchema(helloWorld);

export const CreateHelloWorldResBodySchema = t.Object({
  description: t.String(),
  name: t.String(),
});

export type CreateHelloWorldInputPayload =
  typeof CreateHelloWorldInputPayloadSchema.static;

export type CreateHelloWorldResBody =
  typeof CreateHelloWorldResBodySchema.static;
