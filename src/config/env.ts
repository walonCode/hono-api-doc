import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
	DATABASE_URL: z.string().min(1),
	PORT: z.coerce.number().default(5000),
	NODE_ENV: z
		.enum(["development", "production", "preview"])
		.default("development"),
});

export const env = envSchema.parse(process.env);
