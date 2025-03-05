import { OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { Task } from "../types";

export class TaskList extends OpenAPIRoute {
  schema = {
    tags: ["Tasks"],
    summary: "List Tasks",
    request: {
      query: z.object({
        page: z.number().default(0).describe("Page number"), // ✅ `Num()` replaced with `z.number()`
        isCompleted: z.boolean().optional().describe("Filter by completed flag"), // ✅ `Bool()` replaced with `z.boolean()`
      }),
    },
    responses: {
      "200": {
        description: "Returns a list of tasks",
        content: {
          "application/json": {
            schema: z.object({
              success: z.boolean(),
              tasks: Task.array(),
            }),
          },
        },
      },
    },
  };

  async handle(c) {
    try {
      // ✅ JavaScript-friendly validation
      const data = await this.getValidatedData();
      const { page, isCompleted } = data.query;

      // ✅ Simulated Task List (Replace with actual database query)
      const tasks = [
        {
          name: "Clean my room",
          slug: "clean-room",
          description: null,
          completed: false,
          due_date: "2025-01-05",
        },
        {
          name: "Build something awesome with Cloudflare Workers",
          slug: "cloudflare-workers",
          description: "Lorem Ipsum",
          completed: true,
          due_date: "2022-12-24",
        },
      ];

      // ✅ Return response in correct JSON format
      return new Response(
        JSON.stringify({
          success: true,
          tasks,
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    } catch (error) {
      return new Response(
        JSON.stringify({ success: false, error: "Internal Server Error" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  }
}
