import { expect } from "@playwright/test";
import { test } from "./desktopE2EUtils";

test("smoke", async ({ app: [_app, win] }) => {
  await expect(win.getByRole("heading", { name: "Bowser" })).toBeVisible();
});
