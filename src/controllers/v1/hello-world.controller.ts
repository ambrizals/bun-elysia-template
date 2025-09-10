import { Elysia } from "elysia";

export const helloWorldController = new Elysia().get(
  "/hello",
  () => "Hello World",
  {
    detail: {
      tags: ["Hello World"],
      summary: "Hello World",
      description: "Hello World",
    },
  }
);
