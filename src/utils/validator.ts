import type { Static, TSchema } from "elysia";
import { AssertError, Value } from "@sinclair/typebox/value";
import { TypeCompiler } from "@sinclair/typebox/compiler";
import type { TProperties, TSchema as TypeBoxSchema } from "@sinclair/typebox";

// Helper type to check if a schema has properties
type HasProperties<T> = T extends { properties: TProperties } ? T : never;

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
