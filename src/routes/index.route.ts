import { createRoute, z } from "@hono/zod-openapi";
import { createRouter } from "@/lib/create-app.js";

const router = createRouter().openapi(
	createRoute({
		method: "get",
		path: "/",
		tags: ["Index"],
		responses: {
			200: {
				content: {
					"application/json": {
						schema: z.object({
							ok: z.boolean(),
							message: z.string(),
						}),
					},
				},
				description: "Todo API Index",
			},
		},
	}),
	(c) => {
		return c.json(
			{
				ok: false,
				message: "Hello",
			},
			200,
		);
	},
);

export default router;
