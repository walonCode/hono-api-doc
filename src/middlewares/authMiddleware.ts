import { createMiddleware } from "hono/factory";
import * as jwt from "hono/jwt";
import { env } from "@/config/env.js";

import type { AppBindings } from "@/lib/types.js";

export const authMiddleware = createMiddleware<AppBindings>(async (c, next) => {
	const auth = c.req.header("Authorization");
	if (!auth || !auth.startsWith("Bearer ")) {
		return c.json(
			{
				ok: false,
				message: "Unauthorized user",
			},
			401,
		);
	}

	const token = auth.replace("Bearer ", "");
	try {
		const payload = (await jwt.verify(token, env.JWT_SECRET)) as { id: string };
		c.set("user", payload);
		await next();
	} catch (error) {
		env.NODE_ENV === "development"
			? c.var.logger.error(`Error from the authMiddleware ${error}`)
			: "";
		return c.json({ ok: false, error: "Invalid token" }, 401);
	}
});
