import { expect } from "@playwright/test";
import { test } from "../complete/desktopE2EUtils";

// If this test fails, it means that the app didn't start up properly at all and everything else is probably broken too.
// Rerun with DEBUG=pw:browser* to see Electron's output.
test("smoke", async ({ app: [_app, win] }) => {
  await expect(win.getByRole("heading", { name: "Bowser" })).toBeVisible();
});
