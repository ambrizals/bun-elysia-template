import type { ElysiaOpenAPIConfig } from "@elysiajs/openapi";
import type { OpenAPIProvider } from "@elysiajs/openapi/types";
import { ENV } from "@/config/env";
import { version } from "../../../package.json";

export const OpenAPIConfig: ElysiaOpenAPIConfig<
  boolean,
  string,
  OpenAPIProvider
> = {
  path: "/docs",
  enabled: true,
  documentation: {
    components: {
      securitySchemes: {
        sessionCookie: {
          type: "apiKey",
          in: "cookie",
          name: "session_token",
        },
        bearerJwt: {
          type: "http",
          scheme: "bearer",
        },
      },
    },
    info: {
      title: ENV.APP_NAME,
      version,
    },
  },
};
