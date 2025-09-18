import Elysia from "elysia";
import { ValidatorError } from "./handlers/validation.error";
import { BaseError } from "./base/error";
import { DatabaseError } from "./handlers/database.error";
import type { DrizzleError } from "drizzle-orm";

export const exceptionHandlerPlugin = new Elysia().onError(
  { as: "scoped" },
  ({ error }) => {
    if ("validator" in error) {
      const validatorError = new ValidatorError(error);
      return validatorError.toResponse();
    }

    if ("toResponse" in error) {
      return error.toResponse();
    }

    if ("query" in error) {
      const databaseError = new DatabaseError(error as DrizzleError);
      return databaseError.toResponse();
    }

    console.error(error);
    const baseError = new BaseError(error, 500);
    return baseError.toResponse();
  }
);
