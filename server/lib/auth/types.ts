import { z } from "zod";

export const UserSchema = z.object({
  id: z.coerce.string(),
  first_name: z.string(),
  last_name: z.string(),
  server_name: z.string().optional().nullable(),
  its_name: z.string().optional().nullable(),
  email: z.string().email(),
  groups: z.array(z.string()),
});
export type User = z.infer<typeof UserSchema>;

export class InvalidCredentials extends Error {}

export interface AuthProvider {
  checkCredentials(username: string, password: string): Promise<User>;
}
