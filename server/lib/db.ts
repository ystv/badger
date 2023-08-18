import "server-only";
import { PrismaClient } from "@bowser/prisma/client";
import invariant from "@/lib/invariant";
import { PHASE_PRODUCTION_BUILD } from "next/constants";

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient;
}

let prisma: PrismaClient;

if (process.env.NODE_ENV === "development") {
  if (!global.prisma) {
    global.prisma = new PrismaClient({
      log: ["query", "info", "warn", "error"],
    });
  }
  prisma = global.prisma;
} else if (process.env.NODE_ENV === "test") {
  if (!global.prisma) {
    global.prisma = new PrismaClient({
      log: [
        {
          emit: "event",
          level: "query",
        },
        "info",
        "warn",
        "error",
      ],
    });
  }
  prisma = global.prisma;
  // @ts-expect-error This works, trust me.
  prisma.$on("query", async (e) => {
    // @ts-expect-error This works, trust me.
    console.log(`${e.query}\n\t${e.params}`);
  });
} else {
  // Next will execute these as part of the build and fail
  if (process.env.NEXT_PHASE !== PHASE_PRODUCTION_BUILD) {
    invariant(process.env.DATABASE_URL, "DATABASE_URL not set");
    if (process.env.E2E_TEST !== "true") {
      invariant(
        !process.env.DATABASE_URL.includes("localhost"),
        "DATABASE_URL must not be localhost in production",
      );
    }
  }
  prisma = new PrismaClient({
    log: ["warn", "error"],
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });
}

export const db = prisma;
