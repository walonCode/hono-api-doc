import { createRoute, z } from "@hono/zod-openapi";

export const allTodos = createRoute({
	path: "/",
	method: "get",
	tags: ["Todo"],
	security: [
		{
			bearerAuth: [],
		},
	],
	responses: {
		200: {
			content: {
				"application/json": {
					schema: z.object({
						ok: z.boolean(),
						message: z.string().min(1),
						data: z.array(z.object()) || [],
					}),
				},
			},
			description: "List all user todos",
		},
		500: {
			content: {
				"application/json": {
					schema: z.object({
						ok: z.boolean(),
						error: z.string().min(1),
					}),
				},
			},
			description: "Internal server error",
		},
	},
});

export type AllTodo = typeof allTodos;

export const createTodo = createRoute({
	path: "/",
	method: "post",
	tags: ["Todo"],
	security: [
		{
			bearerAuth: [],
		},
	],
	request: {
		body: {
			content: {
				"application/json": {
					schema: z.object({
						title: z.string().min(1),
					}),
				},
			},
			required: true,
		},
	},
	responses: {
		201: {
			description: "User creates a todo",
			content: {
				"application/json": {
					schema: z.object({
						ok: z.boolean(),
						message: z.string().min(1),
						data: z.object({}),
					}),
				},
			},
		},
		401: {
			description: "User not authenticated",
			content: {
				"application/json": {
					schema: z.object({
						ok: z.boolean(),
						error: z.string().min(1),
					}),
				},
			},
		},
		500: {
			description: "Internal server error",
			content: {
				"application/json": {
					schema: z.object({
						ok: z.boolean(),
						error: z.string().min(1),
					}),
				},
			},
		},
	},
});

export type CreateTodo = typeof createTodo;

export const getOneTodo = createRoute({
	method: "get",
	path: "/{id}",
	tags: ["Todo"],
	security: [
		{
			bearerAuth: [],
		},
	],
	request: {
		params: z.object({
			id: z
				.string()
				.min(3)
				.openapi({
					param: {
						name: "id",
						in: "path",
					},
				}),
		}),
	},
	responses: {
		200: {
			description: "User get one todo",
			content: {
				"application/json": {
					schema: z.object({
						ok: z.boolean(),
						message: z.string().min(1),
						data: z.object({}),
					}),
				},
			},
		},
		404: {
			description: "Todo not found",
			content: {
				"application/json": {
					schema: z.object({
						ok: z.boolean(),
						error: z.string().min(1),
					}),
				},
			},
		},
		500: {
			description: "Internal server error",
			content: {
				"application/json": {
					schema: z.object({
						ok: z.boolean(),
						error: z.string().min(1),
					}),
				},
			},
		},
	},
});

export type GetOneTodo = typeof getOneTodo;

export const updateTodo = createRoute({
	path: "/{id}",
	method: "patch",
	tags: ["Todo"],
	security: [
		{
			bearerAuth: [],
		},
	],
	request: {
		params: z.object({
			id: z
				.string()
				.min(3)
				.openapi({
					param: {
						name: "id",
						in: "path",
					},
				}),
		}),
		body: {
			required: true,
			content: {
				"application/json": {
					schema: z.object({
						title: z.string().optional(),
						isCompleted: z.boolean().optional(),
					}),
				},
			},
		},
	},
	responses: {
		200: {
			description: "User updated the todo",
			content: {
				"application/json": {
					schema: z.object({
						ok: z.boolean(),
						message: z.string().min(1),
						data: z.object({}),
					}),
				},
			},
		},
		404: {
			description: "Todo not found",
			content: {
				"application/json": {
					schema: z.object({
						ok: z.boolean(),
						error: z.string().min(1),
					}),
				},
			},
		},
		500: {
			description: "Internal server error",
			content: {
				"application/json": {
					schema: z.object({
						ok: z.boolean(),
						error: z.string().min(1),
					}),
				},
			},
		},
	},
});

export type UpdateTodo = typeof updateTodo;

export const deleteTodo = createRoute({
	method: "delete",
	path: "/{id}",
	tags: ["Todo"],
	security: [
		{
			bearerAuth: [],
		},
	],
	request: {
		params: z.object({
			id: z
				.string()
				.min(2)
				.openapi({
					param: {
						name: "id",
						in: "path",
					},
				}),
		}),
	},
	responses: {
		200: {
			description: "User deletes a todo",
			content: {
				"application/json": {
					schema: z.object({
						ok: z.boolean(),
						message: z.string().min(1),
					}),
				},
			},
		},
		404: {
			description: "Todo not found",
			content: {
				"application/json": {
					schema: z.object({
						ok: z.boolean(),
						error: z.string().min(1),
					}),
				},
			},
		},
		500: {
			description: "Internal server error",
			content: {
				"application/json": {
					schema: z.object({
						ok: z.boolean(),
						error: z.string().min(1),
					}),
				},
			},
		},
	},
});

export type DeleteTodo = typeof deleteTodo;
