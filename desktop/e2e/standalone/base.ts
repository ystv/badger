/* eslint-disable no-empty-pattern */
/* eslint-disable no-console */
import {
  test as base,
  _electron as electron,
  expect,
  type ElectronApplication,
  type Page,
} from "@playwright/test";
import { tmpdir } from "node:os";
import { join } from "node:path";
import * as fsp from "node:fs/promises";

const MICRO_SERVER_PORT = process.env.MICRO_SERVER_PORT
  ? parseInt(process.env.MICRO_SERVER_PORT, 10)
  : process.env.PORT
    ? parseInt(process.env.PORT, 10)
    : 8594;
const MICRO_SERVER_PASSWORD = "microserver";

const ELECTRON = Boolean(process.env.TEST_USE_ELECTRON);

let test = base.extend<{
  scenario: string;
  enabledIntegrations: ("obs" | "ontime" | "vmix")[];
  testMediaPath: string;
}>({
  scenario: "default",
  enabledIntegrations: ["obs", "ontime", "vmix"],
  testMediaPath: async ({}, use) => {
    const dir = await fsp.mkdtemp(
      join(tmpdir(), "badger-desktop-e2e-standalone"),
    );
    await use(dir);
    await fsp.rm(dir, { recursive: true });
  },
});

if (ELECTRON) {
  test = test.extend<{ app: [ElectronApplication, Page]; page: Page }>({
    app: async ({ scenario, testMediaPath }, use, testInfo) => {
      // Allow running tests on a built / installed app
      const electronPath = process.env.TEST_APPLICATION_PATH;
      const app = await electron.launch({
        args: electronPath
          ? ["--enable-logging"]
          : ["--enable-logging", "out/main/index.js"],
        executablePath: electronPath,
        env: {
          ...process.env,
          NODE_ENV: "test",
          E2E_TEST: "true",
          __USE_MOCK_VMIX: "true",
          __TEST_SETTINGS_MEDIA: `{ "mediaPath": ${JSON.stringify(testMediaPath)} }`,
          __TEST_SUPPORTED_INTEGRATIONS: JSON.stringify([
            "obs",
            "ontime",
            "vmix",
          ]),
        },
      });

      const win = await app.firstWindow();

      await win.context().tracing.start({ screenshots: true, snapshots: true });

      await win.waitForLoadState("domcontentloaded");

      await win
        .getByLabel("Server address")
        .fill(`http://localhost:${MICRO_SERVER_PORT}/${scenario}`);
      await win.getByLabel("Server Password").fill(MICRO_SERVER_PASSWORD);

      await win.getByRole("button", { name: "Connect" }).click();

      await expect(
        win.getByRole("heading", { name: "Select a show" }),
      ).toBeVisible();

      await use([app, win]);

      await win.context().tracing.stop({
        path: `traces/${testInfo.title}-${testInfo.retry}.zip`,
      });

      await win.close();
      await app.close();
    },
    page: async ({ app }, use) => {
      const [_, page] = app;
      await use(page);
    },
  });
} else {
  test = test.extend<{ app: [ElectronApplication, Page]; page: Page }>({
    app: async ({}, use, testInfo) => {
      testInfo.skip(true, "Not running in Electron");
    },
    page: async ({ browser, scenario, request, testMediaPath }, use) => {
      await request.post("http://localhost:5174/reset", {
        data: {
          settings: {
            media: {
              mediaPath: testMediaPath,
            },
          },
          integrations: {
            supported: ["obs", "ontime", "vmix"],
          },
        },
      });

      const page = await browser.newPage({
        baseURL: `http://localhost:5173`,
        viewport: { width: 1280, height: 720 },
        ignoreHTTPSErrors: true,
      });
      await page.goto("/");

      await page.waitForLoadState("domcontentloaded");

      await page
        .getByLabel("Server address")
        .fill(`http://localhost:${MICRO_SERVER_PORT}/${scenario}`);
      await page.getByLabel("Server Password").fill(MICRO_SERVER_PASSWORD);

      await page.getByRole("button", { name: "Connect" }).click();

      await expect(
        page.getByRole("heading", { name: "Select a show" }),
      ).toBeVisible();

      await use(page);
      await page.close();
    },
  });
}

export { test, expect };
