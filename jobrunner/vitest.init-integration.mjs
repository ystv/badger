import pg from "pg";
import { createHash } from "node:crypto";
import { exec as execRaw } from "node:child_process";
import { promisify } from "node:util";
import { PrismaClient } from "@badger/prisma/client/index.js";
import { vi, expect, beforeAll, beforeEach, afterEach, afterAll } from "vitest";

/*
 * his file sets up and tears down a PostgreSQL database for each Jest test using Prisma.
 * It ensures that each test runs in isolation by creating a unique database and cleaning up afterward.
 * The use of dynamic database names allows parallel test execution without conflicts.
 * The Jest mock for the database module helps control and isolate database interactions during testing.
 */

const exec = promisify(execRaw);

function getTestHash() {
  const state = expect.getState();
  return createHash("sha256").update(state.currentTestName).digest("hex");
}

/** @type {pg.Client} */
let client;

let dbs = [];

const dbInstances = new Map();

vi.mock("@/lib/db", () => {
  const db = { db: null };
  return new Proxy(db, {
    get(target, prop) {
      if (prop !== "db") {
        throw new Error(`DB mock: tried to get ${String(prop)}`);
      }
      const hash = getTestHash();
      let db = dbInstances.get(hash);
      if (db) {
        return db;
      }
      console.log(`Using new DB instance for test ${hash}`);
      db = new PrismaClient({
        datasources: {
          db: {
            url: `postgresql://root:postgres@localhost:5432/badger_test_${hash}`,
          },
        },
      });
      dbInstances.set(hash, db);
      return db;
    },
  });
});

beforeAll(async () => {
  client = new pg.Client({
    connectionString: process.env.DATABASE_URL,
  });
  await client.connect();
});

beforeEach(async () => {
  const hash = getTestHash();
  await client.query(`DROP DATABASE IF EXISTS badger_test_${hash}`);
  await client.query(`CREATE DATABASE badger_test_${hash}`);
  await exec(`yarn prisma:migrateProd`, {
    env: {
      ...process.env,
      DATABASE_URL: `postgresql://root:postgres@localhost:5432/badger_test_${hash}`,
    },
  });
  dbs.push(`badger_test_${hash}`);
});

afterEach(async () => {
  const hash = getTestHash();
  const db = dbInstances.get(hash);
  if (db) {
    await db.$disconnect();
    dbInstances.delete(hash);
  }
  await client.query(`DROP DATABASE badger_test_${hash}`);
});

afterAll(async () => {
  await client.end();
});
