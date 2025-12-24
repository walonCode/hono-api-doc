import { OpenAPIHono } from "@hono/zod-openapi";
import { logger } from "hono/logger";
import onError from "./helper/onError.js";

const app = new OpenAPIHono();

//middleware
app.use(logger());

//not found to return a good json response
app.notFound((c) => {
  return c.json({
    "ok":false,
    "message":`${c.req.url} not found`
  }, 404)
})

//onError 
app.onError(onError)


app.get("/", (c) => {
	return c.text("Hello Hono!");
});

export default app;
