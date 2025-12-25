import { and, eq } from "drizzle-orm";
import { env } from "@/config/env.js";
import { db } from "@/db/index.js";
import { todoTable, userTable } from "@/db/schema.js";
import type { AppRouteHandler } from "@/lib/types.js";
import type {
	AllTodo,
	CreateTodo,
	DeleteTodo,
	GetOneTodo,
	UpdateTodo,
} from "./todo.route.js";

export const allTodo: AppRouteHandler<AllTodo> = async (c) => {
	try {
		const id = c.get("user")?.id;

		//getting all the todo with user_id
		const todos = await db
			.select()
			.from(todoTable)
			.where(eq(todoTable.userId, id as string))
			.execute();

		if (todos.length === 0) {
			return c.json(
				{
					ok: false,
					message: "No todos at yet",
					data: [],
				},
				200,
			);
		}

		return c.json(
			{
				ok: true,
				message: "List all user todos",
				data: todos,
			},
			200,
		);
	} catch (error) {
		env.NODE_ENV === "development"
			? c.var.logger.error(`Error from the Get all todo route ${error}`)
			: "";
		return c.json(
			{
				ok: false,
				error: "Internal server error",
			},
			500,
		);
	}
};

export const createTodo: AppRouteHandler<CreateTodo> = async (c) => {
	try {
		const { title } = c.req.valid("json");
		const id = c.get("user")?.id;

		const [user] = await db
			.select()
			.from(userTable)
			.where(eq(userTable.id, id as string))
			.limit(1)
			.execute();
		if (!user) {
			return c.json(
				{
					ok: false,
					error: "User is not authenticated",
				},
				401,
			);
		}

		const [newTodo] = await db
			.insert(todoTable)
			.values({
				title,
				userId: id as string,
			})
			.returning()
			.execute();

		return c.json(
			{
				ok: true,
				message: "User created todo successfully",
				data: newTodo,
			},
			201,
		);
	} catch (error) {
		env.NODE_ENV === "development"
			? c.var.logger.error(`Error from the create todo route ${error}`)
			: "";
		return c.json(
			{
				ok: false,
				error: "Internal server error",
			},
			500,
		);
	}
};

export const getOneTodo: AppRouteHandler<GetOneTodo> = async (c) => {
	try {
		const id = c.req.valid("param").id;
		const userId = c.get("user")?.id;

		const [todo] = await db
			.select()
			.from(todoTable)
			.where(and(eq(todoTable.id, id), eq(todoTable.userId, userId as string)))
			.limit(1)
			.execute();

		if (!todo) {
			return c.json(
				{
					ok: false,
					error: "Todo not found",
				},
				404,
			);
		}

		return c.json(
			{
				ok: true,
				message: "Todo Details",
				data: todo,
			},
			200,
		);
	} catch (error) {
		env.NODE_ENV === "development"
			? c.var.logger.error(`Error from the create todo route ${error}`)
			: "";
		return c.json(
			{
				ok: false,
				error: "Internal server error",
			},
			500,
		);
	}
};

export const updateTodo: AppRouteHandler<UpdateTodo> = async (c) => {
	try {
		const id = c.req.valid("param").id;
		const userId = c.get("user")?.id;
		const { title, isCompleted } = c.req.valid("json");

		const [todoExist] = await db
			.select()
			.from(todoTable)
			.where(and(eq(todoTable.id, id), eq(todoTable.userId, userId as string)))
			.limit(1)
			.execute();

		if (!todoExist) {
			return c.json(
				{
					ok: false,
					error: "Todo not found",
				},
				404,
			);
		}

		let updateTodo;
		if (title) {
			updateTodo = await db
				.update(todoTable)
				.set({
					title: title,
				})
				.where(eq(todoTable.id, id))
				.returning()
				.execute();
		} else {
			updateTodo = await db
				.update(todoTable)
				.set({
					isCompleted: isCompleted,
				})
				.where(eq(todoTable.id, id))
				.returning()
				.execute();
		}

		return c.json(
			{
				ok: false,
				message: "User updated the todo",
				data: updateTodo,
			},
			200,
		);
	} catch (error) {
		env.NODE_ENV === "development"
			? c.var.logger.error(`Error from the create todo route ${error}`)
			: "";
		return c.json(
			{
				ok: false,
				error: "Internal server error",
			},
			500,
		);
	}
};

export const deleteTodo: AppRouteHandler<DeleteTodo> = async (c) => {
	try {
		const id = c.req.valid("param").id;
		const userId = c.get("user")?.id;

		const [todoExist] = await db
			.select()
			.from(todoTable)
			.where(and(eq(todoTable.id, id), eq(todoTable.userId, userId as string)))
			.limit(1)
			.execute();

		if (!todoExist) {
			return c.json(
				{
					ok: false,
					error: "Todo not found",
				},
				404,
			);
		}

		await db
			.delete(todoTable)
			.where(and(eq(todoTable.id, id), eq(todoTable.userId, userId as string)))
			.execute();

		return c.json(
			{
				ok: false,
				message: "User deleted todo",
			},
			200,
		);
	} catch (error) {
		env.NODE_ENV === "development"
			? c.var.logger.error(`Error from the create todo route ${error}`)
			: "";
		return c.json(
			{
				ok: false,
				error: "Internal server error",
			},
			500,
		);
	}
};
