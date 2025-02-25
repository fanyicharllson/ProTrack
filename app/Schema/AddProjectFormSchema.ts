import { z } from "zod";

export const projectSchema = z.object({
  projectName: z
    .string()
    .min(3, "Project name must be at least 3 characters")
    .max(50, "Project name cannot exceed 50 characters"),
  type: z.enum(["web", "mobile", "console", "desktop"], {
    required_error: "Select a valid project type",
  }),
  status: z.enum(["completed", "cancelled", "ongoing", "pending"], {
    required_error: "Select a valid status",
  }),
  mainStack: z
    .array(z.string())
    .min(1, "At least one stack is required")
    .max(3, "You can only select up to 3 stacks"),
  budget: z
    .union([
      z.string().min(1, "Budget must be at least $1"),
      z.literal(""), // Allow empty string
    ])
    .optional(),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Select a date",
  }),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(100, "Description cannot exceed 100 characters")
    .optional()
    .or(z.literal("")),
  projectUrl: z.string().url("Invalid URL format").optional().or(z.literal("")),
});
