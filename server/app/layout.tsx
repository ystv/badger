import type { Metadata } from "next";
import "./globals.css";
import { DebugModeProvider } from "@/components/DebugMode";
import { cookies } from "next/headers";
import * as flags from "@bowser/feature-flags";

import { DEBUG_MODE_COOKIE } from "@/app/enableDebugMode/constants";
import { checkSession } from "@/lib/auth";
import { UserProvider } from "@/components/CurrentUser";
import Script from "next/script";
import { FeatureFlagsProvider } from "@/components/FeatureFlags";

export const metadata: Metadata = {
  title: "Bowser",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Set up the user provider (and also ensure client-side Sentry knows the user, through UserProvider.)
  // NB: we *don't* use auth(), because that'll try to redirect to /login causing a loop
  const user = await checkSession();
  return (
    <html lang="en">
      <head>
        {/* eslint-disable-next-line @next/next/no-before-interactive-script-outside-document */}
        <Script
          // https://github.com/vercel/next.js/issues/56484
          // strategy="beforeInteractive"
          id="sentry-env"
          dangerouslySetInnerHTML={{
            __html: `window.ENVIRONMENT = ${JSON.stringify(
              process.env.ENVIRONMENT,
            )};`,
          }}
        />
      </head>
      <body>
        <DebugModeProvider
          value={cookies().get(DEBUG_MODE_COOKIE)?.value === "true"}
        >
          <FeatureFlagsProvider
            value={
              Object.fromEntries(
                Object.entries(flags).filter(
                  ([k, v]) => typeof v === "boolean",
                ),
              ) as Record<string, boolean>
            }
          >
            <UserProvider value={user}>
              <main className="max-w-3xl mx-auto">{children}</main>
              <footer className="max-w-3xl mx-auto text-sm text-mid-dark mt-2">
                This is Bowser {process.env.NEXT_PUBLIC_VERSION} (code version{" "}
                <code>{process.env.NEXT_PUBLIC_GIT_COMMIT?.slice(0, 7)})</code>.
              </footer>
            </UserProvider>
          </FeatureFlagsProvider>
        </DebugModeProvider>
      </body>
    </html>
  );
}
