import {
  asApiErrorResponse,
  asApiSuccessResponse,
  makeError,
  makeSuccess,
} from "@/common/api-response";
import { checkValidationType } from "@/common/validation/utils/check-validator-type";
import { describe, expect, it } from "bun:test";
import { t } from "elysia";

describe("Test schema was working correctly", () => {
  it("Should pass because success response schema was correct", () => {
    const payload = {
      message: "Hello World",
    };

    const schema = asApiSuccessResponse(
      t.Object({
        message: t.String(),
      })
    );

    const successResponse = makeSuccess(payload);
    const compiled = checkValidationType(schema, successResponse);

    expect(compiled.payload.message).toEqual(payload.message);
  });

  it("Should pass because error response schema was correct", () => {
    const payload = "Hello World";

    const schema = asApiErrorResponse(t.String());

    const errorResponse = makeError({ errors: [payload] });
    const compiled = checkValidationType(schema, errorResponse);

    expect(compiled.errors?.[0]).toEqual(payload);
  });
});
