import { createMiddleware } from "hono/factory";
import type { AppBindings } from "@/lib/types.js";

type RateLimitEntry = {
	count: number;
	resetAt: number;
};

const store = new Map<string, RateLimitEntry>();

export const rateLimitByUser = ({
	limit,
	windowMs,
}: {
	limit: number;
	windowMs: number;
}) =>
	createMiddleware<AppBindings>(async (c, next) => {
		const user = c.get("user");

		if (!user) {
			return c.json({ ok: false, message: "Unauthorized" }, 401);
		}

		const key = `user:${user.id}`;
		const now = Date.now();

		const entry = store.get(key);

		if (!entry || entry.resetAt < now) {
			store.set(key, {
				count: 1,
				resetAt: now + windowMs,
			});
			return next();
		}

		if (entry.count >= limit) {
			const retryAfter = Math.ceil((entry.resetAt - now) / 1000);

			c.header("Retry-After", retryAfter.toString());
			return c.json(
				{
					ok: false,
					message: "Too many requests",
				},
				429,
			);
		}

		entry.count++;
		return next();
	});
