import bcrypt from "bcryptjs";
import { and, eq } from "drizzle-orm";
import * as jwt from "hono/jwt";
import { env } from "@/config/env.js";
import { db } from "@/db/index.js";
import { userTable } from "@/db/schema.js";
import type { AppRouteHandler } from "@/lib/types.js";
import type { LoginRoute, SignupRoute } from "./auth.route.js";

const TIME_EXP = Math.floor(Date.now() / 1000) + 24 * 60 * 60 * 1;

export const login: AppRouteHandler<LoginRoute> = async (c) => {
	try {
		const { username, password } = c.req.valid("json");

		//checkign to see if the user exist
		const [userExists] = await db
			.select()
			.from(userTable)
			.where(eq(userTable.username, username))
			.limit(1)
			.execute();

		//checkng to see it the password match
		const passwordMatch = await bcrypt.compare(password, userExists.password);

		if (!userExists || !passwordMatch) {
			return c.json(
				{
					ok: false,
					message: "Invalid username or password",
				},
				401,
			);
		}

		//creating the token
		const token = await jwt.sign(
			{ id: userExists.id, exp: TIME_EXP },
			env.JWT_SECRET,
		);

		//success login result
		return c.json(
			{
				ok: true,
				message: "user login",
				accessToken: token,
			},
			200,
		);
	} catch (error) {
		env.NODE_ENV === "development"
			? c.var.logger.error(`Error from the login route ${error}`)
			: "";
		return c.json(
			{
				ok: false,
				message: "Internal server error",
			},
			500,
		);
	}
};

export const signup: AppRouteHandler<SignupRoute> = async (c) => {
	try {
		const { username, password, email } = c.req.valid("json");

		//checking if the user already exist
		const userExists = (
			await db
				.select()
				.from(userTable)
				.where(
					and(eq(userTable.email, email), eq(userTable.username, username)),
				)
				.limit(1)
				.execute()
		)[0];

		if (userExists) {
			return c.json(
				{
					ok: false,
					message: "User with that email or username already exists",
				},
				409,
			);
		}

		//password hashed
		const passwordHashed = await bcrypt.hash(password, 10);

		//creating the user
		const [newUser] = await db
			.insert(userTable)
			.values({
				username,
				password: passwordHashed,
				email,
			})
			.returning()
			.execute();

		const token = await jwt.sign(
			{ id: newUser.id, exp: TIME_EXP },
			env.JWT_SECRET,
		);

		//returning the 201 success
		return c.json(
			{
				ok: true,
				message: "user signup successfull",
				accessToken: token,
			},
			201,
		);
	} catch (error) {
		env.NODE_ENV === "development"
			? c.var.logger.error(`Error from the signup route: ${error}`)
			: "";
		return c.json(
			{
				ok: false,
				message: "Internal server error",
			},
			500,
		);
	}
};
