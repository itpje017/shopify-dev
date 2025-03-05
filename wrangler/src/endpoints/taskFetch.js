import { OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { Task } from "../types";

export class TaskFetch extends OpenAPIRoute {
  schema = {
    tags: ["Tasks"],
    summary: "Get a single Task by slug",
    request: {
      params: z.object({
        taskSlug: z.string().describe("Task slug"), 
      }),
    },
    responses: {
      "200": {
        description: "Returns a single task if found",
        content: {
          "application/json": {
            schema: z.object({
              success: z.boolean(), 
              result: z.object({
                task: Task,
              }),
            }),
          },
        },
      },
      "404": {
        description: "Task not found",
        content: {
          "application/json": {
            schema: z.object({
              success: z.boolean(),
              error: z.string(), 
            }),
          },
        },
      },
    },
  };

  async handle(c) {
    try {
     
      const data = await this.getValidatedData();
      const { taskSlug } = data.params;

     
      const exists = true;

      if (!exists) {
        return new Response(
          JSON.stringify({ success: false, error: "Object not found" }),
          { status: 404, headers: { "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({
          success: true,
          task: {
            name: "my task",
            slug: taskSlug,
            description: "this needs to be done",
            completed: false,
            due_date: new Date().toISOString().slice(0, 10),
          },
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
