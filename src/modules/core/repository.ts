import type { AppDatabase } from "@/infra/database/client";

export abstract class Repository {
  constructor(protected readonly db: AppDatabase) {}
}
