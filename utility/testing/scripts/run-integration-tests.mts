import * as sh from "shelljs";
import { prepare } from "./prepare-integration-tests.mjs";
import invariant from "tiny-invariant";
import * as path from "path";
import { fileURLToPath } from "url";
import { startVitest } from "vitest/node";
sh.config.fatal = true;
sh.config.verbose = true;

process.env.TEST_INTEGRATION = "true";

(async () => {
  await prepare();
  invariant(process.env.DATABASE_URL, "No DATABASE_URL set");
  const vitest = await startVitest("test", ["server", "jobrunner"], {
    root: path.resolve(fileURLToPath(import.meta.url), "..", "..", "..", ".."),
    include: ["**/*.integration.test.ts"],
    alias: {
      "@": path.resolve(
        fileURLToPath(import.meta.url),
        "..",
        "..",
        "..",
        "..",
        "server",
      ),
    },
    coverage: {
      enabled: true,
      provider: "v8",
      all: true,
      include: [
        "server/app/**",
        "server/lib/**",
        "server/components/**",
        "server/middleware.ts",
        "jobrunner/src/**",
        "utility/**",
      ],
      // Prisma client ships with broken sourcemaps, so exclude it
      // Exclude test-only code from coverage
      exclude: [
        "**/prisma/client/runtime/*",
        "**/*.test.{ts,tsx}",
        "**/*.test.integration.{ts,tsx}",
        "utility/testing/**",
      ],
    },
  });
  await vitest?.close();
})();
