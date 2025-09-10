import { t } from "elysia";

export const HelloWorld = t.Object({
  id: t.Number(),
  name: t.String(),
  description: t.String(),
});
