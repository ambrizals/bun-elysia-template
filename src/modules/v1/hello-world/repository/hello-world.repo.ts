import { Repository } from "@/modules/core/repository";
import type { CreateHelloWorldInputPayload } from "../usecases/create-hello-world/create-hello-world.dto";
import { helloWorld } from "@/infra/database/schema";

export class HelloWorldRepository extends Repository {
  public async getHelloWorld() {
    return this.db.query.helloWorld.findMany();
  }

  public async createHelloWorld(data: CreateHelloWorldInputPayload) {
    return this.db.insert(helloWorld).values(data);
  }
}
