import { describe, it, expect, vi, afterEach } from "vitest";
import { Integration } from "../../common/types";
import { IntegrationManager, IntegrationMethods } from "./integrations";

vi.mock("../ipcEventBus");

class TestIntegration implements IntegrationMethods {
  async close() {}
}

describe("IntegrationManager", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });
  it("works", async () => {
    const im = new IntegrationManager(
      "TEST" as Integration,
      async (settings, nc) => new TestIntegration(),
      async () => ({}),
      async () => {},
    );
    await im.start();
    await im.ready;
    expect(im.instance).toBeTruthy();
  });

  it("retries", async () => {
    vi.useFakeTimers();
    let tried = false;
    const im = new IntegrationManager(
      "TEST" as Integration,
      async (settings, nc) => {
        if (!tried) {
          tried = true;
          throw new Error("test");
        }
        return new TestIntegration();
      },
      async () => ({}),
      async () => {},
    );
    await im.start({}, true);
    vi.runAllTimers();
    await im.ready;
    expect(im.instance).toBeTruthy();
  });

  it("close then recreate", async () => {
    const im = new IntegrationManager(
      "TEST" as Integration,
      async (settings, nc) => new TestIntegration(),
      async () => ({}),
      async () => {},
    );
    await im.start();
    await im.ready;
    expect(im.instance).toBeTruthy();

    await im.close();
    expect(im.maybeInstance).toBeFalsy();
    await expect(() => im.ready).rejects.toBe("Closed");

    await im.start();
    await im.ready;
    expect(im.instance).toBeTruthy();
  });
});
