import { Socket, connect } from "node:net";
import invariant from "../common/invariant";

type VMixCommand =
  | "TALLY"
  | "FUNCTION"
  | "ACTS"
  | "XML"
  | "XMLTEXT"
  | "SUBSCRIBE"
  | "UNSUBSCRIBE"
  | "QUIT";

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
  private buffer: string = "";
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

  public async getFullState(): Promise<unknown> {
    const [_, result] = await this.send("XML");
    // TODO: parse XML
    return result;
  }

  private async send(command: VMixCommand, ...args: string[]) {
    const reply = new Promise<[string, string]>((resolve, reject) => {
      this.replyAwaiting.set(command, { resolve, reject });
    });
    await new Promise<void>((resolve, reject) => {
      this.sock.write(
        command + " " + args.join(" ") + "\r\n",
        "utf-8",
        (err) => (err ? reject(err) : resolve()),
      );
    });
    return reply;
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
      this.buffer = "";
      return;
    }
    if (status === "ER") {
      reply?.reject(new Error(rest.join(" ")));
      this.buffer = "";
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
    reply?.resolve([rest.join(" "), payload]);
    this.buffer = "";
  }

  private onClose(error: boolean) {}

  private onError(err: Error) {}
}
