import type { ErrorHandler } from "elysia";

export class BaseError<T, Output = unknown> extends Error {
  constructor(
    public errors: T,
    public statusCode: ErrorHandler["prototype"]["code"],
    message?: string
  ) {
    super(message);
  }

  get makeErrors(): T | Output {
    return this.errors;
  }

  private makeMessage(): string | undefined {
    if (this.message.length === 0) {
      return;
    }

    return this.message;
  }

  toResponse() {
    return Response.json(
      {
        errors: this.makeErrors,
        message: this.makeMessage,
      },
      {
        status: this.statusCode,
      }
    );
  }
}
