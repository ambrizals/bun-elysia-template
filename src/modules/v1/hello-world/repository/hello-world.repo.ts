import { Repository } from "@/modules/core/repository";
import { helloWorld } from "@/infra/database/schema";
import type { CreateHelloWorldInputPayload } from "@/modules/v1/hello-world/usecases/create-hello-world";

export class HelloWorldRepository extends Repository {
  public async getHelloWorld() {
    return this.db.query.helloWorld.findMany();
  }

  public async createHelloWorld(data: CreateHelloWorldInputPayload) {
    return this.db.insert(helloWorld).values(data);
  }
}
