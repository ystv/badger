import { JobType } from "@badger/prisma/client";
import { dispatchJobForJobrunner } from "@badger/jobs";
import { db } from "./db";

export async function getLastRunTime(type: JobType) {
  const res = await db.baseJob.findFirst({
    where: {
      jobType: type,
      manuallyTriggered: { not: true },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 1,
    select: {
      createdAt: true,
    },
  });
  if (!res) {
    return new Date(0);
  }
  return res.createdAt;
}

export class PeriodicJob {
  constructor(
    public readonly type: JobType,
    public readonly intervalMinutes: number,
  ) {}
  
  public async tick() {
    const lastRun = await getLastRunTime(this.type);
    const nextRun = new Date(lastRun.getTime() + this.intervalMinutes * 60 * 1000);
    if (nextRun > new Date()) {
      console.debug(`Skipping ${this.type} because it is not time yet`);
      return;
    }
    const pending = await db.baseJob.findFirst({
      where: {
        jobType: this.type,
        state: "Pending",
      },
    });
    if (pending) {
      console.log(`Skipping ${this.type} because there is already a pending job`);
      return;
    }
    console.log(`Dispatching ${this.type}`);
    const job = await db.baseJob.create({
      data: {
        jobType: this.type,
        jobPayload: {},
      },
    });
    await dispatchJobForJobrunner(db, job.id);
    console.log(`Dispatched ${this.type}#${job.id}`);
  }
}
