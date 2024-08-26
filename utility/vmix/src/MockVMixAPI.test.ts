import MockVMixAPI from "./MockVMixAPI";
import VMixConnection from "./vmix";

describe("VMixConnection w/ MockVMixAPI", () => {
  test("it works", async () => {
    const mvx = await MockVMixAPI.create();
    const vmix = await VMixConnection.connect(mvx.host, mvx.port);
    await mvx.waitForConnection;

    mvx.ctx.handleFunction("AddInput", (params, respond) => {
      const { Value, Input } = params as { Value: string; Input: string };
      const [type, path] = Value.split("|");
      mvx.ctx.setState((draft) => {
        draft.vmix.inputs.input.push({
          _text: path,
          _attributes: {
            key: Input,
            type,
            audiobusses: "",
            balance: 0,
            muted: "False",
            solo: "False",
            duration: 0,
            loop: "False",
            meterF1: "0",
            meterF2: "0",
            number: 1,
            position: 0,
            shortTitle: path,
            state: "Paused",
            title: path,
            volume: 100,
          },
        });
      });
      respond({ message: Input });
    });
    await vmix.addInput("Video", "test");
    await vmix.close();
    await mvx.close();
  }, 10_000);
});
