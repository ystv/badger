import { fetch } from "undici";
import type { AppRouter } from "bowser-server/app/api/_router";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import SuperJSON from "superjson";
import { expect } from "@playwright/test";
import {
  CopyObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import dotenvFlow from "dotenv-flow";
import path from "path";
import { existsSync } from "fs";

export const server = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:3000/api/trpc",
      headers: () => ({
        Authorization: "Bearer aaa",
      }),
      // @ts-expect-error the undici types don't match what TRPC is expecting, but they're close enough
      fetch,
    }),
  ],
  transformer: SuperJSON,
});

export async function createAndUploadTestMedia(
  targetType: "rundownItem" | "continuityItem",
  targetID: number,
  fileName: string,
  file: Buffer,
) {
  // First, upload it to Tus
  const res = await fetch("http://localhost:1080/files", {
    method: "POST",
    body: file,
    headers: {
      "Tus-Resumable": "1.0.0",
      "Content-Type": "application/offset+octet-stream",
      "Upload-Length": file.length.toString(),
      "Content-Length": file.length.toString(),
    },
    redirect: "manual",
  });
  expect(res.status).toBe(201);
  expect(res.headers.get("Upload-Offset")).toBe(file.length.toString());
  const uploadedURL = res.headers.get("Location")!;

  // Then create the media
  const media = await server.media.create.mutate({
    sourceType: "Tus",
    // Normally the action would do this for us, but we're passing the ID directly into db.media.create
    source: uploadedURL.replace("http://localhost:1080/files/", ""),
    fileName,
    targetID,
    targetType,
    process: true,
  });

  // And wait for Jobrunner to process it
  await expect
    .poll(
      async () => {
        const med = await server.media.get.query({ id: media.id });
        return med.state;
      },
      {
        timeout: 30_000,
        intervals: [500],
      },
    )
    .toBe("Ready");
  return media;
}

// A "short-cutty" version of createAndUploadTestMedia that, rather than going
// through the whole upload/process lifecycle, uploads the file to S3 directly
// and sets it as "Ready".
// A very similar function is used in Server's tests in server/e2e/lib.ts.
export async function directlyCreateTestMedia(
  fileName: string,
  file: Buffer,
  targetType: "rundownItem" | "continuityItem",
  targetID: number,
) {
  // We have a chicken-and-egg problem: it'd normally be uploaded to a path
  // containing its ID, but we don't know its ID until it's created.
  // We solve this by cheating: passing a non-existent path at first.
  const media = await server.media.create.mutate({
    fileName,
    targetType,
    targetID,
    sourceType: "S3",
    source: "TEMPORARY",
    process: false,
  });
  const rawPath = `media/${media.id}/raw/${fileName}`;
  const finalPath = `media/${media.id}/final/${fileName}`;

  // We need to access server's env vars, as desktop doesn't have the S3 ones.
  const { parsed: env, error } = dotenvFlow.load(
    dotenvFlow
      .listFiles(path.resolve(__dirname + "../../../../server"))
      .filter((x) => existsSync(x)),
  );
  if (!env) {
    throw new Error(String(error));
  }

  const s3 = new S3Client({
    endpoint: env.S3_ENDPOINT,
    region: env.S3_REGION,
    forcePathStyle: true,
    credentials: {
      accessKeyId: env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: env.AWS_SECRET_ACCESS_KEY!,
    },
  });
  await s3.send(
    new PutObjectCommand({
      Bucket: env.STORAGE_BUCKET!,
      Key: rawPath,
      Body: file,
    }),
  );
  await s3.send(
    new CopyObjectCommand({
      Bucket: env.STORAGE_BUCKET!,
      CopySource: `${env.STORAGE_BUCKET!}/${rawPath}`,
      Key: finalPath,
    }),
  );
  return await server.media.update.mutate({
    id: media.id,
    data: {
      path: finalPath,
      rawPath,
      state: "Ready",
    },
  });
}
