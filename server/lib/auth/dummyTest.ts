import {
  AuthProvider,
  BasicUserInfo,
  InvalidCredentials,
} from "@/lib/auth/types";

export const DUMMY_TEST_USER_ID = "test";

export const DummyTestAuth: AuthProvider = {
  async checkCredentials(
    username: string,
    password: string,
  ): Promise<BasicUserInfo> {
    if (username === "test" && password === "test") {
      return {
        id: DUMMY_TEST_USER_ID,
        name: "Dummy Test User",
        email: "test@example.com",
        domain: "example.com",
      };
    }
    throw new InvalidCredentials();
  },
  id: "dummyTestAuth",
};
