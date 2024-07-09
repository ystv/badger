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

const test = base.extend<{
  scenario: string;
  enabledIntegrations: ("obs" | "ontime" | "vmix")[];
  testMediaPath: string;
  app: [ElectronApplication, Page];
}>({
  scenario: "default",
  enabledIntegrations: ["obs", "ontime", "vmix"],
  // eslint-disable-next-line no-empty-pattern
  testMediaPath: async ({}, use) => {
    const dir = await fsp.mkdtemp(
      join(tmpdir(), "badger-desktop-e2e-standalone"),
    );
    await use(dir);
    await fsp.rm(dir, { recursive: true });
  },

  app: async ({ scenario, testMediaPath }, use, testInfo) => {
    const app = await electron.launch({
      args: ["--enable-logging", "out/main/index.mjs"],
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

    await win
      .context()
      .tracing.stop({ path: `traces/${testInfo.title}-${testInfo.retry}.zip` });

    await win.close();
    await app.close();
  },
});

export { test, expect };
