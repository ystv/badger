import { beforeAll, vi, expect, test, describe } from "vitest";
import VMixConnection from "./vmix";

const integrate =
  process.env.TEST_INTEGRATION === "true" ? describe : describe.skip;

integrate("VMixConnection integration", () => {
    let vmix: VMixConnection;
    beforeAll(async () => {
      vmix = await VMixConnection.connect();
      console.log("Setup done");
    });
    test("getFullState", async () => {
      // The current state of the vMix instance is unpredictable, so all we can do is test that it doesn't throw
      // (i.e. it can successfully parse the state, whatever it may be).
      expect(vmix.getFullState()).resolves.toHaveProperty("edition");
    });
  });
  