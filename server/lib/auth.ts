import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { z } from "zod";
import { redirect } from "next/navigation";

const UserSchema = z.object({
  id: z.coerce.string(),
  first_name: z.string(),
  last_name: z.string(),
  server_name: z.string(),
  its_name: z.string(),
  email: z.string().email(),
  groups: z.array(z.string()),
});

export const {
  handlers: { GET, POST },
  auth,
  CSRF_experimental,
} = NextAuth({
  secret: process.env.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "YSTV Login",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "charlie.jeffery",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(rawCredentials) {
        const credentials = z
          .object({
            username: z.string(),
            password: z.string(),
          })
          .parse(rawCredentials);
        const url = `https://sso.ystv.co.uk/REST.php?api-version=latest&api-name=usermanagement&resource-name=checkcredentials&api-username=${process.env.YSTV_SSO_USERNAME}&api-password=${process.env.YSTV_SSO_PASSWORD}`;
        const payload = new FormData();
        payload.append("username", credentials.username);
        payload.append("password", credentials.password);
        const res = await fetch(url, {
          method: "POST",
          body: payload,
        });
        if (res.status !== 200) {
          console.log(await res.text());
          return null;
        }
        return UserSchema.parse(await res.json());
      },
    }),
  ],
});

export async function requireAuth() {
  const session = await auth();
  if (!session) {
    redirect("/auth/signIn");
  }
  return session;
}
