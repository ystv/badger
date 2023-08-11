import { Client } from "undici";
import invariant from "@/lib/invariant";

let client: Client;
function ensureClient() {
  if (client) return;
  invariant(
    process.env.NOMAD_TOKEN || process.env.NOMAD_API_BASIC_AUTH,
    "NOMAD_TOKEN or NOMAD_API_BASIC_AUTH not set",
  );
  invariant(
    process.env.NOMAD_API_BASE || process.env.NOMAD_SECRETS_DIR,
    "NOMAD_API_BASE or NOMAD_SECRETS_DIR not set",
  );
  client = new Client(process.env.NOMAD_API_BASE ?? "http://localhost", {
    socketPath:
      process.env.NOMAD_SECRETS_DIR &&
      process.env.NOMAD_SECRETS_DIR + "/api.sock",
  });
}

async function nomadAPIRequest<TRes = unknown>(
  path: string,
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  expectedStatus: number = 200,
  body: Record<string, unknown> = {},
): Promise<TRes> {
  ensureClient();
  let auth;
  if (process.env.NOMAD_API_BASIC_AUTH) {
    auth = `Basic ${Buffer.from(process.env.NOMAD_API_BASIC_AUTH).toString(
      "base64",
    )}`;
  } else if (process.env.NOMAD_TOKEN) {
    auth = `Bearer ${process.env.NOMAD_TOKEN}`;
  } else {
    invariant(false, "NOMAD_TOKEN or NOMAD_API_BASIC_AUTH must be set");
  }
  const res = await client.request({
    path,
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: auth,
    },
    body: JSON.stringify(body),
  });
  if (res.statusCode !== expectedStatus) {
    console.error(`Unexpected status code ${res.statusCode} from Nomad API`);
    console.log(await res.body.text());
    throw new Error(`Unexpected status code ${res.statusCode} from Nomad API`);
  }
  return (await res.body.json()) as TRes;
}

export async function dispatchParameterizedJob(
  jobID: string,
  meta: Record<string, string> = {},
  payload?: Record<string, unknown>,
  idempotencyKey?: string,
) {
  return nomadAPIRequest<{
    Index: number;
    JobCreateIndex: number;
    EvalCreateIndex: number;
    EvalID: string;
    DispatchedJobID: string;
  }>(
    `/v1/job/${jobID}/dispatch?idempotency_token=${idempotencyKey}`,
    "POST",
    200,
    {
      Payload: payload ? JSON.stringify(payload) : undefined,
      Meta: meta,
    },
  );
}
