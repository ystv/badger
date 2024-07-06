import { defineConfig, devices } from "@playwright/test";
import * as df from "dotenv-flow";
import * as fs from "fs";

// We override process.env because it can throw in wacky values, in particular for HOSTNAME.
const serverEnv = df.load(
  df
    .listDotenvFiles(__dirname, { node_env: "test" })
    .filter((f) => fs.existsSync(f)),
  {
    silent: true,
  },
);

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./e2e",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Don't run tests in parallel - resetDB isn't safe */
  workers: 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: "http://localhost:3000",

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",

    locale: "en-GB",
    timezoneId: "Europe/London",
  },

  expect: {
    // Raise the expect timeout on dev - sometimes the page is just
    // taking a while to compile
    timeout: process.env.CI ? 15_000 : 60_000,
  },
  timeout: process.env.CI ? 30_000 : 60_000,

  /* Configure projects for major browsers */
  projects: [
    { name: "setup", testMatch: /.*\.setup\.ts/ },

    {
      name: "microserver",
      testDir: "./microserver",
      testMatch: /.*\.spec\.ts/,
      dependencies: ["setup"],
      use: {
        ...devices["Desktop Chrome"],
        storageState: "playwright/.auth/user.json",
      },
    },

    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        storageState: "playwright/.auth/user.json",
      },
      dependencies: ["setup"],
    },

    {
      name: "firefox",
      use: {
        ...devices["Desktop Firefox"],
        storageState: "playwright/.auth/user.json",
      },
      dependencies: ["setup"],
    },

    {
      name: "webkit",
      use: {
        ...devices["Desktop Safari"],
        storageState: "playwright/.auth/user.json",
      },
      dependencies: ["setup"],
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  webServer: [
    {
      command: process.env.CI ? "node server/server.js" : "yarn dev",
      cwd: process.env.CI ? ".next/standalone" : undefined,
      url: "http://localhost:3000/api/healthz",
      reuseExistingServer: !process.env.CI,
      stdout: "pipe",
      stderr: "pipe",
      env: {
        ...serverEnv.parsed!,
        NODE_ENV: "test",
        E2E_TEST: "true",
      },
    },
    {
      command: process.env.CI
        ? "node dist/index.cjs --watch --healthPort 28342"
        : "yarn dev --watch --healthPort 28342",
      cwd: "../jobrunner",
      port: 28342,
      env: serverEnv.parsed!,
      reuseExistingServer: !process.env.CI,
      stdout: "pipe",
      stderr: "pipe",
    },
    {
      command: "yarn microserver",
      port: 8594,
      reuseExistingServer: !process.env.CI,
    },
  ],
});
