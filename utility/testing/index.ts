import { describe as describeVitest } from "vitest";

const realDescribe = typeof jest === "undefined" ? describeVitest : describe;

export const integrate =
  process.env.TEST_INTEGRATION === "true" ? realDescribe : realDescribe.skip;
