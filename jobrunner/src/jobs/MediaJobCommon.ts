import AbstractJob from "./base";
import * as path from "node:path";
import * as fs from "node:fs";
import invariant from "../invariant";
import got from "got";
import { GetObjectCommand, HeadObjectCommand } from "@aws-sdk/client-s3";
import EasyDL from "easydl";
import { S3ReadStream } from "s3-readstream";
import { pipeline as streamPipeline } from "node:stream/promises";
import { Upload } from "@aws-sdk/lib-storage";

export abstract class MediaJobCommon extends AbstractJob {
  protected async _downloadSourceFile(params: PrismaJson.JobPayload) {
    invariant("sourceType" in params, "sourceType is required");
    const filePath = path.join(this.temporaryDir, "raw");
    switch (params.sourceType) {
      case "Tus": {
        // If Tus is running against a S3 backend, we can download directly from S3
        // for better performance and resumability support
        if (!process.env.TUS_S3_BUCKET) {
          const dl = new EasyDL(
            process.env.TUS_ENDPOINT + "/" + params.source,
            filePath,
          );
          invariant(await dl.wait(), "download did not succeed");
          break;
        }
        //fallthrough
      }

      case "S3": {
        const bucket =
          params.sourceType === "Tus"
            ? process.env.TUS_S3_BUCKET
            : process.env.STORAGE_BUCKET;
        let key = params.source;
        if (params.sourceType === "Tus") {
          // The source will be in the format "<objectID>+<multipartID>"
          // (https://github.com/tus/tusd/blob/e13b64869e7920b17396fd634624ccc88b698d8b/pkg/s3store/s3store.go#L339)
          // we only want the objectID
          key = key.split("+")[0];
        }

        const head = await this.s3Client.send(
          new HeadObjectCommand({
            Bucket: bucket,
            Key: key,
          }),
        );

        const stream = new S3ReadStream({
          command: new GetObjectCommand({
            Bucket: bucket,
            Key: key,
          }),
          s3: this.s3Client,
          maxLength: head.ContentLength!,
          byteRange: 50 * 1024 * 1024, // 50MB
        });
        const output = fs.createWriteStream(filePath);
        await streamPipeline(stream, output);

        if (params.sourceType === "Tus") {
          // Need to clean up
          await got.delete(process.env.TUS_ENDPOINT + "/" + params.source, {
            headers: {
              "Tus-Resumable": "1.0.0",
            },
          });
        }
        break;
      }

      case "GoogleDrive": {
        invariant(false, "Google Drive not supported");
        break;
      }

      default:
        invariant(false, `Invalid sourceType: ${params.sourceType}`);
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

  protected async _cleanupSourceFile(params: PrismaJson.JobPayload) {
    invariant("sourceType" in params, "sourceType is required");
    switch (params.sourceType) {
      case "Tus": {
        await got.delete(process.env.TUS_ENDPOINT + "/" + params.source, {
          headers: {
            "Tus-Resumable": "1.0.0",
          },
        });
        break;
      }
      case "S3":
        // Nothing to do here, it will already be at the expected location
        break;
    }
  }
}
