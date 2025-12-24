import type { OpenAPIHono } from "@hono/zod-openapi";
import type { PinoLogger } from "hono-pino";
import type {
	RouteConfig,
	RouteHandler,
} from "node_modules/@hono/zod-openapi/dist/index.cjs";

export interface AppBindings {
	Variables: {
		logger: PinoLogger;
	};
}

export type AppOpenAPi = OpenAPIHono<AppBindings>;

export type AppRouteHandler<R extends RouteConfig> = RouteHandler<
	R,
	AppBindings
>;
