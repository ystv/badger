import {
  EventSubscription,
  OBSEventTypes,
  OBSRequestTypes,
  OBSResponseTypes,
} from "obs-websocket-js";
import { AddressInfo, WebSocket, WebSocketServer } from "ws";
import pEvent from "p-event";
import * as msgpack from "@msgpack/msgpack";
import type { ExpectStatic as VitestExpect } from "vitest";
import type { Expect as PlaywrightExpect } from "@playwright/test";
import makeDebug from "debug";

const debug = makeDebug("mows");
const debugReq = makeDebug("mows:request");

type Expect = VitestExpect | PlaywrightExpect;

type OBSResponse<T extends keyof OBSRequestTypes = keyof OBSRequestTypes> =
  | { success: true; code: number; data: OBSResponseTypes[T] }
  | { success: false; code: number; comment: string };

type OBSRequestHandler<
  T extends keyof OBSRequestTypes = keyof OBSRequestTypes,
> = [OBSRequestTypes[T], (resp: OBSResponse<T>) => void];

/** This class is an implementation detail of MockOBSWebSocket and should not be directly created outside of it. */
export class MockOBSContext {
  private pendingRequests = new Map<
    string,
    ((h: OBSRequestHandler) => void)[]
  >();
  private fallbackResponders = new Map<string, (data: any) => OBSResponse>();
  constructor(
    private readonly expect: Expect,
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

  public alwaysRespond<T extends keyof OBSRequestTypes>(
    requestType: T,
    respond: (data: OBSRequestTypes[T]) => OBSResponse<T>,
  ) {
    this.fallbackResponders.set(requestType, respond);
  }

  /** This method is an implementation detail and should not be used outside MockOBSWebSocket. */
  public _closed!: () => void;
  public readonly waitUntilClosed = new Promise<void>((resolve) => {
    this._closed = resolve;
  });

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
    debugReq("request %s %s", requestType, requestId);
    const queue = this.pendingRequests.get(requestType);
    if (queue) {
      const responder = queue.shift();
      if (responder) {
        responder([requestData, this._makeResponder(requestType, requestId)]);
        return;
      }
    }

    const fallback = this.fallbackResponders.get(requestType);
    if (fallback) {
      this._makeResponder(requestType, requestId)(fallback(requestData));
      return;
    }

    throw new Error(`MockOBSWebSocket: Unhandled ${requestType} request`);
  }

  private _makeResponder(type: string, rid: string) {
    return (resp: OBSResponse<any>) => {
      let res;
      if (resp.success) {
        res = {
          op: 7,
          d: {
            requestType: type,
            requestId: rid,
            requestStatus: {
              result: resp.success,
              code: resp.code,
            },
            responseData: resp.data,
          },
        };
      } else {
        res = {
          op: 7,
          d: {
            requestType: type,
            requestId: rid,
            requestStatus: {
              result: resp.success,
              code: resp.code,
              comment: resp.comment,
            },
          },
        };
      }
      debugReq("response %s %d", type, resp.code);
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
 * Note that authentication and batched requests are not supported.
 *
 * There are two ways to use the mock OBS server.
 * The first is to use an "actor" function that drives the simulated OBS connection,
 * responding to client requests and sending events.
 * The other is to use the server's `ctx` property directly. This supports all the
 * features of the actor function, and it may be easier to use, however it only
 * supports one concurrent client. Its behaviour in the presence of more than one
 * client connection is undefined.
 *
 * @example // used directly
 *   test("something", async () => {
 *    const ts = await MockOBSWebSocket.create(expect);
 *    const client = new OBSWebSocket();
 *    await client.connect(`ws://localhost:${ts.port}`);
 *    const evtPromise = ts.ctx.waitForRequest("GetVersion");
 *    const resPromise = client.call("GetVersion")
 *    const [req, respond] = await evtPromise;
 *    respond(true, 100, {
 *      obsVersion: "1",
 *      // ...
 *    });
 *    expect(resPromise).resolves.toMatchSnapshot();
 *    await ts.close();
 *   });
 *
 *
 * @example // with an actor function
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
    private readonly expect: Expect,
    private readonly server: WebSocketServer,
    public readonly port: number,
  ) {}

  private _ctx: MockOBSContext | null = null;
  /**
   * The WebSocket client connection.
   * Note that this is *only* available if the server was created *without* an actor function.
   * If the server was created with an actor function, this access will fail.
   */
  public get ctx() {
    if (this._ctx === null) {
      throw new Error(
        "No MockOBSWebSocket context available. Either the server has not received a connection yet, or it was created with an actor function.",
      );
    }
    if (this.openConnections > 1) {
      throw new Error(
        "Tried to access MockOBSWebSocket.ctx with more than one open connection. Use the actor function directly instead.",
      );
    }
    return this._ctx!;
  }

  private _ready!: () => void;
  public readonly waitForConnection = new Promise<void>((resolve) => {
    this._ready = resolve;
  });

  public static async create(
    expect: Expect,
    actor?: (obs: MockOBSContext) => Promise<unknown>,
  ) {
    const server = new WebSocketServer({
      port: 0 /* dynamically allocate a free port */,
    });
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
          throw new Error(
            "MockOBSWebSocket: unrecognised obs-websocket protocol " +
              rawSocket.protocol,
          );
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
      rawSocket.on("close", () => ctx._closed());
      let actorPromise: Promise<unknown> | null = null;
      if (actor) {
        actorPromise = actor(ctx);
        mows._ctx = ctx;
      } else {
        if (mows.openConnections > 0) {
          throw new Error(
            "MockOBSWebSocket: test error: only one connection is supported without an actor function",
          );
        }
        mows._ctx = ctx;
      }
      mows._ready();
      socket.onMessage(async (payload: any) => {
        expect(typeof payload).toBe("object");
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
            throw new Error("MockOBSWebSocket: request batch not implemented");
          default:
            throw new Error("Unhandled OBS-WebSocket opcode " + payload.op);
        }
      });
      socket.send({ op: 2, d: { negotiatedRpcVersion: 1 } });
      debug("accepted connection");
      ctx.ready = true;
      for (const evt of ctx.eventQueue) {
        await ctx.sendEvent(evt.eventType, evt.eventIntent, evt.eventData);
        evt.resolve();
      }
      mows.openConnections++;
      if (actorPromise) {
        await actorPromise;
        mows.openConnections--;
        debug("connection closed");
        socket.ws.close();
      } else {
        socket.ws.on("close", () => {
          mows.openConnections--;
          debug("connection closed");
        });
      }
    });

    return mows;
  }

  public async close() {
    if (!this._ctx) {
      this.expect.soft(this.openConnections).toBe(0);
    }
    this.server.close();
  }
}
