/* eslint-disable no-empty-pattern */
import {
  test as base,
  _electron as electron,
  expect,
  type ElectronApplication,
  type Page,
} from "@playwright/test";
import { server } from "./serverAPI";

const test = base.extend<{
  app: [ElectronApplication, Page];
}>({
  app: async ({}, use) => {
    const app = await electron.launch({ args: [".vite/build/main.js"] });
    const win = await app.firstWindow();

    await win.waitForLoadState("domcontentloaded");

    await win.getByLabel("Server address").fill("http://localhost:3000");
    await win.getByLabel("Server Password").fill("aaa");

    await win.getByRole("button", { name: "Connect" }).click();

    await expect(
      win.getByRole("heading", { name: "Select a show" }),
    ).toBeVisible();

    await use([app, win]);

    await expect(
      app.evaluate(({ ipcMain }) => ipcMain.emit("resetTestSettings")),
    ).not.toBe(false);

    await win.close();
    await app.close();
  },
});

test.beforeEach(async ({ request }) => {
  await request.post(
    "http://localhost:3000/api/resetDBInTestsDoNotUseOrYouWillBeFired",
  );
  await server.shows.create.mutate({
    name: "Test Show",
    start: new Date("2026-01-01T19:00:00Z"),
    continuityItems: {
      create: {
        name: "Test Continuity",
        durationSeconds: 0,
        order: 0,
      },
    },
  });
});

test("can select newly created show", async ({ app: [_app, page] }) => {
  const row = page.getByRole("listitem").filter({ hasText: "Test Show" });
  expect(row).toBeVisible();
  const btn = row.getByRole("button", { name: "Select" });
  await btn.click();
});
