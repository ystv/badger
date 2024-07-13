import * as Sentry from "@sentry/nextjs";

export async function register() {
  console.log(
    `Starting Badger Server v${
      process.env.NEXT_PUBLIC_VERSION
    } (${process.env.NEXT_PUBLIC_GIT_COMMIT?.slice(0, 7)})`,
  );
  const { logFlagState } = await import("@badger/feature-flags");
  logFlagState();

  if (process.env.NEXT_RUNTIME === "nodejs") {
    Sentry.init({
      dsn: process.env.NEXT_PUBLIC_SERVER_SENTRY_DSN,

      environment: process.env.ENVIRONMENT,

      // Adjust this value in production, or use tracesSampler for greater control
      tracesSampleRate: 1,

      // Setting this option to true will print useful information to the console while you're setting up Sentry.
      debug: false,

      release: process.env.NEXT_PUBLIC_SENTRY_RELEASE,

      integrations: [Sentry.prismaIntegration()],
    });
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    Sentry.init({
      dsn: process.env.NEXT_PUBLIC_SERVER_SENTRY_DSN,

      environment: process.env.ENVIRONMENT,

      // Adjust this value in production, or use tracesSampler for greater control
      tracesSampleRate: 1,

      // Setting this option to true will print useful information to the console while you're setting up Sentry.
      debug: false,

      release: process.env.NEXT_PUBLIC_SENTRY_RELEASE,

      // Prisma integration isn't supported on edge
    });
  }
}
