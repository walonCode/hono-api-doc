import { createRoute, z } from "@hono/zod-openapi";

export const allTodos = createRoute({
	path: "/",
	method: "get",
	tags: ["Todo"],
	responses: {
		200: {
			content: {
				"application/json": {
					schema: z.object({
						ok: z.boolean(),
						data: z.array(
							z.object({
								title: z.string(),
								description: z.string(),
							}),
						),
					}),
				},
			},
			description: "List all todos",
		},
	},
});

export type AllTodo = typeof allTodos;
