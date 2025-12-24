import { createRouter } from "@/lib/create-app.js";
import * as handler from "./auth.handler.js";
import * as route from "./auth.route.js";

const router = createRouter()
	.basePath("/auth")
	.openapi(route.login, handler.login)
	.openapi(route.signup, handler.signup);

export default router;
