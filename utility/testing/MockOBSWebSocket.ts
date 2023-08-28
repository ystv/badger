import { type expect as vitestExpect } from "vitest";
import {
  EventSubscription,
  OBSEventTypes,
  OBSRequestTypes,
  OBSResponseTypes,
} from "obs-websocket-js";
import { AddressInfo, WebSocket, WebSocketServer } from "ws";
import { pEvent } from "p-event";
import * as msgpack from "@msgpack/msgpack";

type OBSRequestHandler<
  T extends keyof OBSRequestTypes = keyof OBSRequestTypes,
> = [
  OBSRequestTypes[T],
  (
    ok: boolean,
    code: number,
    dataOrComment: OBSResponseTypes[T] | string,
  ) => void,
];

/** This class is an implementation detail of MockOBSWebSocket and should not be directly created outside of it. */
export class MockOBSContext {
  private pendingRequests = new Map<
    string,
    ((h: OBSRequestHandler) => void)[]
  >();
  constructor(
    private readonly expect: typeof vitestExpect,
    private readonly socket: OBSSocket,
    public eventIntent: EventSubscription,
  ) {}

  public ready = false;
  public eventQueue: {
    eventType: keyof OBSEventTypes;
    eventIntent: EventSubscription;
    eventData: OBSEventTypes[keyof OBSEventTypes];
    resolve: () => void;
  }[] = [];

  /**
   * Wait for a request of the given type to be received.
   * @param requestType The request type to wait for.
   * @returns A promise that resolves to the request data and a responder function, which takes a boolean (ok), a code, and either a response or a comment.
   * @see https://github.com/obsproject/obs-websocket/blob/master/docs/generated/protocol.md#requestresponse-opcode-7
   * @example
   *   const [data, respond] = await obs.waitForRequest("GetVersion");
   *   respond(true, 100, {
   *    obsVersion: "1",
   *    // ...
   *   });
   */
  public async waitForRequest<T extends keyof OBSRequestTypes>(
    requestType: T,
  ): Promise<OBSRequestHandler<T>> {
    const queue = this.pendingRequests.get(requestType);
    if (queue === undefined) {
      const newQueue: ((h: OBSRequestHandler) => void)[] = [];
      this.pendingRequests.set(requestType, newQueue);
      return new Promise<OBSRequestHandler<T>>((resolve) => {
        newQueue.push(resolve as any);
      });
    } else {
      return new Promise<OBSRequestHandler<T>>((resolve) => {
        queue.push(resolve as any);
      });
    }
  }

  /**
   * Send an event to the client.
   * Note that this will fail the test if the client is not subscribed to the given category of event.
   * Also note that, if the mock server is not ready yet, the event will only be sent after it is fully ready
   * (has sent a Identified message).
   */
  public async sendEvent<T extends keyof OBSEventTypes>(
    eventType: T,
    category: EventSubscription,
    data: OBSEventTypes[T],
  ) {
    this.expect(this.eventIntent & category).toBe(category);
    if (this.ready) {
      this.socket.send({
        op: 5,
        d: {
          eventType: eventType,
          eventIntent: category,
          eventData: data,
        },
      });
    } else {
      return new Promise<void>((resolve) => {
        this.eventQueue.push({
          eventType: eventType,
          eventIntent: category,
          eventData: data,
          resolve,
        });
      });
    }
  }

  /** This method is an implementation detail and should not be used outside MockOBSWebSocket. */
  public async _handleRequest(
    requestType: string,
    requestId: string,
    requestData: OBSRequestTypes[keyof OBSRequestTypes],
  ) {
    const queue = this.pendingRequests.get(requestType);
    this.expect(queue).toBeDefined();
    const responder = queue!.shift();
    this.expect(responder).toBeDefined();
    responder!([requestData, this._makeResponder(requestType, requestId)]);
  }

  private _makeResponder(type: string, rid: string) {
    return (
      ok: boolean,
      code: number,
      dataOrComment: OBSResponseTypes[keyof OBSResponseTypes] | string,
    ) => {
      let res;
      if (ok) {
        res = {
          op: 7,
          d: {
            requestType: type,
            requestId: rid,
            requestStatus: {
              result: ok,
              code,
            },
            responseData: dataOrComment,
          },
        };
      } else {
        res = {
          op: 7,
          d: {
            requestType: type,
            requestId: rid,
            requestStatus: {
              result: ok,
              code,
              comment: dataOrComment,
            },
          },
        };
      }
      this.socket.send(res);
    };
  }
}

/** Handles sending and receiving messages from the OBS socket, encoding appropriately in either JSON or MessagePack */
class OBSSocket {
  constructor(
    public readonly ws: WebSocket,
    private readonly encoding: "json" | "msgpack",
  ) {}
  public send(data: Record<string, unknown>) {
    switch (this.encoding) {
      case "json":
        this.ws.send(JSON.stringify(data));
        break;
      case "msgpack":
        this.ws.send(msgpack.encode(data));
        break;
      default:
        throw new Error("unknown encoding " + this.encoding);
    }
  }
  public async receive() {
    const data: Buffer = await pEvent(this.ws, "message");
    switch (this.encoding) {
      case "json":
        return JSON.parse(data.toString("utf-8"));
      case "msgpack":
        return msgpack.decode(data);
      default:
        throw new Error("unknown encoding " + this.encoding);
    }
  }

  public onMessage(cb: (msg: unknown) => void) {
    const listener = (data: Buffer) => {
      switch (this.encoding) {
        case "json":
          cb(JSON.parse(data.toString("utf-8")));
          break;
        case "msgpack":
          cb(msgpack.decode(data));
          break;
        default:
          throw new Error("unknown encoding " + this.encoding);
      }
    };
    this.ws.on("message", listener);
    return () => {
      this.ws.off("message", listener);
    };
  }
}

/**
 * A mock OBS WebSocket server.
 * This class is intended to be used in tests to simulate an OBS WebSocket server.
 * To start a mock server, call `MockOBSWebSocket.create` with your test runner's `expect` function (currently Jest and Vitest are supported),
 * and an "actor" function which can be used to respond to client requests and simulate OBS responses.
 * Then, connect your OBS WebSocket client using the server's `port` property.
 * Note that authentication and batched requests are not supported.
 *
 * @example
 *   test("something", async () => {
 *     const ts = await MockOBSWebSocket.create(expect, async obs => {
 *       const [data, respond] = await obs.waitForRequest("GetVersion");
 *       respond(true, 100, {
 *         obsVersion: "1",
 *         // ...
 *       });
 *       // ...
 *       await obs.sendEvent("StreamStateChanged", EventSubscription.Output, {
 *         outputActive: true,
 *         // ...
 *       });
 *     });
 *     const client = new OBSWebSocket();
 *     await client.connect(`ws://localhost:${ts.port}`);
 *     const res = await client.call("GetVersion")
 *     expect(res).toMatchSnapshot();
 *     await ts.close();
 *   });
 */
export default class MockOBSWebSocket {
  private openConnections = 0;
  private constructor(
    private readonly expect: typeof vitestExpect,
    private readonly server: WebSocketServer,
    public readonly port: number,
  ) {}

  public static async create(
    expect: typeof vitestExpect,
    actor: (obs: MockOBSContext) => Promise<unknown>,
  ) {
    const server = new WebSocketServer({ port: 0 });
    const mows = new MockOBSWebSocket(
      expect,
      server,
      (server.address() as AddressInfo).port,
    );
    server.on("connection", async (rawSocket, request) => {
      let socket: OBSSocket;
      switch (rawSocket.protocol) {
        case "obswebsocket.json":
          socket = new OBSSocket(rawSocket, "json");
          break;
        case "obswebsocket.msgpack":
          socket = new OBSSocket(rawSocket, "msgpack");
          break;
        default:
          expect.fail("unknown protocol " + rawSocket.protocol);
      }
      socket.send({
        op: 0,
        d: {
          obsWebSocketVersion: "5.1.0",
          rpcVersion: 1,
          // Authentication is not implemented
        },
      });
      const res = await socket.receive();
      expect(res.op).toBe(1); // identify
      expect(res.d.rpcVersion).toBe(1);
      // Set up the context now so it's ready as soon as we send the identified message
      const ctx = new MockOBSContext(
        expect,
        socket,
        res.d.eventSubscriptions ?? EventSubscription.All,
      );
      const actorPromise = actor(ctx);
      socket.onMessage(async (payload: any) => {
        expect(payload).toBeTypeOf("object");
        switch (payload.op) {
          case 3: // reidentify
            ctx.eventIntent =
              payload.d.eventSubscriptions ?? EventSubscription.All;
            socket.send({ op: 2, d: { negotiatedRpcVersion: 1 } });
            break;
          case 6: // request
            await ctx._handleRequest(
              payload.d.requestType,
              payload.d.requestId,
              payload.d.requestData,
            );
            break;
          case 8: // request batch
            expect.fail("request batch not handled yet");
        }
      });
      socket.send({ op: 2, d: { negotiatedRpcVersion: 1 } });
      ctx.ready = true;
      for (const evt of ctx.eventQueue) {
        await ctx.sendEvent(evt.eventType, evt.eventIntent, evt.eventData);
        evt.resolve();
      }
      mows.openConnections++;
      await actorPromise;
      mows.openConnections--;
      socket.ws.close();
    });

    return mows;
  }

  public async close() {
    this.expect.soft(this.openConnections).toBe(0);
    this.server.close();
  }
}
