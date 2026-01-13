import { createRouter } from "@/lib/create-app.js";
import { authMiddleware } from "@/middlewares/authMiddleware.js";
import { rateLimitByUser } from "@/middlewares/ratelimitMiddleware.js";
import * as handler from "./todo.handlers.js";
import * as route from "./todo.route.js";

const router = createRouter().basePath("/todo");

// router.use(authMiddleware);
// router.use(
// 	rateLimitByUser({
// 		limit: 10,
// 		windowMs: 2,
// 	}),
// );

router
	.openapi(route.allTodos, handler.allTodo)
	.openapi(route.createTodo, handler.createTodo)
	.openapi(route.getOneTodo, handler.getOneTodo)
	.openapi(route.updateTodo, handler.updateTodo)
	.openapi(route.deleteTodo, handler.deleteTodo);

export default router;
