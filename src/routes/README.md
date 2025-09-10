# Routes

This directory contains the route definitions for the API endpoints, organized by API version. Each router file is responsible for grouping related endpoints under a common prefix.

## Directory Structure

```
routes/
├── v1.router.ts     # Version 1 API routes
└── [version].router.ts  # Future versioned routers
```

## Implementation Guidelines

Each API version should have its own router file following the pattern `[version].router.ts`. For example:

```typescript
// v1.router.ts
import Elysia from "elysia";
import { someController } from "@/controllers/v1/some.controller";

/**
 * V1 API Routes
 *
 * @description Contains all controllers under the `/v1` prefix
 * @security Requires authentication (session cookie or JWT)
 */
export const v1ApiRoutes = new Elysia({
  prefix: "/v1",
  detail: {
    security: [{ sessionCookie: [] }, { bearerJwt: [] }],
  },
}).use(someController);
```

### 2. Route Organization

- Group related routes under a common prefix
- Apply middleware at the router level when needed (authentication, validation, etc.)
- Document the router's purpose and security requirements
- Export the router for use in the main application

### 3. Best Practices

- **Versioning**: Always prefix routes with the API version (e.g., `/v1/...`)
- **Security**: Apply appropriate security middleware at the router level
- **Documentation**: Use JSDoc to document the router's purpose and requirements
- **Separation of Concerns**: Keep route definitions focused on routing logic only
- **Error Handling**: Use global error handlers for consistent error responses

## Example Controller Usage

```typescript
// controllers/v1/some.controller.ts
import Elysia from "elysia";

export const someController = new Elysia({ prefix: "/some" })
  .get("", () => "Get all items")
  .post("", ({ body }) => {
    // Handle POST /v1/some
    return { success: true };
  });
```

## Adding New Routes

1. Create a new controller in the appropriate version directory under `src/controllers/`
2. Import and add the controller to the corresponding version router
3. Document the routes and any security requirements
