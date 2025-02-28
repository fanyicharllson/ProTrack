import { z } from "zod";

export const HelpSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  subject: z.enum(["general", "bug", "feature", "account"], {
    required_error: "Please select a subject.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }).max(100, {
    message: "Message cannot email more than 100 characters"
  }),
});
