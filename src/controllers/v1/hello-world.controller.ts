import { createHelloWorldUseCase } from "@/modules/v1/hello-world/deps";
import {
  CreateHelloWorldInputPayloadSchema,
  CreateHelloWorldResBodySchema,
} from "@/modules/v1/hello-world/usecases/create-hello-world";
import { Elysia } from "elysia";

export const helloWorldController = new Elysia()
  .get("/hello", () => "Hello World", {
    detail: {
      tags: ["Hello World"],
      summary: "Hello World",
      description: "Hello World",
    },
  })
  .post(
    "/hello",
    async ({ body }) => {
      const result = await createHelloWorldUseCase.execute(body);
      return result;
    },
    {
      detail: {
        tags: ["Hello World"],
        summary: "Create Hello World",
        description: "Create Hello World",
      },
      body: CreateHelloWorldInputPayloadSchema,
      response: CreateHelloWorldResBodySchema,
    }
  );
