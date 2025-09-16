import type { SchemaOptions } from "@sinclair/typebox";
import { type TSchema, t } from "elysia";

/**
 * Nullable builder for typebox schema
 *
 * ```typescript
 * import { Nullable } from "@/common/validation/builder/nullable.builder";
 *
 * const schema = t.Object({
 *   id: t.Number(),
 *   name: t.String(),
 * });
 *
 * const nullableSchema = Nullable(schema);
 * type NullableSchema = typeof nullableSchema.static;
 * // { id: number; name: string } | null
 * ```
 *
 * @param T typebox schema
 * @param options options
 * @returns nullable typebox schema
 */
export const Nullable = <T extends TSchema>(T: T, options?: SchemaOptions) =>
  t.Union([T, t.Null()], options);
