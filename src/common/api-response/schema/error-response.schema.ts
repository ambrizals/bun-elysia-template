import { type TSchema, t } from "elysia";
import type { ObjectOptions, TNever } from "@sinclair/typebox";

export const asApiErrorResponse = <E extends TSchema = TNever>(
  Err: E,
  ObjectOptions?: ObjectOptions
) =>
  t.Object(
    {
      payload: t.Null(),
      requestId: t.String({
        description: "Request id for reference",
        examples: ["123456789"],
      }),
      errors: t.Optional(t.Array(Err)),
    },
    ObjectOptions
  );
