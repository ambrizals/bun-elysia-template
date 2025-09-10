import Elysia from "elysia";
import { dbClient } from "./client";

export const databasePlugin = new Elysia({ name: "db" }).decorate({ dbClient });
