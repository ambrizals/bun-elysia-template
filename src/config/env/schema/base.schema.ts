import { t } from "elysia";

export const baseSchema = t.Object({
  APP_NAME: t.String({
    default: "Elysia Boilerplate",
  }),
  PORT: t.Number({
    default: 3000,
  }),
  HOST: t.String({
    default: "0.0.0.0",
  }),
});
