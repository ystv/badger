import { TRPCError, initTRPC } from "@trpc/server";
import superjson from "superjson";

const t = initTRPC.create({
  transformer: superjson,
});

export const publicProcedure = t.procedure;
export const e2eProcedure = t.procedure.use(({ next }) => {
  if (process.env.E2E_TEST !== "true") {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "This endpoint is only available in e2e tests",
    });
  }
  return next();
});
export const router = t.router;
