import { OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { Task } from "../types";

export class TaskDelete extends OpenAPIRoute {
  schema = {
    tags: ["Tasks"],
    summary: "Delete a Task",
    request: {
      params: z.object({
        taskSlug: z.string().describe("Task slug"),
      }),
    },
    responses: {
      "200": {
        description: "Returns if the task was deleted successfully",
        content: {
          "application/json": {
            schema: z.object({
              series: z.object({
                success: z.boolean(), 
                result: z.object({
                  task: Task,
                }),
              }),
            }),
          },
        },
      },
    },
  };

  async handle(c) {
    const data = await this.getValidatedData();
    const { taskSlug } = data.params;
    return {
      result: {
        task: {
          name: "Build something awesome with Cloudflare Workers",
          slug: taskSlug,
          description: "Lorem Ipsum",
          completed: true,
          due_date: "2022-12-24",
        },
      },
      success: true,
    };
  }
}
