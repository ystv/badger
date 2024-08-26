import { Socket, connect } from "node:net";
import invariant from "./invariant";
import { InputType } from "./vmixTypes";
import * as qs from "qs";
import { v4 as uuidV4 } from "uuid";
import { VMixState } from "./vmixState";
import { VMixState as VMixStateCleanedType } from "./vmixTypes";
import { ElementCompact, xml2js } from "xml-js";

type VMixCommand =
  | "TALLY"
  | "FUNCTION"
  | "ACTS"
  | "XML"
  | "XMLTEXT"
  | "SUBSCRIBE"
  | "UNSUBSCRIBE"
  | "QUIT";

interface ReqQueueItem {
  command: VMixCommand;
  args: string[];
  resolve: (msgAndData: [string, string]) => void;
  reject: (err: Error) => void;
}

/**
 * A connection to a vMix instance using the TCP API.
 *
 * @example
 *   const vmix = await VMixConnection.connect();
 */
export default class VMixConnection {
  private sock!: Socket;

  // See the comment on doNextRequest for an explanation of this.
  private replyAwaiting: Map<
    VMixCommand,
    {
      resolve: (msgAndData: [string, string]) => void;
      reject: (err: Error) => void;
    }
  >;
  private requestQueue: Array<ReqQueueItem> = [];

  private buffer: string = "";
  private constructor(
    // This is only used for display purposes, the actual connection is established in `connect()`,
    // before this constructor is called.
    public readonly host: string,
    public readonly port: number,
  ) {
    this.replyAwaiting = new Map();
  }

  public static async connect(host: string = "localhost", port: number = 8099) {
    const sock = connect({
      host,
      port,
    });
    sock.setEncoding("utf-8");
    await new Promise<void>((resolve, reject) => {
      sock.once("connect", () => {
        console.log("connected");
        sock.off("error", reject);
        resolve();
      });
      sock.on("error", (e) => {
        console.error("VMix connection failed", e);
        reject(e);
      });
    });
    const vmix = new VMixConnection(host, port);
    vmix.sock = sock;
    sock.on("data", vmix.onData.bind(vmix));
    sock.on("close", vmix.onClose.bind(vmix));
    sock.on("error", vmix.onError.bind(vmix));
    return vmix;
  }

  private _closeHandlers = new Set<() => void>();

  public async close() {
    this.sock.end();
    await new Promise<void>((resolve) => {
      this._closeHandlers.add(resolve);
    });
  }

  public async addInput(type: InputType, filePath: string) {
    // vMix doesn't return the input key, but you can pass it one to use.
    const id = uuidV4();
    await this.doFunction("AddInput", {
      Value: type + "|" + filePath,
      Input: id,
    });
    // This may error if the input is already added or the GUID collides (very unlikely)
    return id;
  }

  public async renameInput(inputKey: string, newName: string) {
    await this.doFunction("SetInputName", { Input: inputKey, Value: newName });
  }

  public async addInputToList(listSource: string, path: string) {
    await this.doFunction("ListAdd", { Input: listSource, Value: path });
  }

  /**
   *
   * @param listSource the name, index, or ID of the list source
   * @param index the index of the item to remove - NB: this is 1-based!
   */
  public async removeItemFromList(listSource: string, index: number) {
    await this.doFunction("ListRemove", {
      Input: listSource,
      Value: index.toString(),
    });
  }

  public async clearList(listSource: string) {
    await this.doFunction("ListRemoveAll", { Input: listSource });
  }

  // Function reference: https://www.vmix.com/help26/ShortcutFunctionReference.html
  private async doFunction(fn: string, params: Record<string, string>) {
    return await this.send("FUNCTION", fn, qs.stringify(params));
  }

  public async getPartialState(xpath: string): Promise<ElementCompact> {
    const [_, result] = await this.send("XMLTEXT", xpath);
    return xml2js(result, { compact: true });
  }

  public async getFullStateRaw(): Promise<string> {
    const [_, result] = await this.send("XML");
    return result;
  }

  public async getFullState(): Promise<VMixStateCleanedType> {
    const data = await this.getFullStateRaw();
    return VMixState.fromXML(data).state;
  }

  private async send(command: VMixCommand, ...args: string[]) {
    const req: ReqQueueItem = {
      command,
      args,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      resolve: null as any,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      reject: null as any,
    };
    const reply = new Promise<[string, string]>((resolve, reject) => {
      req.resolve = resolve;
      req.reject = reject;
    });
    this.requestQueue.push(req);
    console.debug(
      `Queued request ${command}; queue is now ${this.requestQueue.length} deep`,
    );
    await this.doNextRequest();
    return reply;
  }

  // When replying to a TCP request, vMix includes the name of the command
  // in its response, but nothing else that would allow us to identify the sender
  // (unlike e.g. the OBS WebSocket API, where requests can have an ID).
  // Therefore, we only allow one request per command type to be in flight at
  // a time.
  //
  // The replyAwaiting map tracks whether we have sent a request for a given command,
  // and therefore we can't send another until we've received a response to the first.
  // If a request of type X is added to the queue when there is already one in flight,
  // doNextRequest will skip processing it. Then, once a compelte response is received
  // by onData(), it will call doNextRequest again to process the next request.
  //
  // This implementation is a bit simplistic - if the first request in the queue
  // is blocked we won't process any others, even if they would not be blocked.
  // However, this is unlikely to be a problem in practice.
  //
  // TODO: With that in mind, this could be simplified even further - instead of a
  // replyAwaiting map, we could just have a single boolean flag indicating whether
  // a request is in flight.
  private async doNextRequest() {
    const req = this.requestQueue[0];
    if (!req) {
      return;
    }
    if (this.replyAwaiting.has(req.command)) {
      // Wait until the next run
      console.debug(`Request ${req.command} is blocked`);
      return;
    }
    this.requestQueue.shift();
    this.replyAwaiting.set(req!.command, req!);
    await new Promise<void>((resolve, reject) => {
      this.sock.write(
        req.command +
          (req.args.length > 0 ? " " + req.args.join(" ") : "") +
          "\r\n",
        "utf-8",
        (err) => (err ? reject(err) : resolve()),
      );
    });
    console.debug(`Sent request ${req.command}`);
  }

  private onData(data: Buffer) {
    this.buffer += data.toString();
    // Replies will be in one of the following forms:
    //
    //MYCOMMAND OK This is the response to MYCOMMAND\r\n
    //
    //MYCOMMAND ER This is an error message in response to MYCOMMAND\r\n
    //
    //MYCOMMAND 28\r\n
    //This is optional binary data
    //
    //MYCOMMAND 28 This is a message in addition to the binary data\r\n
    //This is optional binary data
    //
    // The 28 in the last two examples is the length of the binary data.
    // NB: binary data doesn't necessarily end with \r\n!

    if (!this.buffer.includes("\r\n")) {
      return;
    }
    const firstLine = this.buffer.slice(0, this.buffer.indexOf("\r\n"));
    const [command, status, ...rest] = firstLine.split(" ");
    console.debug(`Received response to ${command}: ${status}`);
    const reply = this.replyAwaiting.get(command as VMixCommand);
    if (status === "OK") {
      reply?.resolve([rest.join(" "), ""]);
      this.replyAwaiting.delete(command as VMixCommand);
      this.buffer = "";
      process.nextTick(this.doNextRequest.bind(this));
      return;
    }
    if (status === "ER") {
      reply?.reject(new Error(rest.join(" ")));
      this.replyAwaiting.delete(command as VMixCommand);
      this.buffer = "";
      process.nextTick(this.doNextRequest.bind(this));
      return;
    }
    // This is a binary response and "status" is actually its length
    invariant(status.match(/^\d+$/), "Invalid status: " + status);
    const payloadLength = parseInt(status, 10);
    // +2 for the \r\n
    if (this.buffer.length < payloadLength + firstLine.length + 2) {
      // still need more data
      console.debug(
        `Expecting ${payloadLength} bytes of binary data but only got ${this.buffer.length - firstLine.length - 2}`,
      );
      return;
    }
    const payload = this.buffer.slice(
      firstLine.length + 2,
      payloadLength + firstLine.length + 2,
    );
    reply?.resolve([rest.join(" "), payload.trim()]);
    this.replyAwaiting.delete(command as VMixCommand);
    process.nextTick(this.doNextRequest.bind(this));
    this.buffer = "";
  }

  private onClose() {
    console.warn("VMix connection closed");
    this.replyAwaiting.forEach((req) => req.reject(new Error("Socket closed")));
    this.replyAwaiting.clear();
    this.requestQueue.forEach((req) => req.reject(new Error("Socket closed")));
    this.requestQueue = [];
    this.onError(new Error("Socket closed"));
    for (const cb of this._closeHandlers) {
      cb();
    }
  }

  private onError(err: Error) {
    if (err.message !== "Socket closed") {
      console.error("VMix connection error", err);
    }
  }
}
