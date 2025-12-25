import { OpenAPIHono } from "@hono/zod-openapi";
import onError from "@/middlewares/onError.js";
import pinologger from "@/middlewares/pinoLogger.js";
import serveEmojiFavicon from "@/middlewares/server-favicon.js";
import defaultHook from "./default-hook.js";
import type { AppBindings } from "./types.js";

//use to create the routes and controllers
export function createRouter() {
	return new OpenAPIHono<AppBindings>({ strict: false });
}

//main app
export default function createApp() {
	const app = new OpenAPIHono<AppBindings>({
		strict: false,
		defaultHook,
	}).basePath("/api/v1");

	//middleware
	app.use(pinologger());
	app.use(serveEmojiFavicon("🖥"));

	//not found setup
	app.notFound((c) => {
		return c.json(
			{
				ok: false,
				message: `${c.req.url} Not Found`,
			},
			404,
		);
	});

	//onError
	app.onError(onError);

	return app;
}
