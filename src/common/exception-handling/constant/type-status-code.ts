import type { ValueErrorType } from "@sinclair/typebox/errors";

/**
 * Dictionary for mapping validator errors to http status code
 *
 * @see ValueErrorType
 *
 */
export const TypeStatusCode: Record<number, number> = {
  45: 400,
} as Record<ValueErrorType, number>;
