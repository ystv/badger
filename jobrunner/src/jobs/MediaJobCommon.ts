import {
  Asset,
  LoadAssetJob,
  MediaFileSourceType,
  ProcessMediaJob,
  Rundown,
} from "@bowser/prisma/client";
import AbstractJob from "./base";
import * as path from "node:path";
import * as fs from "node:fs";
import invariant from "../invariant";
import got from "got";
import { GetObjectCommand, HeadObjectCommand } from "@aws-sdk/client-s3";
import { expectNever } from "ts-expect";
import EasyDL from "easydl";
import { S3ReadStream } from "s3-readstream";
import { pipeline as streamPipeline } from "node:stream/promises";
import { Upload } from "@aws-sdk/lib-storage";

export abstract class MediaJobCommon extends AbstractJob<
  ProcessMediaJob | LoadAssetJob
> {
  protected async _downloadSourceFile(params: ProcessMediaJob | LoadAssetJob) {
    const filePath = path.join(this.temporaryDir, "raw");
    switch (params.sourceType) {
      case MediaFileSourceType.Tus: {
        const dl = new EasyDL(
          process.env.TUS_ENDPOINT + "/" + params.source,
          filePath,
        );
        invariant(await dl.wait(), "download did not succeed");

        await got.delete(process.env.TUS_ENDPOINT + "/" + params.source, {
          headers: {
            "Tus-Resumable": "1.0.0",
          },
        });
        break;
      }

      case MediaFileSourceType.GoogleDrive: {
        invariant(false, "Google Drive not supported");
        break;
      }

      case MediaFileSourceType.S3: {
        const head = await this.s3Client.send(
          new HeadObjectCommand({
            Bucket: process.env.STORAGE_BUCKET,
            Key: params.source,
          }),
        );

        const stream = new S3ReadStream({
          command: new GetObjectCommand({
            Bucket: process.env.STORAGE_BUCKET,
            Key: params.source,
          }),
          s3: this.s3Client,
          maxLength: head.ContentLength!,
          byteRange: 10 * 1024 * 1024, // 10MB
        });
        const output = fs.createWriteStream(filePath);
        await streamPipeline(stream, output);
        break;
      }

      default:
        expectNever(params.sourceType);
    }

    return filePath;
  }

  protected async _uploadFileToS3(path: string, s3Path: string) {
    const stream = fs.createReadStream(path);
    const upload = new Upload({
      client: this.s3Client,
      params: {
        Bucket: process.env.STORAGE_BUCKET,
        Key: s3Path,
        Body: stream,
      },
      leavePartsOnError: false,
    });
    await upload.done();
    return s3Path;
  }
}
