import type { AppRouter } from "@/app/api/_router";
import {
  CopyObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { Page, expect, test as base } from "@playwright/test";
import {
  CreateTRPCProxyClient,
  createTRPCProxyClient,
  httpLink,
} from "@trpc/client";
import SuperJSON from "superjson";

/** Playwright doesn't natively support dropping files, so we need to dispatch
   the DataTransfer event ourselves. In order to do that, we need to get the file
   from Node-world into JS-world, which we do by base64 encoding it and converting
   it to an ArrayBuffer in the browser. */
export async function fileToDataTransfer(
  page: Page,
  file: Buffer,
  name: string,
  type: string,
) {
  return await page.evaluateHandle(
    ([dataB64, name, type]) => {
      const dt = new DataTransfer();
      const dataStr = atob(dataB64);
      const buf = new ArrayBuffer(dataStr.length);
      const bufView = new Uint8Array(buf);
      for (let i = 0; i < dataStr.length; i++) {
        bufView[i] = dataStr.charCodeAt(i);
      }
      const file = new File([buf], name, {
        type: type,
      });
      dt.items.add(file);
      return dt;
    },
    [file.toString("base64"), name, type],
  );
}

let apiClient: CreateTRPCProxyClient<AppRouter>;

function getAPIClient() {
  if (!apiClient) {
    apiClient = createTRPCProxyClient<AppRouter>({
      transformer: SuperJSON,
      links: [
        httpLink({
          url: "http://localhost:3000/api/trpc",
          headers: {
            Authorization: "Bearer aaa",
          },
        }),
      ],
    });
  }
  return apiClient;
}

export async function createShow(
  page: Page,
  name: string,
  time: "past" | "future" = "future",
) {
  await page.goto("/shows/create");
  await page.getByLabel("Name").fill(name);
  await page.getByLabel("Start").click();
  // The E2E suite doesn't care what date this is, as long as it's in the future.
  // We specifically use a day between 8 and 21, because sometimes the date picker
  // can show the last/first week of the previous/next month, and two buttons with
  // the same text will break Playwright (Strict Mode).
  // So we go to the next month and then pick the 15th.
  if (time === "future") {
    await page.getByLabel("Go to next month").click();
  } else if (time === "past") {
    await page.getByLabel("Go to previous month").click();
  } else {
    throw new Error();
  }
  await page.getByText("15", { exact: true }).click();
  await page.locator("input[type=time]").fill("19:30");
  await page.keyboard.press("Escape");
  await page.getByRole("button", { name: "Create" }).click();
  await expect(page.getByRole("heading", { name: name })).toBeVisible({
    timeout: 10_000,
  });
}

export async function createMedia(
  fileName: string,
  file: Buffer,
  targetType: "rundownItem" | "continuityItem",
  targetID: number,
) {
  // We have a chicken-and-egg problem: it'd normally be uploaded to a path
  // containing its ID, but we don't know its ID until it's created.
  // We solve this by cheating: passing a non-existent path at first.
  const api = getAPIClient();
  const media = await api.media.create.mutate({
    fileName,
    targetType,
    targetID,
    sourceType: "S3",
    source: "TEMPORARY",
    process: false,
  });
  const rawPath = `media/${media.id}/raw/${fileName}`;
  const finalPath = `media/${media.id}/final/${fileName}`;
  const s3 = new S3Client({
    endpoint: process.env.S3_ENDPOINT,
    region: process.env.S3_REGION,
    forcePathStyle: true,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
  });
  await s3.send(
    new PutObjectCommand({
      Bucket: process.env.STORAGE_BUCKET!,
      Key: rawPath,
      Body: file,
    }),
  );
  await s3.send(
    new CopyObjectCommand({
      Bucket: process.env.STORAGE_BUCKET!,
      CopySource: `${process.env.STORAGE_BUCKET!}/${rawPath}`,
      Key: finalPath,
    }),
  );
  await api.media.update.mutate({
    id: media.id,
    data: {
      path: finalPath,
      rawPath,
      state: "Ready",
    },
  });
}

export const test = base.extend<{ showPage: Page }>({
  showPage: async ({ page, request }, use) => {
    await request.post(
      "/api/testOnlyAPIsDoNotUseOutsideOfTestsOrYouWillBeFired/resetDB",
    );

    // await page.goto("/enableDebugMode?value=false");

    await createShow(page, "Test Show");

    await use(page);
    // await request.post(
    //   "/api/testOnlyAPIsDoNotUseOutsideOfTestsOrYouWillBeFired/resetDB"
    // );
  },
});
