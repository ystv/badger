// noinspection ExceptionCaughtLocallyJS

import * as os from "node:os";
import * as fsp from "fs/promises";
import * as path from "path";
import { serverAPI } from "../base/serverApiClient";
import { downloadFile } from "./downloadFile";
import logging from "../base/logging";
import { DOWNLOADING_FILE_SUFFIX, LOCAL_MEDIA_PATH_REGEX } from "./constants";
import invariant from "../../common/invariant";

export interface LocalMediaItem {
  mediaID: number;
  path: string;
  sizeBytes: number;
}

const logger = logging.getLogger("mediaManagement");

export function getDefaultMediaPath() {
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

export type MediaDownloadState = "pending" | "downloading" | "done" | "error";

export async function doDownloadMedia(
  task: { mediaID: number },
  mediaPath: string,
  onProgress: (
    state: MediaDownloadState,
    progress: number,
    fileName: string,
  ) => void,
) {
  const serverApiClient = serverAPI();
  const info = await serverApiClient.media.get.query({ id: task.mediaID });
  const urlRaw = info.downloadURL;
  invariant(
    urlRaw,
    `Requested to download media ${info.id} [${info.name}], but it did not have a download URL.`,
  );

  // Transforms "foo.mp4" to "foo (#123).mp4"
  const extension = path.extname(info.name);
  const newFileName =
    info.name.slice(0, -extension.length) + ` (#${info.id})` + extension;
  const outputPath = path.join(mediaPath, newFileName);
  logger.info(
    `Starting to download media ${info.id} [${newFileName}] to ${outputPath}`,
  );
  onProgress("downloading", 0, newFileName);

  try {
    await downloadFile(urlRaw, outputPath, (progress: number) => {
      onProgress("downloading", progress, newFileName);
    });
  } catch (e) {
    throw new Error(`Failed to download media ${info.id} [${newFileName}]`, {
      cause: e,
    });
  }

  logger.info(`Downloaded media ${info.id} [${newFileName}] to ${outputPath}`);
  onProgress("done", 100, newFileName);
  const stat = await fsp.stat(outputPath);
  return {
    outputPath,
    sizeBytes: stat.size,
  };
}

export async function scanLocalMedia(mediaPath: string) {
  logger.info("Scanning local media...");

  const files = await fsp.readdir(mediaPath);
  const result: LocalMediaItem[] = (
    await Promise.all(
      files.map(async (file) => {
        if (file.endsWith(DOWNLOADING_FILE_SUFFIX)) {
          return null;
        }
        const name = file.replace(path.extname(file), "");
        const match = name.match(LOCAL_MEDIA_PATH_REGEX);
        if (!match) {
          return null;
        }
        const stat = await fsp.stat(path.join(mediaPath, file));
        return {
          mediaID: parseInt(match[1], 10),
          path: file,
          sizeBytes: stat.size,
        };
      }),
    )
  ).filter((v) => !!v);
  logger.info(`Finished local media scan, found ${result.length} items`);
  // TODO[BDGR-67]: Check if any of these are orphans and delete them
  return result;
}
