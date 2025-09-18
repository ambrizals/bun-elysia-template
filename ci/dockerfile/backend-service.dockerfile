# ---- Build stage ----
FROM oven/bun:1.2.8-alpine AS builder
WORKDIR /app

# Install dependencies first (better layer caching)
COPY bun.lock package.json ./
RUN bun install --frozen-lockfile

# Copy the rest of the source and build
COPY . .
RUN bun run build

# ---- Runtime stage ----
FROM alpine:3.20

# Install g++ to get the required C++ libraries
RUN apk add --no-cache g++

# Create non-root user
RUN addgroup -S app && adduser -S app -G app
WORKDIR /app

# Copy compiled binary from builder
COPY --from=builder /app/dist/server /app/server

# Expose default port used by Elysia (adjust if different)
EXPOSE 3000

USER app

# Run the compiled binary
CMD ["/app/server"]
