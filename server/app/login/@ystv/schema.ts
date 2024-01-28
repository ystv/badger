import { z } from "zod";

export const SignInSchema = z.object({
  username: z.string(),
  password: z.string().min(4).max(100),
  return: z.string().optional(),
});
