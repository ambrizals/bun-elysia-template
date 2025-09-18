import { BaseError } from "../base/error";
import type { ValidationError } from "elysia";

export class ValidatorError extends BaseError<ValidationError> {
  static readonly message = "VALIDATION_ERROR";
  static readonly status = 400;

  constructor(errors: ValidationError) {
    super(errors, ValidatorError.status, ValidatorError.message);
  }

  override get makeErrors() {
    return this.errors.all.reduce<string[]>((res, entry) => {
      if (entry.summary) {
        res.push(entry.summary);
      }

      return res;
    }, []);
  }
}
