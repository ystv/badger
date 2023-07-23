import "server-only";
import { PrismaClient } from "@prisma/client";

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
  prisma = new PrismaClient({ log: ["warn", "error"] });
}

export const db = prisma;
