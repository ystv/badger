import { test, expect } from "./base";

test.use({
  enabledIntegrations: ["obs", "ontime", "vmix"],
});

test("load VTs into vMix", async ({ app: [app, page], testMediaPath }) => {
  await page.getByRole("button", { name: "Select" }).click();

  await page.getByText("Continuity", { exact: true }).click();
  await page.getByRole("menuitem", { name: "Test Rundown" }).click();

  await page.getByRole("button", { name: "Download", exact: true }).click();

  await app.evaluate((_, testMediaPath) => {
    globalThis.__MOCK_VMIX((when, vmix, It) => {
      when(() => vmix.getFullState())
        .thenResolve({
          version: "26",
          edition: "4k",
          inputs: [],
        })
        .once();
      when(() => vmix.addInput("VideoList", It.isString())).thenResolve("123");
      when(() => vmix.renameInput("123", It.isString())).thenResolve();
      when(() => vmix.clearList("123")).thenResolve();
      when(() =>
        vmix.getPartialState(`vmix/inputs/input[@shortTitle="VTs"]`),
      ).thenResolve({ ["@_state"]: "Paused" });
      when(() => vmix.addInputToList("123", It.isString())).thenResolve();
      when(() => vmix.getFullState()).thenResolve({
        version: "26",
        edition: "4k",
        inputs: [
          {
            key: "123",
            number: 1,
            type: "VideoList",
            title: "VTs - smpte_bars_15s.mp4",
            shortTitle: "VTs",
            state: "Paused",
            position: 0,
            duration: 0,
            loop: false,
            selectedIndex: 1,
            items: [
              {
                source: testMediaPath,
                selected: true,
              },
            ],
          },
        ],
      });
    });
  }, `${testMediaPath}/smpte_bars_15s (#1).mp4`);

  await expect(page.getByText("Load", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Load All VTs" }).click();

  await expect(page.getByText("Good to go!")).toBeVisible();
});
