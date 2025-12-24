import { Scalar } from "@scalar/hono-api-reference";
import packageJSON from "../../package.json" with { type: "json" };
import type { AppOpenAPi } from "./types.js";

export default function configureOpenApi(app: AppOpenAPi) {
	app.doc("/doc", {
		openapi: "3.0.0",
		info: {
			version: packageJSON.version,
			title: "Todo API",
		},
	});

	app.get(
		"/reference",
		Scalar({
			url: "/api/v1/doc",
			theme: "kepler",
			pageTitle: "Todo API",
			layout: "modern",
			defaultHttpClient: {
				targetKey: "node",
				clientKey: "fetch",
			},
		}),
	);
}
