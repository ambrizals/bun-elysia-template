import type { ApiResponse } from "../types";
import { getRequestId } from "../utils/generate-request-id";

/**
 * Make error response
 *
 * @param options options
 * @returns ApiResponse<null, U>
 */
export function makeError<U = never>(options?: {
  errors?: U[];
  requestId?: string;
}): ApiResponse<null, U> {
  return {
    payload: null,
    requestId: options?.requestId ?? getRequestId(),
    errors: options?.errors,
  };
}
