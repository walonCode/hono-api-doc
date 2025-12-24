import { pgTable, uuid, text, timestamp, index, boolean } from "drizzle-orm/pg-core";


export const userTable = pgTable("users", {
  id: uuid("id").notNull().primaryKey().defaultRandom(),
  username:text("username").notNull(),
  email: text("email").notNull(),
  pasword:text("password").notNull(),
  createdAt:timestamp("created_at").defaultNow().notNull(),
  updatedAt:timestamp("updated_at").defaultNow().notNull(),
}, (i) => [
  index("user_id_index").on(i.id),
  index("user_username_index").on(i.username),
]);

export const todoTable = pgTable("todos", {
  id:uuid("id").notNull().primaryKey().defaultRandom(),
  title: text("title").notNull(),
  userId:uuid("user_id").notNull().references(() => userTable.id, { onDelete: "cascade"}),
  isCompleted: boolean("isCompleted").notNull().default(false),
  createdAt:timestamp("created_at").defaultNow().notNull(),
  updatedAt:timestamp("updated_at").defaultNow().notNull(),
}, (i) => [
  index("todo_id_index").on(i.id),
  index("todo_userId_index").on(i.userId),
  index("todo_id_title").on(i.title)
])

export type Todo = typeof todoTable.$inferSelect
export type NewTodo = typeof todoTable.$inferInsert