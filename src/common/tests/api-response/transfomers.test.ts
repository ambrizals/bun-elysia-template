import { makeError, makeSuccess } from "@/common/api-response";
import { describe, expect, it } from "bun:test";

describe("Test transformers was working correctly", () => {
  it("Should format success payload correctly", () => {
    const response = makeSuccess("Hello World");
    expect(response.payload).toBe("Hello World");
    expect(response.requestId).toBeString();
  });

  it("Should format error payload correctly", () => {
    const response = makeError();
    expect(response.payload).toBeNull();
    expect(response.requestId).toBeString();
    expect(response.errors).toBeUndefined();
  });

  it("Should format error payload with errors correctly", () => {
    const errors = [{ message: "Error" }];

    const response = makeError({ errors });
    expect(response.payload).toBeNull();
    expect(response.requestId).toBeString();
    expect(response.errors).toEqual(errors);
  });
});
