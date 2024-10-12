import { initTRPC } from "@trpc/server";
import SuperJSON from "superjson";

const t = initTRPC.create({
  transformer: SuperJSON,
});
export const r = t.router;
export const proc = t.procedure;
