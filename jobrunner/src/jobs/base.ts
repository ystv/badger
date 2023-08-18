import { PrismaClient } from "@bowser/prisma/client";
import { Logger, default as logging } from "loglevel";
import { S3Client } from "@aws-sdk/client-s3";
import { drive, drive_v3 } from "@googleapis/drive";
import path from "node:path";
import os from "node:os";
import fs from "node:fs";

export default abstract class AbstractJob<TParams = unknown> {
  protected db!: PrismaClient;
  protected logger!: Logger;
  protected s3Client: S3Client;
  protected driveClient: drive_v3.Drive;
  protected temporaryDir: string;

  abstract run(params: TParams): Promise<void>;

  protected constructor() {
    this.s3Client = new S3Client({
      endpoint: process.env.S3_ENDPOINT,
      region: process.env.S3_REGION,
      forcePathStyle: true,
    });

    this.driveClient = drive({
      version: "v3",
    });

    const dir = path.join(os.tmpdir(), "bowser-jobrunner-" + Date.now());
    fs.mkdirSync(dir, { recursive: true });
    this.temporaryDir = dir;
  }

  public static async init<T extends AbstractJob = AbstractJob>(
    this: { new (): T },
    db: PrismaClient,
  ) {
    const job = new this();
    job.db = db;
    job.logger = logging.getLogger(this.name);
    return job;
  }
}
