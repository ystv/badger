import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["**/*.integration.{test,spec}.?(c|m)[jt]s?(x)"],
    exclude: ["e2e/**/*", "node_modules/**/*"],
    coverage: {
      enabled: true,
      provider: "v8",
      all: true,
      include: ["src/**", "utility/**"],
      // Prisma client ships with broken sourcemaps, so exclude it
      exclude: [
        "**/prisma/client/runtime/*",
        "**/*.test.{ts,tsx}",
        "**/*.test.integration.{ts,tsx}",
        "utility/testing/**",
      ],
    },
  },
});
