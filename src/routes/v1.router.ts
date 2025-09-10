import Elysia from "elysia";
import { helloWorldController } from "@/controllers/v1/hello-world.controller";

/**
 * V1 API Routes
 *
 * Contains all of controllers into prefix `/v1`
 *
 * All endpoints in this router requires authentication, either by session cookie or bearer jwt (take a look on detail security)
 */
export const v1ApiRoutes = new Elysia({
  prefix: "/v1",
  detail: {
    security: [{ sessionCookie: [] }, { bearerJwt: [] }],
  },
}).use(helloWorldController);
