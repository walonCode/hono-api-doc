import createApp from "@/lib/create-app.js";
import onError from "@/middlewares/onError.js";

const app = createApp();

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
