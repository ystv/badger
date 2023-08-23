import {
  JobState,
  MediaFileSourceType,
  MediaState,
} from "@bowser/prisma/client";
import { it, beforeEach, expect, beforeAll } from "vitest";
import { db, doOneJob } from "../index.js";
import { integrate } from "@bowser/testing";
import * as fs from "fs";
import * as fsp from "fs/promises";
import got from "got";
import { pEvent } from "p-event";
import ProcessMediaJob from "./ProcessMediaJob.js";

async function uploadTestFileToTus() {
  if (!process.env.TUS_ENDPOINT) {
    throw new Error("TUS_ENDPOINT not set");
  }
  const sourceStat = await fsp.stat(__dirname + "/testdata/smpte_bars_15s.mp4");
  const sourceFile = fs.createReadStream(
    __dirname + "/testdata/smpte_bars_15s.mp4"
  );

  const createRes = await got.post(process.env.TUS_ENDPOINT, {
    headers: {
      "Tus-Resumable": "1.0.0",
      "Upload-Length": sourceStat.size.toString(10),
    },
    followRedirect: false,
  });
  if (createRes.statusCode !== 201) {
    throw new Error("Tus rejected creation");
  }

  const uploadReq = await got.stream.patch(createRes.headers.location!, {
    body: sourceFile,
    headers: {
      "Tus-Resumable": "1.0.0",
      "Content-Length": sourceStat.size.toString(10),
      "Upload-Offset": "0",
      "Content-Type": "application/offset+octet-stream",
    },
  });
  const uploadRes = await pEvent(uploadReq, "response");
  if (uploadRes.statusCode !== 204) {
    throw new Error("Tus rejected upload");
  }
  return createRes.headers.location!.replace(
    process.env.TUS_ENDPOINT + "/",
    ""
  );
}

integrate("ProcessMediaJob", () => {
  beforeEach(async () => {
    await db.$executeRawUnsafe(
      `TRUNCATE TABLE "base_jobs" RESTART IDENTITY CASCADE`
    );
  });
  it("works", async () => {
    const testMediaID = await uploadTestFileToTus();
    const job = await db.processMediaJob.create({
      data: {
        sourceType: MediaFileSourceType.Tus,
        source: testMediaID,
        base_job: {
          create: {},
        },
        media: {
          create: {
            name: "smpte_bars_15s.mp4",
            durationSeconds: 0,
            rawPath: "",
            continuityItem: {
              create: {
                name: "Test",
                durationSeconds: 0,
                order: 1,
                show: {
                  create: {
                    name: "Test",
                    start: new Date(),
                  },
                },
              },
            },
          },
        },
      },
    });
    await doOneJob();

    // Post-conditions:
    // 1. media state is Ready
    const media = await db.media.findUniqueOrThrow({
      where: {
        id: job.mediaId,
      },
    });
    expect(media.state).toBe(MediaState.Ready);
    // 2. media path and rawPath is set
    expect(media.path).not.toBe("");
    expect(media.rawPath).not.toBe("");
    // 3. duration is set
    expect(media.durationSeconds).toBe(15);
    // 4. original file no longer exists on Tus
    const tusRes = await got.head(
      process.env.TUS_ENDPOINT + "/" + testMediaID,
      {
        throwHttpErrors: false,
      }
    );
    expect(tusRes.statusCode).not.toBe(200);
  });
});
