import { z } from "zod";

export const projectSchema = z.object({
  projectName: z.string().min(3, "Project name must be at least 3 characters").max(50, "Project name cannot exceed 50 characters"),
  type: z.enum(["web", "mobile", "console", "desktop"], {
    required_error: "Select a valid project type"
  }),
  status: z.string().min(1, "Status is required"), // If statuses are predefined, use z.enum([...])
  mainStack: z.array(z.string()).min(1, "At least one stack is required").max(3, "You can only select up to 3 stacks"),
  budget: z.number().min(1, "Budget must be at least $1").optional(),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), { message: "Invalid date format" }),
});
