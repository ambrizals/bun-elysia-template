# Common Utilities

This directory contains shared utilities and components used across the application.

## Directory Structure

```
common/
├── api-response/          # API response utilities
│   ├── schema-builder/   # Response schema definitions
│   ├── transformers/     # Response transformers
│   ├── utils/            # Utility functions
│   ├── types.ts          # TypeScript type definitions
│   └── index.ts          # Main exports
├── exception-handling/   # Global exception handling
└── validation/          # Validation utilities
```

## API Response Module

The `api-response` module provides a standardized way to handle API responses with TypeScript support.

### Key Features

- **Structured Responses**: Consistent format for success and error responses
- **Type Safety**: Full TypeScript support with generics
- **Request Tracking**: Automatic request ID generation
- **Error Handling**: Standardized error responses with codes and details

### Basic Usage

```typescript
import { makeSuccess, makeError } from './common/api-response';

// Success response
const success = makeSuccess({ id: 1, name: 'Example' });

// Error response
const error = makeError({
  errors: [
    {
      message: 'Resource not found',
      code: 'NOT_FOUND',
      details: { resourceId: '123' }
    }
  ]
});
```

## Exception Handling

Global exception handling utilities for consistent error responses.

## Validation

Shared validation schemas and utilities using TypeBox.

## Development

When adding new utilities:

1. Place related files in the appropriate subdirectory
2. Export all public APIs through the module's `index.ts`
3. Include TypeScript type definitions
4. Add relevant tests
5. Update this documentation if needed
