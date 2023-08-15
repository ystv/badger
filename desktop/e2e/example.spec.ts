import { test, expect, _electron as electron } from "@playwright/test";

test("starts", async () => {
  const app = await electron.launch({ args: [".vite/build/main.js"] });
  const window = await app.firstWindow();
  await window.waitForLoadState("domcontentloaded");
  await expect(window.getByRole("heading", { name: "Bowser" })).toBeVisible();
});

test("can connect to server", async () => {
  const app = await electron.launch({ args: [".vite/build/main.js"] });
  const window = await app.firstWindow();
  window.on("console", console.log);
  await window.waitForLoadState("domcontentloaded");

  await window.getByLabel("Server address").fill("http://localhost:3000");
  await window.getByLabel("Server Password").fill("aaa");

  await window.getByRole("button", { name: "Connect" }).click();

  await expect(
    window.getByRole("heading", { name: "Select a show" }),
  ).toBeVisible();
});
