import { z } from "zod";
export const AccountAuthScema = z.object({
  username: z
    .string()
    .min(1, "Username is required")
    .max(50, "Username must be less than 50 characters"),
  email: z.string().min(1, "Email is required").email("Invalid email"),
});
