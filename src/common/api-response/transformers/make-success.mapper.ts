import type { ApiResponse } from "../types";
import { getRequestId } from "../utils/generate-request-id";

/**
 * Make success response
 *
 * @param payload
 * @returns ApiResponse<T>
 */
export function makeSuccess<T>(payload: T): ApiResponse<T> {
  return {
    payload,
    requestId: getRequestId(),
  };
}
