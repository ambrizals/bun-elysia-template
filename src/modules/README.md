# Modules

This directory follows clean architecture principles, organizing code by feature with clear separation of concerns. Each module should be self-contained and focused on a specific domain.

## Project Structure

```
core/                     # Core abstractions and base classes
├── repository.ts         # Abstract repository class
└── usecase.ts            # Interface use case class

v1/                       # Version 1 of the API
└── module-name/          # Feature module (e.g., 'users', 'products')
    ├── models/           # Domain models and DTOs
    │   ├── index.ts      # Export all models and types
    │   └── types.ts      # TypeScript interfaces and types
    │
    ├── repository/       # Data access layer
    │   ├── index.ts      # Export repository implementations
    │   └── repository.ts # Repository implementation
    │
    └── dto/                # Shared DTOs (if needed)
    │   └── [dto-name].ts    # DTO implementation
    └── usecases/         # Business logic
    │   └── [usecase-name]/     # Individual use case
    │       ├── index.ts        # Main use case implementation
    │       ├── dto.ts          # Input/Output DTOs
    │       └── mapper.ts       # Data transformation logic (if needed)
    └── deps.ts           # Dependency injection configuration

```

## Implementation Guidelines

### 1. Core Abstractions

The `core` directory contains base classes and interfaces that provide common functionality:
- `repository.ts`: Abstract base class for repository implementations
- `usecase.ts`: Interface for use case implementations

### 2. Models

Define your domain models and DTOs in the `models` directory. Follow these guidelines:
- Use `@sinclair/typebox` or `elysia` for type definitions
- Always check for existing models before creating new ones to avoid duplication
- Keep models focused on a single responsibility

```typescript
// models/types.ts
import { t } from 'elysia';

export const User = t.Object({
  id: t.String({ format: 'uuid' }),
  email: t.String({ format: 'email' }),
  name: t.String(),
  createdAt: t.String({ format: 'date-time' }),
  updatedAt: t.String({ format: 'date-time' })
});

export type UserType = typeof User.static;

// models/index.ts
export * from './types';
```

### 3. Repositories

Repositories handle data access and should extend the base repository from `core`:

```typescript
// repository/repository.ts
import { User } from '../models';
import { BaseRepository } from '@/modules/core/repository';

export class UserRepository extends BaseRepository {
  constructor() {
    super('users'); // 'users' is the collection/table name
  }
  
  // Add custom repository methods here
  async findByEmail(email: string): Promise<UserType | null> {
    return this.findOne({ email });
  }
}

// repository/index.ts
export * from './repository';
```

### 4. Mappers

Mappers handle the transformation between different representations of data, usually mappers was only available in use cases.

```typescript
// usecases/create-user/mapper.ts
export const toUser = (dto: CreateUserDtoType): Omit<UserType, 'id' | 'createdAt' | 'updatedAt'> => ({
  ...dto
});
```

### 5. Use Cases

Each use case should be self-contained in its own directory:

```typescript
// usecases/create-user/dto.ts
import { t } from 'elysia';

export const CreateUserDto = t.Object({
  email: t.String({ format: 'email' }),
  name: t.String(),
  password: t.String({ minLength: 8 })
});

export type CreateUserDtoType = typeof CreateUserDto.static;

export interface IOutput {
  id: string;
}

// usecases/create-user/mapper.ts
import { User } from '../../models';
import { CreateUserDtoType } from './dto';

export const toUser = (dto: CreateUserDtoType): Omit<UserType, 'id' | 'createdAt' | 'updatedAt'> => ({
  ...dto,
  // Add any additional mappings here
});

// usecases/create-user/index.ts
import { UserRepository } from '../../repository';
import { CreateUserDtoType } from './dto';
import { toUser } from './mapper';
import { UseCase } from '../../core/usecase';

export class CreateUserUseCase implements UseCase<CreateUserDtoType, IOutput> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: CreateUserDtoType): Promise<IOutput> {
    // Business logic here
    const userData = toUser(input);
    return this.userRepository.create(userData);
  }
}
```

### 6. Dependency Injection

Use constructor injection for dependencies, export them in `deps.ts`.

```typescript
// deps.ts

import { CreateUserUseCase } from './usecases/create-user';
import { UserRepository } from './repository';
import { dbClient } from '@/infra/database/client';

// Repository
export const userRepository = new UserRepository(dbClient);

// Use Cases
export const createUserUseCase = new CreateUserUseCase(userRepository);
```


## Best Practices

1. **Single Responsibility Principle**: Each class and function should have only one reason to change.
2. **Dependency Injection**: Always inject dependencies through the constructor.
3. **Type Safety**: Use TypeScript's type system to catch errors at compile time.
4. **Error Handling**: Handle errors at the appropriate level and provide meaningful error messages.
5. **Testing**: Write unit tests for all business logic and repository methods.

## Example Module Structure

Here's how a complete user module might look:

```
user/
├── models/
│   ├── user.model.ts
│   └── index.ts
├── repository/
│   ├── user.repository.ts
│   └── index.ts
└── usecases/
│   ├── create-user/
│   │   ├── dto.ts
│   │   ├── mapper.ts
│   │   └── index.ts
│   └── get-user/
│       ├── dto.ts
│       └── index.ts
└── deps.ts
```

## Next Steps

1. Implement the base repository and use case interfaces in the `core` directory
2. Create your first module following this structure
3. Set up dependency injection for better testability
4. Add validation using `@sinclair/typebox` or `zod`
5. Write unit tests for your business logic

## Type Safety with TypeBox

This project uses `@sinclair/typebox` for runtime type checking and validation. Here's how to use it effectively:

```typescript
import { t } from 'elysia';

// Define a schema
const UserSchema = t.Object({
  id: t.String({ format: 'uuid' }),
  email: t.String({ format: 'email' }),
  name: t.String(),
  role: t.Union([t.Literal('admin'), t.Literal('user')]),
  createdAt: t.String({ format: 'date-time' }),
  updatedAt: t.String({ format: 'date-time' })
});

// Extract TypeScript type
type User = typeof UserSchema.static;
```

## Error Handling

Follow these guidelines for consistent error handling:

1. Use custom error classes that extend `Error`
2. Include error codes for client-side handling
3. Provide meaningful error messages
4. Log errors with appropriate context

```typescript
export class ValidationError extends Error {
  constructor(message: string, public readonly code: string = 'VALIDATION_ERROR') {
    super(message);
    this.name = 'ValidationError';
  }
}
```

<!-- ## Testing

Each module should include tests for:

- Repository methods
- Use cases
- Controllers (if applicable)
- Custom validators and utilities

Place tests in a `__tests__` directory next to the code they test.

## Documentation

1. Document public APIs with JSDoc
2. Include examples in complex functions
3. Keep README files updated
4. Document environment variables and configuration options

## Conclusion

This structure provides a clean, maintainable way to organize your code with clear separation of concerns. By following these patterns, you'll create applications that are:

- **Testable**: Business logic is isolated from framework concerns
- **Maintainable**: Clear boundaries between different parts of the application
- **Scalable**: Easy to add new features without breaking existing ones
- **Type-Safe**: Full TypeScript support with runtime validation

## Getting Started

1. Install dependencies:
   ```bash
   bun install
   ```

2. Create a new module:
   ```bash
   mkdir -p src/modules/v1/your-module/{models,repository,usecases}
   ```

3. Start implementing your domain models, repositories, and use cases following the patterns above.

## Additional Resources

- [Elysia.js Documentation](https://elysiajs.com/)
- [TypeBox Documentation](https://github.com/sinclairzx81/typebox)
- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.## Example Use Case Implementation

Here's how to implement a use case using the patterns described above:

```typescript
// usecases/create-user/index.ts
import { UserRepository } from '../../repository';
import { CreateUserDto } from './dto';
import { toUser } from './mapper';

export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: CreateUserDto) {
    // Business logic here
    const userData = toUser(input);
    
    // Example validation
    if (await this.userRepository.findByEmail(userData.email)) {
      throw new Error('User with this email already exists');
    }
    
    return this.userRepository.create(userData);
  }
}
```

## Best Practices Summary

1. **Single Responsibility**: Each file should have one clear purpose
2. **Dependency Injection**: Dependencies should be injected through constructors
3. **Type Safety**: Use TypeScript interfaces and types extensively
4. **Immutability**: Prefer immutable data structures and pure functions
5. **Testing**: Write tests for all business logic and edge cases
6. **Documentation**: Keep JSDoc and README files up to date
7. **Error Handling**: Use custom error classes and meaningful error messages -->
