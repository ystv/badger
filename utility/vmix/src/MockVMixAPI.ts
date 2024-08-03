import { createServer } from "node:net";
import { promisify } from "node:util";
import invariant from "./invariant";
import { z } from "zod";
import { VMixRawXMLSchema } from "./vmixTypesRaw";
import { VMixState } from "./vmixState";

type RawState = z.infer<typeof VMixRawXMLSchema>;

const defaultState: RawState = {
  vmix: {
    version: "26",
    edition: "4K",
    inputs: {
      input: [],
    },
    active: -1,
    audio: {
      master: {
        "@_muted": "False",
        "@_meterF1": "0.000000",
        "@_meterF2": "0.000000",
        "@_headphonesVolume": "0.000000",
        "@_volume": "0.000000",
      },
    },
    dynamic: {
      input1: "",
      input2: "",
      input3: "",
      input4: "",
      value1: "",
      value2: "",
      value3: "",
      value4: "",
    },
    external: "",
    fadeToBlack: "False",
    fullscreen: "False",
    multiCorder: "False",
    overlays: { overlay: [] },
    playList: "",
    preview: -1,
    recording: "False",
    streaming: "False",
    transitions: { transition: [] },
  },
};

export default class MockVMixAPI {
  private state: VMixState;
  private constructor(
    public readonly port: number,
    initialState?: Partial<RawState>,
  ) {
    this.state = new VMixState(
      initialState
        ? { vmix: { ...initialState.vmix, ...defaultState.vmix } }
        : defaultState,
    );
  }

  static async create(initialState?: Partial<RawState>) {
    let instance: MockVMixAPI;
    const server = createServer((socket) => {
      // https://www.vmix.com/help27/TCPAPI.html
      socket.setEncoding("utf-8");
      let buffer = "";
      socket.on("data", (data: string) => {
        const eod = data.indexOf("\r\n");
        if (eod === -1) {
          buffer += data;
          return;
        }
        buffer += data.slice(0, eod);
        const request = buffer.split(" ")[0];
        switch (request) {
          default:
            socket.write(`${request} ER Unknown command\r\n`);
        }
      });
    });
    let port: number;
    await new Promise<void>((resolve, reject) => {
      try {
        server.listen(() => {
          const addr = server.address();
          invariant(
            addr && typeof addr === "object",
            "Expected address to be an object",
          );
          port = addr.port;
          resolve();
        });
      } catch (e) {
        reject(e);
      }
    });
    instance = new MockVMixAPI(port!, initialState);
    return instance;
  }
}
