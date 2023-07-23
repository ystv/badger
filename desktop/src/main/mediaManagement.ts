// noinspection ExceptionCaughtLocallyJS

import * as os from "node:os";
import { getMediaSettings, updateLocalMediaState } from "./settings";
import * as fs from "fs";
import * as fsp from "fs/promises";
import * as path from "path";
import { fetch } from "undici";
import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";
import progress from "progress-stream";
import { serverApiClient } from "./serverApiClient";
import { z } from "zod";

export async function getMediaPath(): Promise<string> {
  const settings = await getMediaSettings();
  if (settings) {
    return settings.mediaPath;
  }
  switch (os.platform()) {
    case "win32":
      return "C:\\bowser_media";
    case "darwin":
    case "linux":
      return `${os.userInfo().homedir}/Videos/Bowser Media`;
    default:
      throw new Error("Unsupported platform");
  }
}

export async function ensureMediaPath(): Promise<string> {
  const mediaPath = await getMediaPath();
  await fsp.mkdir(mediaPath, { recursive: true });
  return mediaPath;
}

interface DownloadQueueItem {
  mediaID: number;
}

export const DownloadStatusSchema = z.object({
  mediaID: z.number(),
  name: z.string(),
  status: z.enum(["downloading", "done", "error"]),
  progressPercent: z.number().optional(),
  error: z.string().optional(),
});
type DownloadStatus = z.infer<typeof DownloadStatusSchema>;

const downloadQueue: DownloadQueueItem[] = [];
const abortDownload = new AbortController();
export const downloadStatus: Map<number, DownloadStatus> = new Map();

async function doDownloadMedia() {
  const task = downloadQueue.shift();
  if (!task) {
    return;
  }
  if (!serverApiClient) {
    throw new Error("Server API client not initialized");
  }
  const info = await serverApiClient.media.get.query({ id: task.mediaID });
  const urlRaw = info.downloadURL;
  if (!urlRaw) {
    console.warn(
      `Requested to download media ${info.id} [${info.name}], but it did not have a download URL.`,
    );
    process.nextTick(doDownloadMedia);
    return;
  }

  const outputPath = path.join(await ensureMediaPath(), info.name);
  console.log(
    `Starting to download media ${info.id} [${info.name}] to ${outputPath}`,
  );
  const status: DownloadStatus = {
    mediaID: info.id,
    name: info.name,
    status: "downloading",
    progressPercent: 0,
  };
  downloadStatus.set(info.id, status);
  const output = fs.createWriteStream(outputPath);

  try {
    let response;
    try {
      response = await fetch(urlRaw, {
        signal: abortDownload.signal,
      });
    } catch (e) {
      throw new Error("Network error", { cause: e });
    }
    if (response.status !== 200) {
      throw new Error(`Response status code was ${response.status}`);
    }
    if (!response.body) {
      throw new Error("Response body was empty");
    }
    const stream = Readable.fromWeb(response.body);

    await pipeline(
      stream,
      progress(
        {
          length: parseInt(response.headers.get("Content-Length") ?? "0"),
          time: 1000,
        },
        (progress) => {
          status.progressPercent = progress.percentage;
        },
      ),
      output,
    );
  } catch (e) {
    console.error(`Error downloading media ${info.id} [${info.name}]`, e);
    status.status = "error";
    status.error = String(e);
    if (downloadQueue.length > 0) {
      process.nextTick(doDownloadMedia);
    }
    return;
  }

  console.log(`Downloaded media ${info.id} [${info.name}] to ${outputPath}`);
  status.status = "done";
  await updateLocalMediaState(info.id, {
    mediaID: info.id,
    path: outputPath,
  });

  if (downloadQueue.length > 0) {
    process.nextTick(doDownloadMedia);
  }
}

export function downloadMedia(mediaID: number) {
  downloadQueue.push({ mediaID });
  process.nextTick(doDownloadMedia);
}

export function getDownloadStatus() {
  return Array.from(downloadStatus.values());
}
