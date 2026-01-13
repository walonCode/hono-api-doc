# Hono API Starter

A REST API starter kit built with [Hono](https://hono.dev/), [Drizzle ORM](https://orm.drizzle.team/), and [Zod](https://zod.dev/).

> **Note:** This project is primarily for learning purposes (testing, documentation, etc.) and is **not production-ready**. Some tweaks and security hardenings are required before using it in a production environment.

## 🚀 Features

-   **Framework**: Built on **Hono** for high performance and standard Web API support.
-   **Database**: **PostgreSQL** managed via **Drizzle ORM** for type-safe SQL queries.
-   **Validation**: Request validation using **Zod** and `@hono/zod-openapi`.
-   **Documentation**: Auto-generated **OpenAPI 3.0** docs and interactive **Scalar** reference UI.
-   **Authentication**: JWT-based authentication with `bcryptjs` for password hashing.
-   **Logging**: Structured logging with **Pino**.
-   **Tooling**: Pre-configured with **Biome** for linting/formatting and **Vitest** for testing.
-   **Containerization**: **Docker Compose** setup for the database.

## 🛠️ Tech Stack

-   **Runtime**: Node.js
-   **Framework**: Hono
-   **Language**: TypeScript
-   **ORM**: Drizzle ORM
-   **Database**: PostgreSQL
-   **Validation**: Zod
-   **Docs**: @scalar/hono-api-reference

## 📖 Documentation

-   [**Setup Guide**](./setup.md): Detailed instructions on how to install, configure, and run the project.
-   **API Reference**: Available at `/api/v1/reference` when the server is running.

## ⚡ Quick Start

1.  **Clone & Install**:
    ```bash
    git clone https://github.com/walonCode/hono-api-doc.git
    cd hono-api-doc
    pnpm install
    ```

2.  **Setup Environment**:
    Create a `.env` file (see [Setup Guide](./setup.md)).

3.  **Start DB & Run**:
    ```bash
    pnpm run docker:up
    pnpm run db:push
    pnpm run dev
    ```

Visit `http://localhost:5000/api/v1/reference` to explore the API.

## 📂 Project Structure

```
src/
├── config/         # Environment configuration
├── db/             # Database schema and connection
├── lib/            # Shared utilities and app factory
├── middlewares/    # Custom middlewares (Auth, Logger, etc.)
├── routes/         # API Route definitions (Controllers)
├── app.ts          # App entry point and configuration
└── index.ts        # Server entry point
```

## 📄 License

This project is licensed under the [MIT License](./LICENSE).
