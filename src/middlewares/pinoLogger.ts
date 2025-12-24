import { pinoLogger } from "hono-pino";
import { pino } from "pino";
import pretty from "pino-pretty";
import { env } from "../config/env.js";

export default function pinologger() {
	return pinoLogger({
		pino: pino(env.NODE_ENV === "development" ? pretty() : undefined),
		http: {
			reqId: () => crypto.randomUUID(),
		},
	});
}
