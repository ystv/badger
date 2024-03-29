import { JobState } from "@badger/prisma/client";
import { it, beforeEach, expect } from "vitest";
import { db, doOneJob } from "./index.js";
import { integrate } from "@badger/testing";

integrate("doOneJob", () => {
  beforeEach(async () => {
    await db.$executeRawUnsafe(`DELETE FROM "base_jobs"`);
  });
  it("works", async () => {
    await db.dummyTestJob.create({
      data: {
        base_job: {
          create: {},
        },
      },
    });
    await doOneJob();
    const [baseJobs] = await db.$transaction([db.baseJob.findMany()], {
      isolationLevel: "Serializable",
    });
    expect(baseJobs).toHaveLength(1);
    expect(baseJobs[0].state).toBe(JobState.Complete);
  });
});
