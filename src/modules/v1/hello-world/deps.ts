import { dbClient } from "@/infra/database/client";
import { HelloWorldRepository } from "./repository/hello-world.repo";
import { CreateHelloWorldUseCase } from "./usecases/create-hello-world";
import { GetHelloWorldUseCase } from "./usecases/hello-world";

export const helloWorldRepository = new HelloWorldRepository(dbClient);

export const createHelloWorldUseCase = new CreateHelloWorldUseCase(
  helloWorldRepository
);

export const getHelloWorldUseCase = new GetHelloWorldUseCase();
