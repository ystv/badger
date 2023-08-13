import { AuthProvider, InvalidCredentials, User } from "@/lib/auth/types";

export const DummyTestAuth: AuthProvider = {
  async checkCredentials(username: string, password: string): Promise<User> {
    if (username === "test" && password === "test") {
      return {
        id: "test",
        first_name: "Test",
        last_name: "User",
        server_name: "test",
        its_name: "test",
        email: "test@ystv.co.uk",
        groups: ["test"],
      };
    }
    throw new InvalidCredentials();
  },
};
