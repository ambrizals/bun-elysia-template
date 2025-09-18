import { Elysia } from "elysia";
import { ENV, OpenAPIConfig } from "./config";
import { databasePlugin } from "./infra/database/database.plugin";
import { openApiPlugin } from "./infra/http/openapi.plugin";
import { baseApp } from "./app";
import { exceptionHandlerPlugin } from "./common/exception-handling/exception-handler.plugin";

export const app = new Elysia()
  .use(databasePlugin)
  .use(openApiPlugin)
  .use(exceptionHandlerPlugin)
  .use(baseApp)
  .listen({
    port: ENV.PORT,
    hostname: ENV.HOST,
  });

if (process.env.NODE_ENV !== "test") {
  console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
  );
  console.log(
    `OpenAPI docs at http://${app.server?.hostname}:${app.server?.port}${OpenAPIConfig.path}`
  );
}
