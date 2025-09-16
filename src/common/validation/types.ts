import type { TProperties } from "@sinclair/typebox";

export type HasProperties<T> = T extends { properties: TProperties }
  ? T
  : never;
