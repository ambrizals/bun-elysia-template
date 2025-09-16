# Controllers Documentation

## Overview

This directory contains the API route controllers for the application. Controllers handle incoming HTTP requests and return responses to the client. They serve as the entry point for all API routes.

## OpenAPI Documentation

The application uses Elysia's built-in OpenAPI support for API documentation. Here's how to use it:

### Viewing API Documentation

1. Start your development server
2. Navigate to `/swagger` in your browser
3. You'll see interactive documentation for all your API endpoints

### Example from hello-world.controller.ts

```typescript
import { Elysia } from "elysia";
import { GetHelloWorldResBodySchema } from "@/modules/v1/hello-world/usecases/hello-world";

export const helloWorldController = new Elysia({
  prefix: "/hello",
  tags: ["Hello World"],
}).get(
  "/",
  async () => {
    const result = await getHelloWorldUseCase.execute();
    return result;
  },
  {
    detail: {
      summary: "Hello World",
      description: "Returns a hello world message",
    },
    response: {
      200: GetHelloWorldResBodySchema,
    },
  }
);
```

## Adding Request/Response Schemas

### Request Body Schema

To validate and document request bodies:

```typescript
import { CreateHelloWorldInputPayloadSchema } from "@/modules/v1/hello-world/usecases/create-hello-world";

.post(
  "/",
  async ({ body }) => {
    const result = await createHelloWorldUseCase.execute(body);
    return result;
  },
  {
    detail: {
      summary: "Create Hello World",
      description: "Creates a new hello world message",
    },
    body: CreateHelloWorldInputPayloadSchema,
    response: {
      200: CreateHelloWorldResBodySchema,
    },
  }
)
```

### Query Parameters

To add query parameters:

```typescript
// In your use dto file
export const SearchProductsQuerySchema = t.Object({
  q: t.String(),
  limit: t.Optional(t.Numeric()),
  offset: t.Optional(t.Numeric()),
});

// In your controller
.get(
  "/search",
  ({ query }) => {
    // Handle search with query params
    return { results: [] };
  },
  {
    query: SearchProductsQuerySchema,
  }
)
```

### Response Schema

Define response schemas in your use cases and import them into your controllers:

```typescript
// In your use dto file
export const GetUserResponseSchema = t.Object({
  id: t.String(),
  name: t.String(),
  email: t.String({ format: "email" }),
  createdAt: t.Date(),
});

// In your controller
.get(
  "/users/:id",
  async ({ params }) => {
    return await getUserUseCase.execute(params.id);
  },
  {
    response: {
      200: GetUserResponseSchema,
      404: ErrorResponseSchema,
    },
  }
)
```

## Best Practices

1. Keep controllers thin - move business logic to use cases
2. Use descriptive route paths and HTTP methods
3. Document all endpoints with proper schemas
4. Group related routes using Elysia's prefix and tags
5. Handle errors consistently

## Testing

Test your controllers using Elysia's testing utilities:

```typescript
import { describe, it, expect } from "bun:test";
import { app } from "@/app";

describe("Hello World Controller", () => {
  it("should return hello world", async () => {
    const response = await app
      .handle(new Request("http://localhost/hello"))
      .then((res) => res.json());

    expect(response).toHaveProperty("message");
  });
});
```
