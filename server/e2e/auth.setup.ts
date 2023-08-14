import { test as setup } from "@playwright/test";

const authFile = "playwright/.auth/user.json";

setup("authenticate", async ({ page, baseURL }) => {
  // Perform authentication steps. Replace these actions with your own.
  await page.goto(`/login?return=${baseURL}`);
  await page.getByLabel("Username").fill("test");
  await page.getByLabel("Password").fill("test");
  await page.getByRole("button", { name: "Sign in" }).click();
  // Wait until the page receives the cookies.
  //
  // Sometimes login flow sets cookies in the process of several redirects.
  // Wait for the final URL to ensure that the cookies are actually set.
  await page.waitForURL(baseURL ?? "http://localhost:3000");

  // End of authentication steps.

  await page.context().storageState({ path: authFile });
});
