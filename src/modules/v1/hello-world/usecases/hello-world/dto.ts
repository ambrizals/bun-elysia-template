import { Type } from "@sinclair/typebox";

export const GetHelloWorldResBodySchema = Type.Object({
  message: Type.String(),
});

export type GetHelloWorldResBody = typeof GetHelloWorldResBodySchema.static;
