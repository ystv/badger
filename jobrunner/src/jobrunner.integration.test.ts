import { JobState } from "@badger/prisma/client";
import { it, beforeEach, expect } from "vitest";
import { db, doOneJob } from "./index.js";
import { integrate } from "@badger/testing";

integrate("doOneJob", () => {
  beforeEach(async () => {
    await db.$executeRawUnsafe(`DELETE FROM "base_jobs"`);
  });
  it("works", async () => {
    await db.baseJob.create({
      data: {
        jobType: "DummyTestJob",
        jobPayload: {},
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
