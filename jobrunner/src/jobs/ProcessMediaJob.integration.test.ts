import { MediaState } from "@badger/prisma/client";
import { it, beforeEach, expect } from "vitest";
import { doOneJob } from "../index.js";
import { integrate } from "@badger/testing";
import * as fs from "fs";
import * as fsp from "fs/promises";
import got from "got";
import pEvent from "p-event";
import { db } from "../db.js";

async function uploadTestFileToTus() {
  if (!process.env.TUS_ENDPOINT) {
    throw new Error("TUS_ENDPOINT not set");
  }
  const sourceStat = await fsp.stat(__dirname + "/testdata/smpte_bars_15s.mp4");
  const sourceFile = fs.createReadStream(
    __dirname + "/testdata/smpte_bars_15s.mp4",
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
    "",
  );
}

integrate("ProcessMediaJob", () => {
  it("works", async () => {
    const testMediaPath = await uploadTestFileToTus();
    const media = await db.media.create({
      data: {
        name: "smpte_bars_15s.mp4",
        durationSeconds: 0,
        rawPath: "",
        continuityItems: {
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
    });
    await db.baseJob.create({
      data: {
        jobType: "ProcessMediaJob",
        jobPayload: {
          mediaId: media.id,
          sourceType: "Tus",
          source: testMediaPath,
        },
      },
    });
    await doOneJob();

    // Post-conditions:
    // 1. media state is Ready
    const media2 = await db.media.findUniqueOrThrow({
      where: {
        id: media.id,
      },
    });
    expect(media2.state).toBe(MediaState.Ready);
    // 2. media2 path and rawPath is set
    expect(media2.path).not.toBe("");
    expect(media2.rawPath).not.toBe("");
    // 3. duration is set
    expect(media2.durationSeconds).toBe(15);
    // 4. original file no longer exists on Tus
    const tusRes = await got.head(
      process.env.TUS_ENDPOINT + "/" + testMediaPath,
      {
        throwHttpErrors: false,
      },
    );
    expect(tusRes.statusCode).not.toBe(200);
  });
});
