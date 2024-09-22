import * as path from "node:path";
import * as fs from "node:fs";
import {
  ContinuityItem,
  Media,
  MediaProcessingTaskState,
  MediaState,
  Rundown,
  RundownItem,
  Show,
} from "@badger/prisma/client";
import * as child_process from "node:child_process";
import * as util from "node:util";
import {
  FFProbeOutput,
  FFProbeOutputWithStreams,
  LoudnormOutput,
} from "./_types.js";
import {
  enableQualityControl,
  failUploadOnQualityControlFail,
} from "@badger/feature-flags";
import { MediaJobCommon } from "./MediaJobCommon.js";
import invariant from "../invariant.js";

const TARGET_LOUDNESS_LUFS = -14;
const TARGET_LOUDNESS_RANGE_LUFS = 4;
const TARGET_TRUE_PEAK_DBTP = -1;

const exec = util.promisify(child_process.exec);

interface CompleteMedia extends Media {
  continuityItems: (ContinuityItem & { show: Show })[];
  rundownItems: (RundownItem & { rundown: Rundown & { show: Show } })[];
}

export default class ProcessMediaJob extends MediaJobCommon {
  constructor() {
    super();

    try {
      child_process.execSync("ffprobe -version");
    } catch (_ignored) {
      throw new Error("ffprobe not found");
    }
  }

  async run(params: PrismaJson.JobPayload) {
    invariant("mediaId" in params, "mediaId is required");
    const media = await this.db.media.findUniqueOrThrow({
      where: {
        id: params.mediaId,
      },
      include: {
        continuityItems: {
          include: {
            show: true,
          },
        },
        rundownItems: {
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

      const warnings = [];

      // Promise.all would cancel the other tasks if one failed, so we use Promise.allSettled instead
      // TODO: Isn't that what we want though?
      const results = await Promise.allSettled([
        (async () => {
          const rawPath = await this._wrapTask(
            media,
            "Uploading source file to storage",
            () =>
              this._uploadFileToS3(
                rawTempPath,
                `media/${media.id}/raw/${media.name}`,
              ),
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
              rundownItems: {
                updateMany: {
                  where: {},
                  data: {
                    durationSeconds: duration,
                  },
                },
              },
              continuityItems: {
                updateMany: {
                  where: {},
                  data: {
                    durationSeconds: duration,
                  },
                },
              },
            },
          });
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

        async () => {
          if (enableQualityControl) {
            const qualityWarnings = await this._wrapTask(
              media,
              "Checking quality",
              () => this._qualityCheck(rawTempPath),
              false,
            );
            if (qualityWarnings.length > 0) {
              warnings.push(...qualityWarnings);
              if (failUploadOnQualityControlFail) {
                await this._updateTaskStatus(
                  media,
                  "Checking quality",
                  MediaProcessingTaskState.Failed,
                  `Problems: ${qualityWarnings.join(", ")}`,
                );
                throw new AggregateError(
                  qualityWarnings.map((e) => new Error(e)),
                );
              } else {
                await this._updateTaskStatus(
                  media,
                  "Checking quality",
                  MediaProcessingTaskState.Warning,
                  `Warnings: ${qualityWarnings.join(", ")}`,
                );
              }
            } else {
              await this._updateTaskStatus(
                media,
                "Checking quality",
                MediaProcessingTaskState.Complete,
              );
            }
          }
        },

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
            () =>
              this._uploadFileToS3(
                normalisedPath,
                `media/${media.id}/final/${media.name}`,
              ),
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
        throw new AggregateError(
          results
            .filter((x) => x.status === "rejected")
            .map((x) => (x as PromiseRejectedResult).reason),
        );
      }
      await this.db.media.update({
        where: {
          id: media.id,
        },
        data: {
          state:
            warnings.length > 0
              ? MediaState.ReadyWithWarnings
              : MediaState.Ready,
        },
      });
      await this.db.show.updateMany({
        where: {
          OR: [
            {
              rundowns: {
                some: {
                  OR: [
                    {
                      items: {
                        some: {
                          mediaId: media.id,
                        },
                      },
                    },
                    {
                      assets: {
                        some: {
                          mediaId: media.id,
                        },
                      },
                    },
                  ],
                },
              },
            },
            {
              continuityItems: {
                some: {
                  mediaId: media.id,
                },
              },
            },
          ],
        },
        data: {
          version: {
            increment: 1,
          },
        },
      });
      await this._cleanupSourceFile(params);
    } catch (e) {
      await this.db.media.update({
        where: {
          id: media.id,
        },
        data: {
          state: MediaState.ProcessingFailed,
        },
      });
      throw e;
    } finally {
      this._deleteTemporaryDir();
    }
  }

  private async _qualityCheck(path: string) {
    // This is safe because we created path in _downloadSourceFile
    const res = await exec(
      `ffprobe -v quiet -print_format json -show_format -show_streams ${path}`,
    );
    const data: FFProbeOutputWithStreams = JSON.parse(res.stdout);

    const issues = [];

    // Audio channels
    const audioStreams = data.streams.filter(
      (x) => x.codec_type === "audio",
    ) as FFProbeOutputWithStreams["streams"];
    if (audioStreams.length === 0) {
      issues.push("No audio");
    } else {
      const channels = audioStreams[0].channels;
      if (channels === 1) {
        issues.push("Mono audio");
      }
    }

    const videoStreams = data.streams.filter(
      (x) => x.codec_type === "video",
    ) as FFProbeOutputWithStreams["streams"];
    if (videoStreams.length === 0) {
      issues.push("No video");
    } else {
      const video = videoStreams[0];
      if (video.width! < 1920 || video.height! < 1080) {
        issues.push(`Low resolution (${video.width}x${video.height})`);
      }
      const fps = parseFloat(video.avg_frame_rate.replace(/\/1$/, ""));
      if (fps < 25) {
        issues.push(`Low framerate (${fps}fps)`);
      }
    }

    return issues;
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
    const cmd1 = `${process.env.FFMPEG_PATH ?? "ffmpeg"} -hide_banner -nostats -loglevel info -i ${rawPath} -af loudnorm=print_format=json -f null -`;
    this.logger.debug("Running: " + cmd1);
    const output = await exec(cmd1);
    // Find the loudnorm output. This is a bit hacky.
    // Look for a line that starts with "{" followed by a newline
    const loudnormStart = output.stderr.indexOf("\n{\n");

    if (loudnormStart === -1) {
      this.logger.warn(output.stderr);
      throw new Error(
        "Could not find loudnorm output - file may have no or corrupt audio",
      );
    }
    const loudnormEnd = output.stderr.indexOf("\n}\n", loudnormStart);
    if (loudnormEnd === -1) {
      this.logger.warn(output.stderr);
      throw new Error(
        "Could not find end of loudnorm output - file may have no or corrupt audio",
      );
    }
    const loudnormJSON = output.stderr.slice(
      loudnormStart + 1,
      loudnormEnd + 2,
    );
    const loudnormData: LoudnormOutput = JSON.parse(loudnormJSON);

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
        process.env.FFMPEG_PATH ?? "ffmpeg",
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
          `measured_I=${Math.min(parseFloat(loudnormData.input_i), 0)}`,
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
          "",
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
    extra: string = "",
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
