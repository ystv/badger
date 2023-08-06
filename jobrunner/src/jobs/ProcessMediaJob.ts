import * as os from "node:os";
import * as path from "node:path";
import * as fs from "node:fs";
import { pipeline as streamPipeline } from "node:stream/promises";
import AbstractJob from "./base.js";
import {
  ContinuityItem,
  Media,
  MediaFileSourceType,
  MediaProcessingTaskState,
  MediaState,
  ProcessMediaJob as ProcessMediaJobType,
  Rundown,
  RundownItem,
  Show,
} from "@prisma/client";
import got, { Response as GotResponse } from "got";
import * as child_process from "node:child_process";
import * as util from "node:util";
import { pEvent } from "p-event";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { drive, drive_v3 } from "@googleapis/drive";
import { FFProbeOutput, LoudnormOutput } from "./_types.js";

const TARGET_LOUDNESS_LUFS = -14;
const TARGET_LOUDNESS_RANGE_LUFS = 4;
const TARGET_TRUE_PEAK_DBTP = -1;

const exec = util.promisify(child_process.exec);

interface CompleteMedia extends Media {
  continuityItem: null | (ContinuityItem & { show: Show });
  rundownItem: null | (RundownItem & { rundown: Rundown & { show: Show } });
}

export default class ProcessMediaJob extends AbstractJob<ProcessMediaJobType> {
  constructor() {
    super();

    try {
      child_process.execSync("ffprobe -version");
    } catch (e) {
      throw new Error("ffprobe not found");
    }
  }

  async run(params: ProcessMediaJobType) {
    const media: CompleteMedia = await this.db.media.findUniqueOrThrow({
      where: {
        id: params.mediaId,
      },
      include: {
        continuityItem: {
          include: {
            show: true,
          },
        },
        rundownItem: {
          include: {
            rundown: {
              include: {
                show: true,
              },
            },
          },
        },
      },
    });
    await this.db.media.update({
      where: {
        id: media.id,
      },
      data: {
        state: MediaState.Processing,
      },
    });
    try {
      const rawTempPath = await this._wrapTask(
        media,
        "Downloading source file",
        () => this._downloadSourceFile(params),
        true,
      );
      const results = await Promise.allSettled([
        (async () => {
          const rawPath = await this._wrapTask(
            media,
            "Uploading source file to storage",
            () => this._uploadFileToS3(rawTempPath, "raw", media),
            true,
          );
          await this.db.media.update({
            where: {
              id: media.id,
            },
            data: {
              rawPath,
            },
          });
        })(),
        (async () => {
          await this._updateTaskStatus(
            media,
            "Determining duration",
            MediaProcessingTaskState.Running,
          );
          const duration = await this._wrapTask(
            media,
            "Determining duration",
            () => this._determineDuration(rawTempPath),
            false,
          );
          await this.db.media.update({
            where: {
              id: media.id,
            },
            data: {
              durationSeconds: duration,
            },
          });
          if (media.continuityItem) {
            await this.db.continuityItem.update({
              where: {
                id: media.continuityItem.id,
              },
              data: {
                durationSeconds: duration,
              },
            });
          }
          if (media.rundownItem) {
            await this.db.rundownItem.update({
              where: {
                id: media.rundownItem.id,
              },
              data: {
                durationSeconds: duration,
              },
            });
          }
          const durationMMSS = `${Math.floor(duration / 60)}:${(
            "0" + Math.floor(duration % 60)
          ).slice(-2)}`;
          await this._updateTaskStatus(
            media,
            "Determining duration",
            MediaProcessingTaskState.Complete,
            `Duration: ${durationMMSS}`,
          );
        })(),
        (async () => {
          const normalisedPath = await this._wrapTask(
            media,
            "Normalising loudness",
            () =>
              this._normaliseLoudness(rawTempPath, path.extname(media.name)),
            true,
          );
          const finalS3Path = await this._wrapTask(
            media,
            "Uploading processed file",
            () => this._uploadFileToS3(normalisedPath, "final", media),
            true,
          );
          await this.db.media.update({
            where: {
              id: media.id,
            },
            data: {
              path: finalS3Path,
            },
          });
        })(),
      ]);
      if (results.some((x) => x.status === "rejected")) {
        results
          .filter((x) => x.status === "rejected")
          .forEach((x) => {
            this.logger.error(
              "Task failed",
              (x as PromiseRejectedResult).reason,
            );
          });
        await this.db.media.update({
          where: {
            id: media.id,
          },
          data: {
            state: MediaState.ProcessingFailed,
          },
        });
        return;
      }
      await this.db.media.update({
        where: {
          id: media.id,
        },
        data: {
          state: MediaState.Ready,
        },
      });
      if (media.rundownItem) {
        await this.db.rundownItem.update({
          where: {
            id: media.rundownItem.id,
          },
          data: {
            rundown: {
              update: {
                show: {
                  update: {
                    version: {
                      increment: 1,
                    },
                  },
                },
              },
            },
          },
        });
      } else if (media.continuityItem) {
        await this.db.continuityItem.update({
          where: {
            id: media.continuityItem.id,
          },
          data: {
            show: {
              update: {
                version: {
                  increment: 1,
                },
              },
            },
          },
        });
      }
    } finally {
      this._deleteTemporaryDir();
    }
  }

  private async _downloadSourceFile(params: ProcessMediaJobType) {
    const filePath = path.join(this.temporaryDir, "raw");
    const output = fs.createWriteStream(filePath);
    let stream: NodeJS.ReadableStream;
    switch (params.sourceType) {
      case MediaFileSourceType.Tus:
        stream = got.stream.get(process.env.TUS_ENDPOINT + "/" + params.source);
        (await pEvent(stream, "response")) as GotResponse; // this ensures that any errors are thrown
        break;

      case MediaFileSourceType.GoogleDrive:
        const res = await this.driveClient.files.get(
          {
            fileId: params.source,
            alt: "media",
          },
          {
            responseType: "stream",
          },
        );
        stream = res.data;
        break;

      default:
        throw new Error("Unknown source type");
    }
    await streamPipeline(stream, output);
    return filePath;
  }

  private async _determineDuration(path: string) {
    // This is safe because we created path in _downloadSourceFile
    const res = await exec(
      `ffprobe -v error -print_format json -show_format ${path}`,
    );
    const data: FFProbeOutput = JSON.parse(res.stdout);
    return parseFloat(data.format.duration);
  }

  private async _normaliseLoudness(rawPath: string, extension: string) {
    // Step 1: determine the loudness of the file
    const output = await exec(
      `ffmpeg -hide_banner -nostats -loglevel info -i ${rawPath} -af loudnorm=print_format=json -f null -`,
    );
    // Find the loudnorm output. It's a bit of JSON immediately after a line like `[Parsed_loudnorm_0 @ 0x600003670fd0]`
    const loudnormJSON =
      /(?<=\[Parsed_loudnorm_0 @ 0x[0-9a-f]+]\s*\n)[\s\S]*/.exec(output.stderr);
    if (!loudnormJSON) {
      this.logger.warn(output.stderr);
      throw new Error("Could not find loudnorm output");
    }
    const loudnormData: LoudnormOutput = JSON.parse(loudnormJSON[0]);

    // Ensure we don't fail if the file has no audio at all
    if (loudnormData.input_i === "-inf") {
      this.logger.warn("File has no audio");
      return rawPath;
    }

    // Step 2: renormalise
    const normalisedPath = path.join(
      this.temporaryDir,
      "normalised" + extension,
    );
    await exec(
      [
        "ffmpeg",
        "-hide_banner",
        "-nostats",
        "-loglevel error",
        "-i",
        rawPath,
        "-af",
        `loudnorm=${[
          `I=${TARGET_LOUDNESS_LUFS}`,
          `LRA=${TARGET_LOUDNESS_RANGE_LUFS}`,
          `TP=${TARGET_TRUE_PEAK_DBTP}`,
          `measured_I=${loudnormData.input_i}`,
          `measured_LRA=${loudnormData.input_lra}`,
          `measured_TP=${loudnormData.input_tp}`,
          `measured_thresh=${loudnormData.input_thresh}`,
          `offset=${loudnormData.target_offset}`,
        ].join(":")}`,
        "-ar",
        "48000",
        "-ac",
        "2",
        "-c:a",
        "aac",
        "-b:a",
        "192k",
        "-c:v",
        "copy",
        normalisedPath,
      ].join(" "),
    );
    return normalisedPath;
  }

  private async _uploadFileToS3(
    path: string,
    fileType: "raw" | "final",
    item: CompleteMedia,
  ) {
    const stream = fs.createReadStream(path);
    const s3Path = item.continuityItem
      ? `shows/${item.continuityItem.show.id}/continuity/${item.continuityItem.id}/${fileType}/${item.name}`
      : item.rundownItem
      ? `shows/${item.rundownItem.rundown.show.id}/rundown/${item.rundownItem.rundown.id}/${item.rundownItem.id}/${fileType}/${item.name}`
      : null;
    if (!s3Path) {
      throw new Error(
        "Impossible: media item without either continuity or rundown item parent",
      );
    }
    const command = new PutObjectCommand({
      Bucket: process.env.STORAGE_BUCKET,
      Key: s3Path,
      Body: stream,
    });
    await this.s3Client.send(command);
    return s3Path;
  }

  /**
   * Wrap a task in a try/catch block that updates the start and end of the task.
   * @private
   */
  private async _wrapTask<T>(
    media: CompleteMedia,
    descr: string,
    task: () => Promise<T>,
    autoComplete: boolean,
  ): Promise<T> {
    await this._updateTaskStatus(
      media,
      descr,
      MediaProcessingTaskState.Running,
    );
    try {
      const r = await task();
      if (autoComplete) {
        await this._updateTaskStatus(
          media,
          descr,
          MediaProcessingTaskState.Complete,
        );
      }
      return r;
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : String(e);
      await this._updateTaskStatus(
        media,
        descr,
        MediaProcessingTaskState.Failed,
        errorMessage,
      );
      throw e;
    }
  }

  private async _updateTaskStatus(
    media: CompleteMedia,
    descr: string,
    state: MediaProcessingTaskState,
    extra?: string,
  ) {
    this.logger.info(`[${media.id}] ${descr}: ${state} ${extra}`);
    await this.db.mediaProcessingTask.upsert({
      where: {
        media_id_description: {
          media_id: media.id,
          description: descr,
        },
      },
      create: {
        media: {
          connect: {
            id: media.id,
          },
        },
        description: descr,
        state,
        additionalInfo: extra,
      },
      update: {
        state,
        additionalInfo: extra,
      },
    });
  }

  private _deleteTemporaryDir() {
    fs.rmSync(this.temporaryDir, { recursive: true });
  }
}
