import { BaseError } from "../base/error";
import type { DrizzleError } from "drizzle-orm";

export class DatabaseError extends BaseError<DrizzleError> {
  static readonly message = "TRANSACTION_FAIL";
  static readonly status = 500;

  constructor(errors: DrizzleError) {
    super(errors, DatabaseError.status, DatabaseError.message);
  }

  override get makeErrors() {
    let message = ["Transaction failed"];
    console.error(this.errors);

    // DrizzleError.cause is typed as unknown (via Error.cause), so we need to
    // narrow it before accessing driver-specific properties like `errno`.
    const cause = (this.errors as { cause?: unknown }).cause;
    if (typeof cause === "object" && cause !== null && "errno" in cause) {
      const errno = (cause as { errno?: number | string }).errno;
      if (errno !== undefined) {
        return [`Transaction failed (${errno})`];
      }
    }

    return message;
  }
}
