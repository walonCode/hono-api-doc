import { defineConfig } from "drizzle-kit";
import { env } from "./src/config/env.js";

export default defineConfig({
	out: "./src/db/migrations",
	schema: "./src/db/schema.ts",
	dialect: "sqlite",
	strict: true,
	verbose: true,
	dbCredentials: {
		url: env.DATABASE_URL,
	},
});
