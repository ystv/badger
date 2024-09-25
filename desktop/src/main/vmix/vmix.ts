import { VMixConnection } from "@ystv/vmix";
import { getMockVMix } from "./vMix.mock";
import { getLogger } from "../base/logging";

const logger = getLogger("vmix");

export let conn: VMixConnection | null;

export async function tryCreateVMixConnection(
  host?: string,
  port?: number,
): Promise<VMixConnection | null> {
  if (process.env.__USE_MOCK_VMIX) {
    return getMockVMix();
  }
  if (!conn) {
    try {
      conn = await VMixConnection.connect(host, port);
    } catch (e) {
      logger.warn("Failed to connect to VMix", e);
      conn = null;
    }
  }
  return conn;
}

export async function createVMixConnection(
  host?: string,
  port?: number,
): Promise<VMixConnection> {
  if (process.env.__USE_MOCK_VMIX) {
    return getMockVMix();
  }
  if (!conn) {
    try {
      conn = await VMixConnection.connect(host, port);
    } catch (e) {
      conn = null;
      throw e;
    }
  }
  return conn;
}

export function getVMixConnection(): VMixConnection | null {
  if (process.env.__USE_MOCK_VMIX) {
    return getMockVMix();
  }
  return conn;
}
