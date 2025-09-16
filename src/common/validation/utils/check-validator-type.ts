import { Value, AssertError } from "@sinclair/typebox/value";
import type { TSchema, Static } from "elysia";
import { TypeCompiler } from "elysia/type-system";
import type { HasProperties } from "../types";

/**
 * Check validation type
 *
 * @param schema typebox schema
 * @param data data to validate
 * @param options options
 * @returns validated data
 */
export function checkValidationType<T extends TSchema>(
  schema: T,
  data: unknown,
  options?: {
    convert?: boolean;
  }
): Static<T> {
  const compiler = TypeCompiler.Compile(schema);
  const result =
    data && typeof data === "object"
      ? { ...(data as object) }
      : ({} as Record<string, unknown>);

  if (options?.convert && "properties" in schema) {
    const schemaWithProps = schema as HasProperties<typeof schema>;
    for (const key in schemaWithProps.properties) {
      if (schemaWithProps.properties[key]) {
        result[key] = Value.Convert(
          schemaWithProps.properties[key],
          result[key]
        );
      }
    }
  }

  try {
    return compiler.Decode(result) as Static<T>;
  } catch (error) {
    const errorPayload = error as AssertError;
    throw new Error(errorPayload.error?.schema.message ?? "Validation failed");
  }
}
