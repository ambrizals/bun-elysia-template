import { createHelloWorldUseCase } from "@/modules/v1/hello-world/deps";
import {
  CreateHelloWorldInputPayloadSchema,
  CreateHelloWorldResBodySchema,
} from "@/modules/v1/hello-world/usecases/create-hello-world";
import { GetHelloWorldResBodySchema } from "@/modules/v1/hello-world/usecases/hello-world";
import { Elysia } from "elysia";
import { getHelloWorldUseCase } from "@/modules/v1/hello-world/deps";
import { asApiSuccessResponse, makeSuccess } from "@/common/api-response";

export const helloWorldController = new Elysia({
  prefix: "/hello",
  tags: ["Hello World"],
})
  .get(
    "/",
    async () => {
      const result = await getHelloWorldUseCase.execute();
      return makeSuccess(result);
    },
    {
      detail: {
        summary: "Hello World",
        description: "Hello World",
      },
      response: {
        200: asApiSuccessResponse(GetHelloWorldResBodySchema),
      },
    }
  )
  .post(
    "/",
    async ({ body }) => {
      const result = await createHelloWorldUseCase.execute(body);
      return result;
    },
    {
      detail: {
        summary: "Create Hello World",
        description: "Create Hello World",
      },
      body: CreateHelloWorldInputPayloadSchema,
      response: {
        200: CreateHelloWorldResBodySchema,
      },
    }
  );
