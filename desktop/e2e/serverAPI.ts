import { fetch } from "undici";
import type { AppRouter } from "bowser-server/app/api/_router";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import SuperJSON from "superjson";
import { expect } from "@playwright/test";

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
