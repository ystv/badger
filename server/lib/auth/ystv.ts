import {
  AuthProvider,
  BasicUserInfo,
  InvalidCredentials,
} from "@/lib/auth/types";
import { z } from "zod";

const YSTVUserSchema = z.object({
  id: z.coerce.string(),
  first_name: z.string(),
  last_name: z.string(),
  server_name: z.string().optional().nullable(),
  its_name: z.string().optional().nullable(),
  email: z.string().email(),
  groups: z.array(z.string()),
});

export const YSTVAuth: AuthProvider = {
  async checkCredentials(
    username: string,
    password: string,
  ): Promise<BasicUserInfo> {
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
    return {
      ...YSTVUserSchema.parse(data),
      name: `${data.first_name} ${data.last_name}`,
      domain: data.server_name ? "ystv.co.uk" : "york.ac.uk",
    };
  },
  id: "ystv",
};
