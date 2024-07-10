import { initTRPC } from "@trpc/server";
import SuperJSON from "superjson";

export const t = initTRPC.create({
  transformer: SuperJSON,
});

export const proc = t.procedure;

export const MICRO_SERVER_PORT = process.env.MICRO_SERVER_PORT
  ? parseInt(process.env.MICRO_SERVER_PORT, 10)
  : process.env.PORT
    ? parseInt(process.env.PORT, 10)
    : 8594;

export const MICRO_SERVER_AUTH_SHARED_SECRET = "microserver";
