import { app } from "@/main";
import { describe, expect, it } from "bun:test";

describe("Hello World", () => {
  it("Should return hello world", async () => {
    const response = await app
      .handle(new Request("http://localhost/v1/hello"))
      .then((res) => res.json() as Record<string, any>);

    expect(response).toHaveProperty("payload");
    expect(response?.payload?.message).toEqual("Hello World");
  });

  it("Should fail because property was invalid when create hello world message", async () => {
    const response = await app.handle(
      new Request("http://localhost/v1/hello", {
        method: "POST",
        body: JSON.stringify({
          name: "John Doe",
        }),
      })
    );

    const body = (await response.json()) as Record<string, unknown>;
    expect(body.errors).toBeArray();
    expect(response.status).toEqual(400);
  });
});
