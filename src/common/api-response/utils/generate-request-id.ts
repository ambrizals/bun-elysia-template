/**
 * Generates a unique request ID based on current timestamp
 * @returns {string} A timestamp-based request ID
 */
export const getRequestId = (): string => Date.now().toString();
