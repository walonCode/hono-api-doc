import { testClient } from "hono/testing";
import { describe, it, expect } from "vitest";
import createApp from "@/lib/create-app.js";
import router from "@/routes/todo/todo.index.js";

describe("List all todo Route", () => {
  it("responds 401 without auth", async () => {
    const client = testClient(createApp().route('/', router))

    expect(res.status).toBe(401);
    const body = await res.json();
    expect(body).toHaveProperty("ok", false);
  });
});