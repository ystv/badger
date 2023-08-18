import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { NextRequest } from "next/server";
import { appRouter } from "@/app/api/_router";
import { PrismaClientKnownRequestError } from "@bowser/prisma/client/runtime/library";
import { TRPCError } from "@trpc/server";

const handler: (req: NextRequest) => Promise<Response> = (req) => {
  return fetchRequestHandler({
    router: appRouter,
    req,
    createContext({ req }) {
      const bearerToken = req.headers.get("authorization")?.split(" ")[1];
      if (bearerToken === process.env.API_SHARED_SECRET) {
        return {};
      }
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: bearerToken ? "Invalid token" : "Missing token",
      });
    },
    endpoint: "/api/trpc",
    onError({ error, path }) {
      if (error.cause instanceof PrismaClientKnownRequestError) {
        // https://www.prisma.io/docs/reference/api-reference/error-reference
        if (error.cause.code === "P2025") {
          error = new TRPCError({
            code: "NOT_FOUND",
            message: "Not found",
            cause: error.cause,
          });
        }
      }
      console.error("TRPC Error at %s", path, error);
    },
  });
};

export const GET = handler;
export const POST = handler;
