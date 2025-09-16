import type { UseCase } from "@/modules/core/usecase";
import type { GetHelloWorldResBody } from "./dto";

export class GetHelloWorldUseCase
  implements UseCase<void, GetHelloWorldResBody>
{
  public async execute() {
    return {
      message: "Hello World",
    };
  }
}
