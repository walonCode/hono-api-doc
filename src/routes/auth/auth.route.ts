import { createRoute, z } from "@hono/zod-openapi";

export const login = createRoute({
	path: "/login",
	method: "post",
	tags: ["Auth"],

	request: {
		body: {
			content: {
				"application/json": {
					schema: z.object({
						username: z.string().min(1),
						password: z.string().min(8),
					}),
				},
			},
			required:true,
		},
	},

	responses: {
		200: {
			description: "Successful login",
			content: {
				"application/json": {
					schema: z.object({
						ok: z.boolean(),
						message: z.string().min(1),
						accessToken: z.string().min(1),
					}),
				},
			},
		},

		401: {
			description: "Invalid email or password",
			content: {
				"application/json": {
					schema: z.object({
						ok: z.boolean(),
						message: z.string(),
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
						message: z.string(),
					}),
				},
			},
		},
	},
});

export type LoginRoute = typeof login;

export const signup = createRoute({
	path: "/signup",
	method: "post",
	tags: ["Auth"],

	request: {
		body: {
			content: {
				"application/json": {
					schema: z.object({
						username: z.string().min(1),
						password: z.string().min(8),
						email: z.email(),
					}),
				},
			},
			required:true,
		},
	},

	responses: {
		201: {
			description: "Successful signup",
			content: {
				"application/json": {
					schema: z.object({
						ok: z.boolean(),
						message: z.string().min(1),
						accessToken: z.string().min(1),
					}),
				},
			},
		},

		409: {
			description: "User with that email or password already exists",
			content: {
				"application/json": {
					schema: z.object({
						ok: z.boolean(),
						message: z.string(),
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
						message: z.string(),
					}),
				},
			},
		},
	},
});

export type SignupRoute = typeof signup;
