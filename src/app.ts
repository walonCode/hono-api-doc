import { OpenAPIHono } from "@hono/zod-openapi";
import type { PinoLogger } from "hono-pino";
import onError from "./middlewares/onError.js";
import pinologger from "./middlewares/pinoLogger.js";
import serveEmojiFavicon from "./middlewares/server-favicon.js";

interface AppBindings {
	Variables: {
		logger: PinoLogger;
	};
}

const app = new OpenAPIHono<AppBindings>().basePath("/api/v1");

//middleware
app.use(pinologger());
app.use(serveEmojiFavicon("🖥"));

//not found to return a good json response
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

//home route
app.get("/", (c) => {
	return c.json(
		{
			ok: true,
			message: "Hello",
		},
		200,
	);
});

//error route
app.get("/error", (c) => {
	c.status(422);
	throw new Error("ohh no ");
});

export default app;
