// noinspection ExceptionCaughtLocallyJS

import * as os from "node:os";
import { getMediaSettings } from "../base/settings";
import * as fsp from "fs/promises";
import * as path from "path";
import { serverApiClient } from "../base/serverApiClient";
import { z } from "zod";
import { IPCEvents } from "../ipcEventBus";
import { downloadFile } from "./downloadFile";
import logging from "../base/logging";

const logger = logging.getLogger("mediaManagement");

const LOCAL_MEDIA_PATH_REGEX = /\(#(\d+)\)/;

export async function getMediaPath(): Promise<string> {
  const settings = await getMediaSettings();
  if (settings) {
    return settings.mediaPath;
  }
  switch (os.platform()) {
    case "win32":
      return "C:\\badger_media";
    case "darwin":
      return `${os.userInfo().homedir}/Movies/Badger Media`;
    case "linux":
      return `${os.userInfo().homedir}/Videos/Badger Media`;
    default:
      throw new Error("Unsupported platform");
  }
}

export async function ensureMediaPath(): Promise<string> {
  const mediaPath = await getMediaPath();
  await fsp.mkdir(mediaPath, { recursive: true });
  return mediaPath;
}

const downloadedMedia = new Map<number, string>();

export function getLocalMedia() {
  return Array.from(downloadedMedia.entries()).map(([mediaID, path]) => ({
    mediaID,
    path,
  }));
}

export async function scanLocalMedia() {
  logger.info("Scanning local media...");
  await ensureMediaPath();
  const files = await fsp.readdir(await getMediaPath());
  for (const file of files) {
    if (file.endsWith(".badgerdownload")) {
      continue; // pending download
    }
    const name = file.replace(path.extname(file), "");
    const match = name.match(LOCAL_MEDIA_PATH_REGEX);
    if (!match) {
      continue;
    }
    downloadedMedia.set(
      Number(match[1]),
      path.join(await getMediaPath(), file),
    );
  }
  logger.info(`Finished local media scan, found ${downloadedMedia.size} items`);
  // TODO[BDGR-67]: Check if any of these are orphans and delete them
}

interface DownloadQueueItem {
  mediaID: number;
}

export const DownloadStatusSchema = z.object({
  mediaID: z.number(),
  name: z.string(),
  status: z.enum(["pending", "downloading", "done", "error"]),
  progressPercent: z.number().optional(),
  error: z.string().optional(),
});
type DownloadStatus = z.infer<typeof DownloadStatusSchema>;

const downloadQueue: DownloadQueueItem[] = [];
const downloadStatus: Map<number, DownloadStatus> = new Map();
let isDownloadRunning = false;

async function doDownloadMedia() {
  if (isDownloadRunning) {
    return;
  }
  // this is JS, no atomicity needed!
  isDownloadRunning = true;
  try {
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
      logger.warn(
        `Requested to download media ${info.id} [${info.name}], but it did not have a download URL.`,
      );
      process.nextTick(doDownloadMedia);
      return;
    }

    // Transforms "foo.mp4" to "foo (#123).mp4"
    const extension = path.extname(info.name);
    const newFileName =
      info.name.slice(0, -extension.length) + ` (#${info.id})` + extension;
    const outputPath = path.join(await ensureMediaPath(), newFileName);
    logger.info(
      `Starting to download media ${info.id} [${newFileName}] to ${outputPath}`,
    );
    const status: DownloadStatus = {
      mediaID: info.id,
      name: newFileName,
      status: "downloading",
      progressPercent: 0,
    };
    downloadStatus.set(info.id, status);
    IPCEvents.send("downloadStatusChange");

    try {
      await downloadFile(urlRaw, outputPath, (progress: number) => {
        status.progressPercent = progress;
        downloadStatus.set(info.id, status);
        IPCEvents.send("downloadStatusChange");
      });
    } catch (e) {
      logger.error(`Error downloading media ${info.id} [${newFileName}]`, e);
      status.status = "error";
      status.error = String(e);
      if (downloadQueue.length > 0) {
        process.nextTick(doDownloadMedia);
      }
      IPCEvents.send("downloadStatusChange");
      return;
    }

    logger.info(
      `Downloaded media ${info.id} [${newFileName}] to ${outputPath}`,
    );
    status.status = "done";
    status.progressPercent = 100;
    downloadStatus.set(info.id, status);

    downloadedMedia.set(info.id, outputPath);
    IPCEvents.send("downloadStatusChange");
    IPCEvents.send("localMediaStateChange");
    logger.trace("IPC sent");

    if (downloadQueue.length > 0) {
      process.nextTick(doDownloadMedia);
    }
  } finally {
    isDownloadRunning = false;
  }
}

export function downloadMedia(mediaID: number, name?: string) {
  downloadQueue.push({ mediaID });
  downloadStatus.set(mediaID, {
    mediaID,
    // NB: This is technically untrusted data, as it's passed in from the renderer. However,
    // this is safe, as this is only used for display purposes - the actual file name is determined
    // (and this is overwritten) in doDownloadMedia after doing a server API fetch.
    name: name ?? "Unknown",
    status: "pending",
  });
  process.nextTick(doDownloadMedia);
}

export function getDownloadStatus() {
  return Array.from(downloadStatus.values());
}

export async function deleteMedia(mediaID: number) {
  const path = downloadedMedia.get(mediaID);
  if (!path) {
    throw new Error(`Media ${mediaID} not found`);
  }
  downloadedMedia.delete(mediaID);
  await fsp.unlink(path);
  logger.info("Deleted", path);
  IPCEvents.send("localMediaStateChange");
}
