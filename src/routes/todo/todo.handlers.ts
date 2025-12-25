import type { AppRouteHandler } from "@/lib/types.js";
import type { AllTodo } from "./todo.route.js";

export const allTodo: AppRouteHandler<AllTodo> = async (c) => {
	// try{
	return c.json(
		{
			ok: true,
			data: [
				{
					title: "hellllo",
					description: "heeelo",
				},
			],
		},
		200,
	);
	// }catch(error){
	//   env.NODE_ENV === "development" ? console.log(error) : "";
	// return c.json(
	// 	{
	// 		ok: false,
	// 		message: "Internal server error",
	// 	},
	// 	500
	// );
	// }
};
