import { beforeEach, describe, test, vi, expect } from "vitest";
import { EventEmitter } from "node:events";
import VMixConnection from "./vmix";

class MockSocket extends EventEmitter {
  write = vi.fn(
    (payload: unknown, encoding: string, cb: (err?: Error) => void) =>
      cb(undefined),
  );
  setEncoding = vi.fn();
}

vi.mock("net", () => ({
  connect: () => {
    const sock = new MockSocket();
    process.nextTick(() => {
      sock.emit("connect");
    });
    return sock;
  },
}));

describe("VMixConnection", () => {
  let vmix: VMixConnection;
  let sock: MockSocket;
  beforeEach(async () => {
    vmix = await VMixConnection.connect();
    sock = vmix["sock"] as unknown as MockSocket;
  });
  test("request and response", async () => {
    const res = vmix["send"]("FUNCTION", "test");
    expect(sock.write).toHaveBeenCalledWith(
      "FUNCTION test\r\n",
      "utf-8",
      expect.any(Function),
    );
    sock.emit("data", "FUNCTION OK test\r\n");
    expect(res).resolves.toEqual(["test", ""]);
  });
  test("no-arg request", async () => {
    vmix["send"]("XML");
    expect(sock.write).toHaveBeenCalledWith(
      "XML\r\n",
      "utf-8",
      expect.any(Function),
    );
  });
  test("binary response", async () => {
    const res = vmix["send"]("FUNCTION", "test");
    sock.emit("data", "FUNCTION 5\r\nhello");
    expect(res).resolves.toEqual(["", "hello"]);
  });
  test("binary response across multiple chunks", async () => {
    const res = vmix["send"]("FUNCTION", "test");
    sock.emit("data", "FUNCTION 5\r\n");
    sock.emit("data", "hello");
    expect(res).resolves.toEqual(["", "hello"]);
  });
  test("response split across chunks", async () => {
    const res = vmix["send"]("FUNCTION", "test");
    sock.emit("data", "FUNCTION");
    sock.emit("data", " OK\r\n");
    expect(res).resolves.toEqual(["", ""]);
  });
  test("message and binary", async () => {
    const res = vmix["send"]("FUNCTION", "test");
    sock.emit(
      "data",
      "FUNCTION 28 This is a message in addition to the binary data\r\n" +
        "This is optional binary data",
    );
    expect(res).resolves.toEqual([
      "This is a message in addition to the binary data",
      "This is optional binary data",
    ]);
  });
  test("error handling", async () => {
    const res = vmix["send"]("FUNCTION", "test");
    sock.emit("data", "FUNCTION ER test\r\n");
    expect(res).rejects.toThrow("test");
  });
});
