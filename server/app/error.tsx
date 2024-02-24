"use client"; // Error components must be Client Components

import { Forbidden, Unauthorized } from "@/lib/auth/errors";
import Link from "next/link";
import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";
import Button from "@badger/components/button";
import { DEV_promoteSelf } from "./actions";

function AuthError(props: { error: Unauthorized | Forbidden }) {
  return (
    <div>
      <h2 className="text-xl font-bold">{props.error.name}</h2>
      <p className="my-4">{props.error.message}</p>
      <p>
        <Link href="/" className="underline">
          Return to Badger
        </Link>
      </p>
      {(process.env.NODE_ENV === "development" ||
        process.env.E2E_TEST === "true") && (
        <Button onClick={() => DEV_promoteSelf()}>
          Development only: promote yourself to SUDO
        </Button>
      )}
    </div>
  );
}

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (!(error instanceof Unauthorized || error instanceof Forbidden)) {
      Sentry.captureException(error);
    }
  }, [error]);

  if (
    error.message.startsWith(Unauthorized.name) ||
    error.message.startsWith(Forbidden.name)
  ) {
    return <AuthError error={error} />;
  }

  return (
    <div>
      <h2>Something went wrong!</h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  );
}
