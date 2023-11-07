import {
  AuthProvider,
  BasicUserInfo,
  InvalidCredentials,
} from "@/lib/auth/types";

export const DummyTestAuth: AuthProvider = {
  async checkCredentials(
    username: string,
    password: string,
  ): Promise<BasicUserInfo> {
    if (username === "test" && password === "test") {
      return {
        id: "test",
        name: "Dummy Test User",
        email: "test@example.com",
        domain: "example.com",
      };
    }
    throw new InvalidCredentials();
  },
  id: "dummyTestAuth",
};
