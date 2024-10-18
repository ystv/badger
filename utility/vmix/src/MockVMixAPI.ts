import { createServer, Server, Socket } from "net";
import { promisify } from "node:util";
import invariant from "./invariant";
import { z } from "zod";
import { VMixRawXMLSchema } from "./vmixTypesRaw";
import { MutableVMixState, VMixState } from "./vmixState";
import xpath from "xpath";
import DOM from "@xmldom/xmldom";
import { ParsedQs, parse as parseQS } from "qs";
import { Draft } from "immer";

type RawState = z.infer<typeof VMixRawXMLSchema>;

const text = (t: string) => ({ _text: t });

const defaultState: RawState = {
  vmix: {
    version: text("26"),
    edition: text("4K"),
    inputs: {
      input: [],
    },
    active: text(""),
    audio: {
      master: {
        _attributes: {
          muted: "False",
          meterF1: "0.000000",
          meterF2: "0.000000",
          headphonesVolume: "0.000000",
          volume: "0.000000",
        },
      },
    },
    dynamic: {
      input1: {},
      input2: {},
      input3: {},
      input4: {},
      value1: {},
      value2: {},
      value3: {},
      value4: {},
    },
    external: text(""),
    fadeToBlack: text("False"),
    fullscreen: text("False"),
    multiCorder: text("False"),
    overlays: { overlay: [] },
    playList: text(""),
    preview: text(""),
    recording: text("False"),
    streaming: text("False"),
    transitions: { transition: [] },
  },
};

type VMixFnHandler = (
  args: ParsedQs,
  respond: (res: {
    message?: string;
    binary?: string | Buffer;
    error?: boolean;
  }) => void,
) => void;

class MockVMixContext {
  constructor(
    private readonly socket: Socket,
    initialState?: Partial<RawState>,
  ) {
    this.state = new MutableVMixState(
      initialState
        ? { vmix: { ...initialState.vmix, ...defaultState.vmix } }
        : defaultState,
    );
  }

  private state: MutableVMixState;
  private functionHandlers = new Map<string, Array<VMixFnHandler>>();
  private fallbackHandlers = new Map<string, VMixFnHandler>();
  private functionCallbacks = new Map<string, Array<() => void>>();
  private closeCallbacks = new Set<(reason: Error) => void>();

  public setState(writer: (draft: Draft<RawState>) => void) {
    this.state.update(writer);
  }

  public handleFunction(fn: string, handler: VMixFnHandler) {
    const handlers = this.functionHandlers.get(fn);
    if (handlers) {
      handlers.push(handler);
    } else {
      this.functionHandlers.set(fn, [handler]);
    }
  }

  public functionFallback(fn: string, handler: VMixFnHandler) {
    this.fallbackHandlers.set(fn, handler);
  }

  public waitForFunction(fn: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const handler = () => {
        this.closeCallbacks.delete(reject);
        resolve();
      };
      if (this.functionCallbacks.has(fn)) {
        this.functionCallbacks.get(fn)!.push(handler);
      } else {
        this.functionCallbacks.set(fn, [handler]);
      }
      this.closeCallbacks.add(reject);
    });
  }

  /** This method is an implementation detail and should not be used outside MockVMixAPI. */
  public async _handleRequest(buffer: string) {
    const reqNameIdx = buffer.indexOf(" ");
    const request = buffer.slice(0, reqNameIdx);
    switch (request) {
      case "XML": {
        const xml = this.state.xml;
        this.socket.write(`XML ${xml.length}\r\n${xml}`);
        return;
      }
      case "XMLTEXT": {
        const xml = this.state.xml;
        const dom = new DOM.DOMParser().parseFromString(xml);
        const nodes = xpath.select(buffer.slice(reqNameIdx + 1), dom);
        if (!nodes) {
          this.socket.write(`XMLTEXT ER No nodes found\r\n`);
          return;
        }
        if (Array.isArray(nodes)) {
          this.socket.write(
            "XMLTEXT ER More than one result (not supported by MockVMixAPI)\r\n",
          );
          return;
        }
        this.socket.write(`XMLTEXT OK ${nodes.toString()}\r\n`);
        return;
      }
      case "FUNCTION": {
        const fnAndArgs = buffer.slice(reqNameIdx + 1);
        const fn = fnAndArgs.slice(0, fnAndArgs.indexOf(" "));
        const args = parseQS(fnAndArgs.slice(fn.length + 1));
        const handlers = this.functionHandlers.get(fn);
        if (handlers) {
          const handler = handlers.shift();
          if (handler) {
            this._doFnCall(fn, args, handler);
            return;
          }
        }
        const fallback = this.fallbackHandlers.get(fn);
        if (fallback) {
          this._doFnCall(fn, args, fallback);
          return;
        }

        this.socket.write(`FUNCTION ER No handler for ${fn}\r\n`);
        return;
      }
      default:
        this.socket.write(`${request} ER Unknown command\r\n`);
    }
  }

  private _doFnCall(fn: string, args: ParsedQs, handler: VMixFnHandler) {
    handler(args, (res) => {
      if (res.error) {
        this.socket.write(`FUNCTION ER ${res.message}\r\n`);
        return;
      }
      if (res.binary) {
        if (res.message) {
          this.socket.write(`FUNCTION ${res.binary.length} ${res.message}\r\n`);
          this.socket.write(res.binary);
        } else {
          this.socket.write(`FUNCTION ${res.binary.length}\r\n`);
          this.socket.write(res.binary);
        }
        return;
      }
      this.socket.write(`FUNCTION OK ${res.message}\r\n`);
    });
  }

  public _handleClose() {
    for (const cb of this.closeCallbacks) {
      cb(new Error("VMix connection closed"));
    }
  }
}

export default class MockVMixAPI {
  private constructor(
    private readonly _server: Server,
    public readonly host: string,
    public readonly port: number,
  ) {}

  private _ctx: MockVMixContext | null = null;
  public get ctx(): MockVMixContext {
    invariant(this._ctx, "MockVMixAPI not initialized");
    return this._ctx;
  }

  private _ready!: () => void;
  public readonly waitForConnection = new Promise<void>((resolve) => {
    this._ready = resolve;
  });

  private _sockets = new Set<Socket>();

  static async create(
    initialState?: Partial<RawState>,
    executor?: (ctx: MockVMixContext) => Promise<void>,
  ) {
    let instance: MockVMixAPI;
    const server = createServer(async (socket) => {
      // https://www.vmix.com/help27/TCPAPI.html
      socket.setEncoding("utf-8");
      instance._sockets.add(socket);

      const context = new MockVMixContext(socket, initialState);

      let buffer = "";
      socket.on("data", (data: string) => {
        const eod = data.indexOf("\r\n");
        if (eod === -1) {
          buffer += data;
          return;
        }
        buffer += data.slice(0, eod);
        context._handleRequest(buffer);
      });

      socket.on("close", () => {
        context._handleClose();
        instance._sockets.delete(socket);
      });

      socket.on("error", (e) => {
        console.error("VMix socket error", e);
        instance._sockets.delete(socket);
      });

      if (executor) {
        executor(context);
      }
      if (!executor) {
        invariant(!instance._ctx, "MockVMixAPI already initialized");
      }
      instance._ctx = context;
      instance._ready();
    });
    let host: string;
    let port: number;
    await new Promise<void>((resolve, reject) => {
      try {
        server.listen(() => {
          const addr = server.address();
          console.log(`MVX addr ${JSON.stringify(addr)}`);
          invariant(
            addr && typeof addr === "object",
            "Expected address to be an object",
          );
          host = addr.address;
          port = addr.port;
          resolve();
        });
      } catch (e) {
        reject(e);
      }
    });
    instance = new MockVMixAPI(server, host!, port!);
    return instance;
  }

  public async close() {
    for (const sock of this._sockets) {
      sock.end();
    }
    this._sockets.clear();
    this._server.close();
  }
}
