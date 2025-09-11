import type { UseCase } from "@/modules/core/usecase";
import { HelloWorldRepository } from "../../repository/hello-world.repo";
import type {
  CreateHelloWorldInputPayload,
  CreateHelloWorldResBody,
} from "./dto";
import { mapCreateHelloWorldResBody } from "./mapper";

export class CreateHelloWorldUseCase
  implements UseCase<CreateHelloWorldInputPayload, CreateHelloWorldResBody>
{
  constructor(private readonly helloWorldRepository: HelloWorldRepository) {}
  async execute(input: CreateHelloWorldInputPayload) {
    const result = await this.helloWorldRepository.createHelloWorld(input);
    return mapCreateHelloWorldResBody(result);
  }
}
