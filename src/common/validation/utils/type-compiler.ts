import type { TSchema, Static } from "elysia";
import type { HasProperties } from "../types";
import type { TSchema as TypeBoxSchema } from "@sinclair/typebox";
import { checkValidationType } from "./check-validator-type";

/**
 * Type compiler
 *
 * @param schema typebox schema
 * @param env environment variables
 * @returns validated data
 */
export function typeCompiler<T extends TSchema>(
  schema: T,
  env: Record<string, string | undefined>
): Static<T> {
  const result: Record<string, unknown> = {};

  // Convert string values to appropriate types based on schema
  if ("properties" in schema) {
    const schemaWithProps = schema as HasProperties<typeof schema>;

    for (const [key, value] of Object.entries(env)) {
      if (key in schemaWithProps.properties) {
        const prop = schemaWithProps.properties[key];

        if (prop?.type === "number") {
          result[key] = value ? Number(value) : undefined;
        } else if (prop?.type === "boolean") {
          result[key] = value ? value === "true" : undefined;
        } else {
          result[key] = value;
        }
      }
    }

    // Apply defaults for any missing required fields
    for (const [key, prop] of Object.entries(schemaWithProps.properties)) {
      const propSchema = prop as TypeBoxSchema & { default?: unknown };
      if ("default" in propSchema && !(key in result)) {
        result[key] = propSchema.default;
      }
    }
  }

  return checkValidationType(schema, result, { convert: true });
}
