import type { HelloWorld } from "@/infra/database/schema";
import type { CreateHelloWorldResBody } from "./dto";

export function mapCreateHelloWorldResBody(
  data: HelloWorld
): CreateHelloWorldResBody {
  return {
    description: data.description,
    name: data.name,
  };
}
