# 🚀 Bun + Elysia.js Template

A modern, type-safe API template built with [Bun](https://bun.sh/) and [Elysia.js](https://elysiajs.com/), featuring:

- ⚡ **Blazing Fast** - Powered by Bun's JavaScript runtime and Elysia's performance
- 🛠 **Type Safety** - Built with TypeScript and TypeBox for end-to-end type safety
- 📚 **OpenAPI** - Automatic API documentation with Swagger UI
- 🗄 **Database** - Database integration with Drizzle ORM
- 🔄 **Hot Reload** - Development server with hot module replacement

## 🏁 Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (v1.0.0 or later)
- Node.js (v18 or later, though Bun includes its own runtime)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/bun-elysia-template.git
   cd bun-elysia-template
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

3. Set up environment variables:
   ```bash
   cp .env.template .env
   # Edit .env with your configuration
   ```

## 🚀 Development

### Available Scripts

- `bun run dev` - Start the development server with hot reload
- `bun run build` - Build the application for production
- `bun run start` - Start the production server

### Project Structure

```
.
├── src/
│   ├── config/         # Configuration files
│   ├── controllers/    # Request handlers
│   ├── infra/          # Infrastructure code (database, cache, etc.)
│   ├── modules/        # Feature modules
│   └── routes/         # API route definitions
├── drizzle/            # Database migrations and schema
├── .env.template       # Environment variables template
└── package.json        # Project dependencies and scripts
```

## 📚 API Documentation

When the development server is running, you can access:

- **OpenAPI/Swagger UI**: http://localhost:3000/swagger
- **API JSON Schema**: http://localhost:3000/swagger/json

## 🛠 Technologies Used

- [Bun](https://bun.sh/) - Fast JavaScript runtime
- [Elysia.js](https://elysiajs.com/) - Fast, and friendly Bun web framework
- [Drizzle ORM](https://orm.drizzle.team/) - TypeScript ORM
- [TypeBox](https://github.com/sinclairzx81/typebox) - JSON Schema Type Builder
- [OpenAPI](https://swagger.io/specification/) - API documentation standard

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Elysia.js](https://elysiajs.com/) for the amazing framework
- [Bun](https://bun.sh/) for the fast JavaScript runtime
- All contributors who have helped shape this project