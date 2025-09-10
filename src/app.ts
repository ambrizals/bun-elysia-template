import { BaseController } from "./controllers/base.controller";
import { Elysia } from "elysia";
import { v1ApiRoutes } from "./routes/v1.router";

/**
 * Base App
 * Contains all controllers
 */
export const baseApp = new Elysia().use(BaseController).use(v1ApiRoutes);
