import { z } from "zod";

export const goalSchema = z.object({
  goalName: z
    .string()
    .min(3, "Goal name must be at least 3 characters")
    .max(30, "Goal name cannot exceed 100 characters"),
  catergory: z
    .string()
    .min(3, "Catergory name must be at least 3 characters")
    .max(50, "Catergory name cannot exceed 50 characters"),
  status: z.enum(["completed", "in progress", "not started", "cancelled"], {
    required_error: "Select a valid status",
  }),
  priority: z.enum(["high", "medium", "low"], {
    required_error: "Select a valid priority",
  }),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Select a date",
  }),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(100, "Description cannot exceed 100 characters")
    .optional()
    .or(z.literal("")),
});
