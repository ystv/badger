import { JobState } from "@bowser/prisma/client";
import { it, beforeEach, expect } from "vitest";
import { db, doOneJob } from "./index.js";
import { integrate } from "@bowser/testing";

integrate("doOneJob", () => {
  beforeEach(async () => {
    await db.$executeRawUnsafe(
      `TRUNCATE TABLE "base_jobs" RESTART IDENTITY CASCADE`
    );
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
