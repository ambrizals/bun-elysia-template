import { Elysia, t } from "elysia";

/**
 * Base Controller
 * Provides basic endpoints for monitoring and load balancing
 */
export const BaseController = new Elysia()
  .get("/ping", () => "pong", {
    detail: {
      description: "Ping endpoint",
      summary: "Ping endpoint",
      tags: ["Base"],
    },
    response: t.String(),
  })
  .get(
    "/health",
    () => ({
      status: "ok",
      timestamp: new Date().toISOString(),
      uptime: Math.floor(process.uptime()),
    }),
    {
      detail: {
        description: "Health check endpoint",
        summary: "Health check endpoint",
        tags: ["Base"],
      },
      response: t.Object({
        status: t.String(),
        timestamp: t.String(),
        uptime: t.Number(),
      }),
    }
  );
