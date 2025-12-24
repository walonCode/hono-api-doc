import { OpenAPIHono } from "@hono/zod-openapi";
import pinologger from "@/middlewares/pinoLogger.js";
import serveEmojiFavicon from "@/middlewares/server-favicon.js";
import type { AppBindings } from "./types.js";

export default function createApp() {
	const app = new OpenAPIHono<AppBindings>({ strict:false }).basePath("/api/v1");
	//middleware
	app.use(pinologger());
	app.use(serveEmojiFavicon("🖥"));

	return app;
}
