import { defineConfig } from "vitest/config";
import integration from "@bowser/testing/vitest-config-integration-base";
import { merge } from "lodash";

export default merge(defineConfig({}), integration);
