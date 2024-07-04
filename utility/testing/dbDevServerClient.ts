import { got } from "got";

const port = process.env.DB_DEV_SERVER_PORT
  ? parseInt(process.env.DB_DEV_SERVER_PORT, 10)
  : 5937;

export async function getDB() {
  const res = await got.post(`http://localhost:${port}/db`, {
    responseType: "json",
  });
  return res.body as { db: string; url: string };
}

export async function releaseDB(name: string) {
  await got.delete(`http://localhost:${port}/db/${name}`);
}
