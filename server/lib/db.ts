import "server-only";
import { PrismaClient } from "@prisma/client";

declare global {
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
  // @ts-ignore
  prisma.$on("query", async (e) => {
    // @ts-ignore
    console.log(`${e.query}\n\t${e.params}`);
  });
} else {
  prisma = new PrismaClient({ log: ["warn", "error"] });
}

export const db = prisma;
