import { defineConfig } from "vitest/config";
import base from "./vitest.config";
import { merge } from "lodash";

export default merge(
  base,
  defineConfig({
    test: {
      environment: "node",
      include: ["**/*.integration.{test,spec}.?(c|m)[jt]s?(x)"],
      exclude: ["e2e/**/*"],
    },
  }),
);
