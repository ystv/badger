import { TRPCError, initTRPC } from "@trpc/server";
import superjson from "superjson";

const t = initTRPC.create({
  transformer: superjson,
});

export const publicProcedure = t.procedure;
export const testOnlyProcedure = publicProcedure.use(async ({ next }) => {
  if (process.env.E2E_TEST === "true") {
    return await next();
  }
  throw new TRPCError({
    code: "UNAUTHORIZED",
    message: "This procedure is only available in end-to-end tests.",
  });
});
export const router = t.router;
