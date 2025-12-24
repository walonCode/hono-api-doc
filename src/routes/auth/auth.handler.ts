import { env } from "@/config/env.js";
import type { AppRouteHandler } from "@/lib/types.js";
import type { LoginRoute, SignupRoute } from "./auth.route.js";

export const login: AppRouteHandler<LoginRoute> = async (c) => {
	try {
		const { username, password } = await c.req.json();
		if (!username || !password)
			return c.json(
				{
					ok: false,
					message: "invalid user",
				},
				404,
			);

		return c.json(
			{
				ok: true,
				message: "user login",
				token: "yppppppp",
			},
			200,
		);
	} catch (error) {
		env.NODE_ENV === "development" ? console.log(error) : "";
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
		const { username, password, email } = await c.req.json();
		if (!username || !password || !email)
			return c.json(
				{
					ok: false,
					message: "invalid user",
				},
				404,
			);

		return c.json(
			{
				ok: true,
				message: "user signup successfull",
				// token: "yppppppp",
			},
			201,
		);
	} catch (error) {
		env.NODE_ENV === "development" ? console.log(error) : "";
		return c.json(
			{
				ok: false,
				message: "Internal server error",
			},
			500,
		);
	}
};
