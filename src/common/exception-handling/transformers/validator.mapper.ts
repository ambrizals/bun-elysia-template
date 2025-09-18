import type { ValidationError } from "elysia";
import { TypeStatusCode } from "../constant/type-status-code";

function mapTypeCode(
  error: ValidationError["all"][number],
  defaultCode?: number
): number {
  if ("type" in error) {
    return TypeStatusCode[error.type] ?? defaultCode ?? 422;
  }

  return defaultCode ?? 422;
}

/**
 *
 * This was used to map validator errors to http status code
 *
 * @param error
 * @param defaultCode
 * @returns
 */
export function mapValidatorStatusCode(
  error: ValidationError,
  defaultCode?: number
): {
  errors: string[];
  statusCode: number;
} {
  const errors = error.all;
  const errCode = mapTypeCode(
    errors[0] as ValidationError["all"][number],
    defaultCode
  );

  return {
    errors: errors.reduce<string[]>((res, entry) => {
      if (entry.summary) {
        res.push(entry.summary);
      }

      return res;
    }, []),
    statusCode: errCode,
  };
}
