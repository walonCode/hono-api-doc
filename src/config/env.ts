import { config } from "dotenv";
import { z } from "zod";

config();

const envSchema = z.object({
	DATABASE_URL: z.string().min(1),
	PORT: z.coerce.number().default(5000),
	NODE_ENV: z
		.enum(["development", "production", "preview", "test"])
		.default("development"),
	LOG_LEVEL: z.string().default("debug"),
	JWT_SECRET: z.string().min(1),
});

export const env = envSchema.parse(process.env);
