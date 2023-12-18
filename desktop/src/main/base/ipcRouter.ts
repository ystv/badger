import { initTRPC } from "@trpc/server";

const t = initTRPC.create();
export const r = t.router;
export const proc = t.procedure;
