import { URL } from "node:url";
import pg from "pg";
import { exec as execRaw } from "node:child_process";
import { promisify } from "node:util";
import Express from "express";

const exec = promisify(execRaw);

function invariant(cond: any, message: string): asserts cond {
  if (!cond) {
    throw new Error("Invariant violation: " + message);
  }
}

const __dirname = new URL(".", import.meta.url).pathname;

const rawUrl = process.env.DATABASE_URL;
invariant(rawUrl, "DATABASE_URL not set");
const url = new URL(rawUrl);
invariant(
  url.protocol === "postgresql:",
  "DATABASE_URL must be a postgres URL",
);

const client = new pg.Client({
  user: url.username,
  host: url.hostname,
  database: url.pathname.slice(1),
  password: url.password,
  port: parseInt(url.port || "5432", 10),
});
await client.connect();

// First, create a template database
await client.query("DROP DATABASE IF EXISTS badger_test_template");
await client.query("CREATE DATABASE badger_test_template");
// Run migrations against it
const templateURL = new URL(rawUrl);
templateURL.pathname = "badger_test_template";
await exec("npx -y prisma migrate deploy --schema ../prisma/schema.prisma", {
  env: {
    ...process.env,
    DATABASE_URL: templateURL.toString(),
  },
  cwd: __dirname,
});
// Disable connections
await client.query(
  "UPDATE pg_database SET datallowconn = false WHERE datname = 'badger_test_template'",
);
await client.query(
  "SELECT pg_terminate_backend(pg_stat_activity.pid) FROM pg_stat_activity WHERE pg_stat_activity.datname = 'badger_test_template' AND pid <> pg_backend_pid()",
);

// Now start our dev server.
const app = Express();

const dbPool = new Set<string>();

function randomString() {
  return Math.round(Math.random() * 1e9).toString(36);
}

async function prepareDB() {
  const dbName = "badger_test_" + randomString();
  await client.query(`CREATE DATABASE ${dbName} TEMPLATE badger_test_template`);
  dbPool.add(dbName);
  return dbName;
}

async function getPooledDBOrPrepare() {
  if (dbPool.size > 0) {
    const next = dbPool.values().next();
    dbPool.delete(next.value);
    process.nextTick(async () => {
      dbPool.add(await prepareDB());
    });
    return next.value;
  }
  return await prepareDB();
}

app.get("/healthz", async (_, res) => {
  res.json({ ok: true });
});

app.post("/db", async (req, res) => {
  const db = await getPooledDBOrPrepare();
  const url = new URL(rawUrl);
  url.pathname = db;
  res.json({ db: db, url: url.toString() });
});

app.delete("/db/:db", async (req, res) => {
  await client.query(`DROP DATABASE ${req.params.db}`);
  res.json({ ok: true });
});

process.on("beforeExit", async () => {
  for (const db of dbPool) {
    await client.query(`DROP DATABASE ${db}`);
  }
  await client.query("DROP DATABASE badger_test_template");
  await client.end();
  console.log("Goodbye!");
});

const port = process.env.DB_DEV_SERVER_PORT
  ? parseInt(process.env.DB_DEV_SERVER_PORT, 10)
  : 5937;
app.listen(port, () => {
  console.log(`DB server listening on http://localhost:${port}`);
});
