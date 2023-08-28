import { describe, it, expect } from "vitest";
import MockOBSWebSocket from "./MockOBSWebSocket.js";
import { WebSocket } from "ws";
import { pEvent, pEventIterator } from "p-event";
import OBSWebSocket, { EventSubscription } from "obs-websocket-js";

describe("MockOBSWebSocket", async () => {
  it("works", async () => {
    const ts = await MockOBSWebSocket.create(expect, async (obs) => {
      const [data, respond] = await obs.waitForRequest("GetVersion");
      respond({
        success: true,
        code: 100,
        data: {
          obsVersion: "1",
          obsWebSocketVersion: "2",
          availableRequests: [],
          platform: "test",
          platformDescription: "",
          rpcVersion: 1,
          supportedImageFormats: [],
        },
      });
    });
    const ws = new WebSocket(`ws://localhost:${ts.port}`, "obswebsocket.json");
    const data: Buffer = await pEvent(ws, "message");
    expect(JSON.parse(data.toString("utf-8"))).toMatchInlineSnapshot(`
      {
        "d": {
          "obsWebSocketVersion": "5.1.0",
          "rpcVersion": 1,
        },
        "op": 0,
      }
    `);
    ws.send(
      JSON.stringify({
        op: 1,
        d: {
          rpcVersion: 1,
        },
      }),
    );
    const data2: Buffer = await pEvent(ws, "message");
    expect(JSON.parse(data2.toString("utf-8"))).toMatchInlineSnapshot(`
      {
        "d": {
          "negotiatedRpcVersion": 1,
        },
        "op": 2,
      }
    `);
    ws.send(
      JSON.stringify({
        op: 6,
        d: {
          requestType: "GetVersion",
          requestId: "asdf",
        },
      }),
    );
    const data3: Buffer = await pEvent(ws, "message");
    expect(JSON.parse(data3.toString("utf-8"))).toMatchInlineSnapshot(`
      {
        "d": {
          "requestId": "asdf",
          "requestStatus": {
            "code": 100,
            "result": true,
          },
          "requestType": "GetVersion",
          "responseData": {
            "availableRequests": [],
            "obsVersion": "1",
            "obsWebSocketVersion": "2",
            "platform": "test",
            "platformDescription": "",
            "rpcVersion": 1,
            "supportedImageFormats": [],
          },
        },
        "op": 7,
      }
    `);
    await ts.close();
  });

  it("works without an actor", async () => {
    const ts = await MockOBSWebSocket.create(expect);
    const ws = new WebSocket(`ws://localhost:${ts.port}`, "obswebsocket.json");
    const data: Buffer = await pEvent(ws, "message");
    expect(JSON.parse(data.toString("utf-8"))).toMatchInlineSnapshot(`
      {
        "d": {
          "obsWebSocketVersion": "5.1.0",
          "rpcVersion": 1,
        },
        "op": 0,
      }
    `);
    ws.send(
      JSON.stringify({
        op: 1,
        d: {
          rpcVersion: 1,
        },
      }),
    );
    const data2: Buffer = await pEvent(ws, "message");
    expect(JSON.parse(data2.toString("utf-8"))).toMatchInlineSnapshot(`
      {
        "d": {
          "negotiatedRpcVersion": 1,
        },
        "op": 2,
      }
    `);
    await ts.waitForConnection;
    const evtPromise = ts.ctx.waitForRequest("GetVersion");
    ws.send(
      JSON.stringify({
        op: 6,
        d: {
          requestType: "GetVersion",
          requestId: "asdf",
        },
      }),
    );
    const [evt, respond] = await evtPromise;
    expect(evt).toMatchInlineSnapshot("undefined");
    await respond({
      success: true,
      code: 100,
      data: {
        obsVersion: "1",
        obsWebSocketVersion: "2",
        availableRequests: [],
        platform: "test",
        platformDescription: "",
        rpcVersion: 1,
        supportedImageFormats: [],
      },
    });
    const data3: Buffer = await pEvent(ws, "message");
    expect(JSON.parse(data3.toString("utf-8"))).toMatchInlineSnapshot(`
      {
        "d": {
          "requestId": "asdf",
          "requestStatus": {
            "code": 100,
            "result": true,
          },
          "requestType": "GetVersion",
          "responseData": {
            "availableRequests": [],
            "obsVersion": "1",
            "obsWebSocketVersion": "2",
            "platform": "test",
            "platformDescription": "",
            "rpcVersion": 1,
            "supportedImageFormats": [],
          },
        },
        "op": 7,
      }
    `);
    await ts.close();
  });

  it("handles events", async () => {
    const ts = await MockOBSWebSocket.create(expect, async (obs) => {
      await obs.sendEvent("StreamStateChanged", EventSubscription.Outputs, {
        outputActive: true,
        outputState: "",
      });
    });
    const ws = new WebSocket(`ws://localhost:${ts.port}`, "obswebsocket.json");
    const data: Buffer = await pEvent(ws, "message");
    expect(JSON.parse(data.toString("utf-8"))).toMatchInlineSnapshot(`
      {
        "d": {
          "obsWebSocketVersion": "5.1.0",
          "rpcVersion": 1,
        },
        "op": 0,
      }
    `);
    ws.send(
      JSON.stringify({
        op: 1,
        d: {
          rpcVersion: 1,
          eventSubscriptions: EventSubscription.All,
        },
      }),
    );
    const messages = [];
    for await (const evt of pEventIterator(ws, "message")) {
      messages.push(JSON.parse(evt.toString("utf-8")));
      if (messages.length === 2) {
        break;
      }
    }
    expect(messages).toMatchInlineSnapshot(`
      [
        {
          "d": {
            "negotiatedRpcVersion": 1,
          },
          "op": 2,
        },
        {
          "d": {
            "eventData": {
              "outputActive": true,
              "outputState": "",
            },
            "eventIntent": 64,
            "eventType": "StreamStateChanged",
          },
          "op": 5,
        },
      ]
    `);
  });

  it("works with a real OBS WebSocket implementation [actor]", async () => {
    const ts = await MockOBSWebSocket.create(expect, async (obs) => {
      const [data, respond] = await obs.waitForRequest("GetVersion");
      respond({
        success: true,
        code: 100,
        data: {
          obsVersion: "1",
          obsWebSocketVersion: "2",
          availableRequests: [],
          platform: "test",
          platformDescription: "",
          rpcVersion: 1,
          supportedImageFormats: [],
        },
      });
    });
    const obs = new OBSWebSocket();
    await obs.connect(`ws://localhost:${ts.port}`);
    const res = await obs.call("GetVersion");
    expect(res).toMatchInlineSnapshot(`
      {
        "availableRequests": [],
        "obsVersion": "1",
        "obsWebSocketVersion": "2",
        "platform": "test",
        "platformDescription": "",
        "rpcVersion": 1,
        "supportedImageFormats": [],
      }
    `);
    await ts.close();
  });

  it("works with a real OBS WebSocket implementation [no actor]", async () => {
    const ts = await MockOBSWebSocket.create(expect);
    const obs = new OBSWebSocket();
    await obs.connect(`ws://localhost:${ts.port}`);
    await ts.waitForConnection;
    const reqPromise = ts.ctx.waitForRequest("GetVersion");
    const resPromise = obs.call("GetVersion");
    const [req, respond] = await reqPromise;
    expect(req).toMatchInlineSnapshot("null");
    await respond({
      success: true,
      code: 100,
      data: {
        obsVersion: "1",
        obsWebSocketVersion: "2",
        availableRequests: [],
        platform: "test",
        platformDescription: "",
        rpcVersion: 1,
        supportedImageFormats: [],
      },
    });
    expect(resPromise).resolves.toMatchInlineSnapshot(`
      {
        "availableRequests": [],
        "obsVersion": "1",
        "obsWebSocketVersion": "2",
        "platform": "test",
        "platformDescription": "",
        "rpcVersion": 1,
        "supportedImageFormats": [],
      }
    `);
  });

  it("doesn't have a ctx if an actor is defined", async () => {
    const ts = await MockOBSWebSocket.create(expect, async (obs) => {});
    expect(() => ts.ctx).toThrow();
  });

  it("fallback response", async () => {
    const ts = await MockOBSWebSocket.create(expect, async (obs) => {
      obs.alwaysRespond("GetOutputStatus", () => ({
        success: true,
        code: 100,
        data: {
          outputActive: false,
          outputBytes: 0,
          outputCongestion: 0,
          outputDuration: 0,
          outputReconnecting: false,
          outputSkippedFrames: 0,
          outputTimecode: "",
          outputTotalFrames: 0,
        },
      }));
      await obs.waitUntilClosed;
    });

    const client = new OBSWebSocket();
    await client.connect(`ws://localhost:${ts.port}`);
    await expect(client.call("GetOutputStatus")).resolves.toHaveProperty(
      "outputActive",
    );
    await expect(client.call("GetOutputStatus")).resolves.toHaveProperty(
      "outputActive",
    );
    await expect(client.call("GetOutputStatus")).resolves.toHaveProperty(
      "outputActive",
    );
  });
});
