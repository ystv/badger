import {
  ElectronApplication,
  Page,
  test as base,
  _electron as electron,
  expect,
} from "@playwright/test";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "bowser-server/app/api/_router";
import MockOBSWebSocket from "@bowser/testing/MockOBSWebSocket.ts";
import SuperJSON from "superjson";

const api = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:3000/trpc",
      headers: () => ({
        Authorization: "Bearer aaa",
      }),
    }),
  ],
  transformer: SuperJSON,
});

const test = base.extend<{
  app: [ElectronApplication, Page];
  obs: MockOBSWebSocket;
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

    await win.close();
    await app.close();
  },
  obs: async ({}, use) => {
    const mows = await MockOBSWebSocket.create(expect);
    await use(mows);
    await mows.close();
  },
});

test.beforeEach(async ({ request }) => {
  await request.post(
    "http://localhost:3000/api/resetDBInTestsDoNotUseOrYouWillBeFired",
  );
  await api.shows.create.mutate({
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

test("continuity works", async ({ app: [app, win], obs }) => {
  await win.getByRole("button", { name: "Select" }).click();

  await expect(win.getByLabel("Settings")).toBeVisible();
  await win.getByLabel("Settings").click();

  await win.getByRole("tab", { name: "OBS" }).click();

  await win.getByLabel("OBS Host").fill("localhost");
  await win.getByLabel("OBS WebSocket Port").fill(obs.port.toString(10));
  await win.getByLabel("OBS WebSocket Password").fill("there is no password");
  await win.getByRole("button", { name: "Connect" }).click();
  await expect(win.getByTestId("OBSSettings.error")).not.toBeVisible();
  await expect(win.getByTestId("OBSSettings.success")).toBeVisible();
});
