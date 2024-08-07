"use server";

import type { SignInSchema } from "@/app/login/@local/schema";
import { z } from "zod";
import { FormResponse } from "@/components/Form";
import { redirect } from "next/navigation";
import { InvalidCredentials } from "@/lib/auth/types";
import { DummyTestAuth } from "@/lib/auth/dummyTest";
import invariant from "@/lib/invariant";
import { SignInResult, doSignIn } from "@/lib/auth";
import { useDummyTestAuth } from "@badger/feature-flags";

function determineProvider() {
  if (useDummyTestAuth) {
    invariant(
      process.env.NODE_ENV !== "production" || process.env.E2E_TEST === "true",
      "Cannot enable dummy test auth in production",
    );
    console.warn("Using dummy test auth - do *not* use this in production!");
    return DummyTestAuth;
  }
  invariant(
    false,
    "No authentication configured. Either enable Google authentication or set USE_DUMMY_TEST_AUTH=true (not in production!)",
  );
}

const provider = determineProvider();

export async function handleSignIn(
  data: z.infer<typeof SignInSchema>,
): Promise<FormResponse> {
  try {
    const creds = await provider.checkCredentials(data.username, data.password);
    const loginResult = await doSignIn(provider.id, creds);
    switch (loginResult) {
      case SignInResult.Success:
        break;
      case SignInResult.CreatedInactive:
      case SignInResult.Inactive:
        return {
          ok: false,
          errors: {
            root: "Your account is not yet active.",
          },
        };
    }
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
