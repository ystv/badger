import { Socket, connect } from "node:net";
import invariant from "../common/invariant";
import { XMLParser } from "fast-xml-parser";
import {
  AudioFileInput,
  BaseInput,
  InputObject,
  ListInput,
  InputType,
  VMixState,
  VideoInput,
} from "./vmixTypes";
import {
  AudioFileObject,
  VMixRawXMLSchema,
  VideoListObject,
  VideoObject,
} from "./vmixTypesRaw";
import { z } from "zod";
import * as qs from "qs";

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
  private replyAwaiting: Map<
    VMixCommand,
    {
      resolve: (msgAndData: [string, string]) => void;
      reject: (err: Error) => void;
    }
  >;
  private requestQueue: Array<ReqQueueItem> = [];
  private buffer: string = "";
  private xmlParser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "@_",
    allowBooleanAttributes: true,
  });
  private constructor() {
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
        sock.off("error", reject);
        resolve();
      });
      sock.on("error", reject);
    });
    const vmix = new VMixConnection();
    vmix.sock = sock;
    sock.on("data", vmix.onData.bind(vmix));
    sock.on("close", vmix.onClose.bind(vmix));
    sock.on("error", vmix.onError.bind(vmix));
    return vmix;
  }

  public async addInput(type: InputType, filePath: string) {
    return this.doFunction("AddInput", { Value: type + "|" + filePath });
  }

  public async addInputToList(listSource: string, path: string) {
    return this.doFunction("ListAdd", { Input: listSource, Value: path });
  }

  /**
   *
   * @param listSource the name, index, or ID of the list source
   * @param index the index of the item to remove - NB: this is 1-based!
   */
  public async removeItemFromList(listSource: string, index: number) {
    return this.doFunction("ListRemove", {
      Input: listSource,
      Value: index.toString(),
    });
  }

  public async clearList(listSource: string) {
    return this.doFunction("ListRemoveAll", { Input: listSource });
  }

  // Function reference: https://www.vmix.com/help26/ShortcutFunctionReference.html
  private async doFunction(fn: string, params: Record<string, string>) {
    return this.send("FUNCTION", fn, qs.stringify(params));
  }

  public async getFullStateRaw(): Promise<unknown> {
    const [_, result] = await this.send("XML");
    return this.xmlParser.parse(result);
  }

  /**
   *
   * @param _requireSuccessfulParse should only be used by tests
   */
  public async getFullState(
    _requireSuccessfulParse = false,
  ): Promise<VMixState> {
    const data = await this.getFullStateRaw();
    const rawParseRes = VMixRawXMLSchema.safeParse(data);
    let raw: z.infer<typeof VMixRawXMLSchema>;
    if (rawParseRes.success) {
      raw = rawParseRes.data;
    } else if (_requireSuccessfulParse) {
      throw rawParseRes.error;
    }
    {
      console.warn(
        "Parsing raw vMix schema failed. Possibly the vMix is a version we don't know. Will try to proceed, but things may break!",
      );
      console.debug("Raw data:", JSON.stringify(data));
      // DIRTY HACK - assume that the data matches the schema to extract what we can
      raw = data as z.infer<typeof VMixRawXMLSchema>;
    }
    const res: VMixState = {
      version: raw.vmix.version,
      edition: raw.vmix.edition,
      preset: raw.vmix.preset,
      inputs: [],
    };
    for (const input of raw.vmix.inputs.input) {
      // eslint is wrong
      // eslint-disable-next-line prefer-const
      let v: BaseInput = {
        key: input["@_key"],
        number: input["@_number"],
        type: input["@_type"] as InputType,
        title: input["@_title"],
        shortTitle: input["@_shortTitle"],
        loop: input["@_loop"] === "True",
        state: input["@_state"],
        duration: input["@_duration"],
        position: input["@_position"],
      };
      switch (input["@_type"]) {
        case "Colour":
        case "Mix":
        case "Image":
          break;
        case "Video":
        case "AudioFile": {
          const r = input as VideoObject | AudioFileObject;
          (v as unknown as VideoInput | AudioFileInput) = {
            ...v,
            type: r["@_type"] as "Video" | "AudioFile",
            volume: r["@_volume"],
            balance: r["@_balance"],
            solo: r["@_solo"] === "True",
            muted: r["@_muted"] === "True",
            audioBusses: r["@_audiobusses"],
          };
          break;
        }
        case "VideoList": {
          const r = input as VideoListObject;
          (v as unknown as ListInput) = {
            ...v,
            type: r["@_type"],
            selectedIndex: r["@_selectedIndex"] - 1 /* 1-based index */,
            items: [],
          };
          if (Array.isArray(r.list.item)) {
            (v as ListInput).items = r.list.item.map((item) => {
              if (typeof item === "string") {
                return {
                  source: item,
                  selected: false,
                };
              }
              return {
                source: item["#text"],
                selected: item["@_selected"] === "true",
              };
            });
          } else {
            (v as ListInput).items.push({
              source: r.list.item["#text"],
              selected: r.list.item["@_selected"] === "true",
            });
          }
          break;
        }
        default:
          console.warn(`Unrecognised input type '${input["@_type"]}'`);
          continue;
      }
      res.inputs.push(v as InputObject);
    }
    return res;
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
    await this.doNextRequest();
    return reply;
  }

  private async doNextRequest() {
    const req = this.requestQueue[0];
    if (!req) {
      return;
    }
    if (this.replyAwaiting.has(req.command)) {
      // Wait until the next run
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
  }

  private onData(data: Buffer) {
    this.buffer += data.toString();
    // Replies will be in one of the following forms:
    //MYCOMMAND OK This is the response to MYCOMMAND\r\n
    //MYCOMMAND ER This is an error message in response to MYCOMMAND\r\n
    //MYCOMMAND 28\r\n
    //This is optional binary data
    //MYCOMMAND 28 This is a message in addition to the binary data\r\n
    //This is optional binary data
    //
    // NB: binary data doesn't necessarily end with \r\n!

    if (!this.buffer.includes("\r\n")) {
      return;
    }
    const firstLine = this.buffer.slice(0, this.buffer.indexOf("\r\n"));
    const [command, status, ...rest] = firstLine.split(" ");
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
    invariant(status.match(/^\d+$/), "Invalid status: " + status);
    const payloadLength = parseInt(status, 10);
    if (this.buffer.length < payloadLength + firstLine.length + 2) {
      // still need more data
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

  private onClose(error: boolean) {}

  private onError(err: Error) {}
}
