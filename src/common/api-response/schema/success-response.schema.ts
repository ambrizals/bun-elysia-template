import { type TSchema, t } from "elysia";
import type { ObjectOptions } from "@sinclair/typebox";

export const asApiSuccessResponse = <P extends TSchema>(
  Payload: P,
  ObjectOptions?: ObjectOptions
) =>
  t.Object(
    {
      payload: Payload,
      requestId: t.String({
        description: "Request id for reference",
        examples: [123456789],
      }),
    },
    ObjectOptions
  );
