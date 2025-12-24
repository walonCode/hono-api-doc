import { createRoute, z } from "node_modules/@hono/zod-openapi/dist/index.cjs";

export const login = createRoute({
	path: "/login",
	method: "post",
	tags: ["Auth"],

	requestBody: {
		required: true,
		content: {
			"application/json": {
				schema: z.object({
					username: z.string().min(1),
					password: z.string().min(8),
				}),
			},
		},
	},

	responses: {
		200: {
			description: "Successful login",
			content: {
				"application/json": {
					schema: z.object({
						ok: z.boolean(),
						message: z.string(),
						token: z.string(),
					}),
				},
			},
		},

		403: {
			description: "User not found",
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

	requestBody: {
		required: true,
		content: {
			"application/json": {
				schema: z.object({
					username: z.string().min(1),
					password: z.string().min(8),
					email: z.email(),
				}),
			},
		},
	},

	responses: {
		201: {
			description: "Successful signup",
			content: {
				"application/json": {
					schema: z.object({
						ok: z.boolean(),
						message: z.string(),
						// token: z.string(),
					}),
				},
			},
		},

		404: {
			description: "User already exist",
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
