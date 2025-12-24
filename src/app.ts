import createApp from "@/lib/create-app.js";
import auth from "@/routes/auth/auth.index.js";
import index from "@/routes/index.route.js";
import todo from "@/routes/todo/todo.index.js";
import configureOpenApi from "./lib/configure-openapi-app.js";

const app = createApp();

const routes = [index, todo, auth];

configureOpenApi(app);

routes.forEach((route) => {
	app.route("/", route);
});

export default app;
