import {
  AuthProvider,
  InvalidCredentials,
  User,
  UserSchema,
} from "@/lib/auth/types";

export const YSTVAuth: AuthProvider = {
  async checkCredentials(username: string, password: string): Promise<User> {
    const url = `https://sso.ystv.co.uk/REST.php?api-version=latest&api-name=usermanagement&resource-name=checkcredentials`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(
          process.env.YSTV_SSO_USERNAME + ":" + process.env.YSTV_SSO_PASSWORD,
        ).toString("base64")}`,
      },
      body: new URLSearchParams({
        username,
        password,
      }),
    });
    if (res.status === 401) {
      console.log(await res.text());
      throw new InvalidCredentials();
    }
    if (res.status !== 200) {
      console.warn("Unexpected response from SSO", await res.text());
      throw new Error("Unexpected response from SSO");
    }
    const data = await res.json();
    return UserSchema.parse(data);
  },
};
