import { helloWorld } from "@/infra/database/schema";
import { createInsertSchema } from "drizzle-typebox";

export const CreateHelloWorldInputPayloadSchema =
  createInsertSchema(helloWorld);

export type CreateHelloWorldInputPayload =
  typeof CreateHelloWorldInputPayloadSchema.static;
