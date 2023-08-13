"use server";

import { SignInSchema } from "@/app/login/schema";
import { z } from "zod";
import { FormResponse } from "@/components/Form";
import { redirect } from "next/navigation";
import { doSignIn } from "@/lib/auth";
import { InvalidCredentials } from "@/lib/auth/types";

export async function handleSignIn(
  data: z.infer<typeof SignInSchema>,
): Promise<FormResponse> {
  try {
    await doSignIn(data.username, data.password);
    if (data.return) {
      if (data.return.startsWith("/")) {
        const url = new URL(data.return, process.env.PUBLIC_URL);
        redirect(url.toString());
      }
      redirect(data.return);
    }
    return { ok: true };
  } catch (e) {
    if (e instanceof InvalidCredentials) {
      return {
        ok: false,
        errors: {
          root: "Incorrect username or password",
        },
      };
    }
    throw e;
  }
}
