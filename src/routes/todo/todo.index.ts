import { createRouter } from "@/lib/create-app.js";
import * as handler from "./todo.handlers.js";
import * as route from "./todo.route.js";

const router = createRouter()
  .basePath("/todo")
  .openapi(route.allTodos, handler.allTodo);

export default router;
