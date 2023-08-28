import { describe, it, expect } from "vitest";
import MockOBSWebSocket from "./MockOBSWebSocket.js";
import { WebSocket } from "ws";
import { pEvent, pEventIterator } from "p-event";
import OBSWebSocket, { EventSubscription } from "obs-websocket-js";

describe("MockOBSWebSocket", async () => {
  it("works", async () => {
    const ts = await MockOBSWebSocket.create(expect, async (obs) => {
      const [data, respond] = await obs.waitForRequest("GetVersion");
      respond(true, 100, {
        obsVersion: "1",
        obsWebSocketVersion: "2",
        availableRequests: [],
        platform: "test",
        platformDescription: "",
        rpcVersion: 1,
        supportedImageFormats: [],
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

  it("works with a real OBS WebSocket implementation", async () => {
    const ts = await MockOBSWebSocket.create(expect, async (obs) => {
      const [data, respond] = await obs.waitForRequest("GetVersion");
      respond(true, 100, {
        obsVersion: "1",
        obsWebSocketVersion: "2",
        availableRequests: [],
        platform: "test",
        platformDescription: "",
        rpcVersion: 1,
        supportedImageFormats: [],
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
});
