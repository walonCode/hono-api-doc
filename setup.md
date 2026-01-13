# Setup Guide

Follow these steps to set up and run the project locally.

## Prerequisites

Ensure you have the following installed on your machine:

-   [Node.js](https://nodejs.org/) (v20 or later recommended)
-   [pnpm](https://pnpm.io/) (Package manager)
-   [Docker](https://www.docker.com/) & Docker Compose (For the database)

## Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/walonCode/hono-api-doc.git
    cd hono-api-doc
    ```

2.  **Install dependencies:**

    ```bash
    pnpm install
    ```

## Configuration

1.  **Environment Variables:**

    Create a `.env` file in the root directory. You can copy the following template:

    ```env
    NODE_ENV=development
    PORT=5000
    LOG_LEVEL=debug
    DATABASE_URL=postgresql://postgres:postgres@localhost:5432/hono_api_doc
    JWT_SECRET=your_super_secret_jwt_key
    ```

    > **Note:** The `DATABASE_URL` assumes you are using the provided Docker setup. If you have a custom Postgres instance, update the URL accordingly.

## Database Setup

1.  **Start the Database:**

    Use Docker Compose to spin up the PostgreSQL container.

    ```bash
    pnpm run docker:up
    ```

    This will start a Postgres instance on port `5432`.

2.  **Run Migrations:**

    Push the schema to the database.

    ```bash
    pnpm run db:migrate
    # or for prototyping:
    pnpm run db:push
    ```

## Running the Application

1.  **Start the Development Server:**

    ```bash
    pnpm run dev
    ```

    The server will start at `http://localhost:5000`.

2.  **Build for Production:**

    ```bash
    pnpm run build
    pnpm start
    ```

## API Documentation

Once the server is running, you can access the interactive API documentation at:

-   **Scalar UI:** `http://localhost:5000/api/v1/reference`
-   **OpenAPI JSON:** `http://localhost:5000/api/v1/doc`

## Useful Commands

| Command | Description |
| :--- | :--- |
| `pnpm run dev` | Start the dev server with hot reload |
| `pnpm run build` | Compile TypeScript to JavaScript |
| `pnpm start` | Run the built application |
| `pnpm run test` | Run tests using Vitest |
| `pnpm run lint` | Format code using Biome |
| `pnpm run db:studio` | Open Drizzle Studio to view data |
