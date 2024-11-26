import { defineConfig, devices } from "@playwright/test";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  // Our tests aren't concurrency-safe because they modify Server state
  // TODO[BDGR-178]: Can we up this for standalone tests?
  workers: 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
  },

  testDir: "./e2e/standalone",

  /* Configure projects for major browsers */
  projects: [
    {
      name: "renderer",
      use: {
        ...devices["Desktop Chrome"],
      },
      testDir: "./src/renderer/tests",
    },
    {
      name: "standalone",
      use: {
        ...devices["Desktop Chrome"],
      },
      testDir: "./e2e/standalone",
    },
  ],

  /* Run your local dev server before starting the tests */
  webServer: [
    {
      command: "yarn devServer",
      url: "http://localhost:5174/getState",
      reuseExistingServer: !process.env.CI,
    },
    {
      command: "yarn devRenderer",
      url: "http://localhost:5173",
      reuseExistingServer: !process.env.CI,
    },
    {
      command: "yarn microserver",
      cwd: "../server",
      url: "http://localhost:8594",
      reuseExistingServer: !process.env.CI,
    },
  ],
});
