import { Elysia } from "elysia";
import { ENV, OpenAPIConfig } from "./config";
import { databasePlugin } from "./infra/database/database.plugin";
import { openApiPlugin } from "./infra/http/openapi.plugin";
import { baseApp } from "./app";

const app = new Elysia()
  .use(databasePlugin)
  .use(openApiPlugin)
  .use(baseApp)
  .listen({
    port: ENV.PORT,
    hostname: ENV.HOST,
  });

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
console.log(
  `OpenAPI docs at http://${app.server?.hostname}:${app.server?.port}${OpenAPIConfig.path}`
);
