import { t } from "elysia";
import { typeCompiler } from "@/common/validation/utils/type-compiler";
import { baseSchema } from "@/config/env/schema/base.schema";
import { databaseEnvSchema } from "@/config/env/schema/database.schema";

const envSchema = t.Composite([baseSchema, databaseEnvSchema]);

export const ENV = typeCompiler(envSchema, process.env);
