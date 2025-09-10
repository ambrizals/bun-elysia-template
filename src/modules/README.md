# Modules

This directory follows clean architecture principles, organizing code by feature with clear separation of concerns. Each module should be self-contained and focused on a specific domain.

## Module Structure

```
module-name/
├── models/           # Domain models and DTOs
│   ├── index.ts      # Export all models and types
│   └── types.ts      # TypeScript interfaces and types
├── repository/       # Data access layer
│   ├── index.ts      # Export repository implementations
│   └── repository.ts # Repository implementation
└── usecases/         # Business logic
    ├── index.ts      # Export all use cases
    └── usecase.ts    # Use case implementation
```

## Implementation Guidelines

### 1. Models

Define your domain models and DTOs in the `models` directory:

```typescript
// models/types.ts
export interface User {
  id: string;
  name: string;
  email: string;
}

// models/index.ts
export * from './types';
```

### 2. Repository

Implement data access logic in the `repository` directory:

```typescript
// repository/repository.ts
import { User } from '../models';

export interface UserRepository {
  findById(id: string): Promise<User | null>;
  create(user: Omit<User, 'id'>): Promise<User>;
}

// repository/index.ts
export * from './repository';
```

### 3. Use Cases

Implement business logic in the `usecases` directory:

```typescript
// usecases/usecase.ts
import { User, UserRepository } from '../models';

export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(userData: Omit<User, 'id'>): Promise<User> {
    // Business logic here
    return this.userRepository.create(userData);
  }
}

// usecases/index.ts
export * from './usecase';
```

## Best Practices

- **Single Responsibility**: Each file should have one clear purpose
- **Dependency Injection**: Dependencies should be injected through constructors
- **Type Safety**: Use TypeScript interfaces and types extensively
- **Error Handling**: Handle and properly type all possible errors
- **Testing**: Make sure all components are easily testable in isolation
