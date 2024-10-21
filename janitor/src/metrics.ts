import { Counter, Gauge, Registry } from "prom-client";
import { db } from "./db";
import { JobType } from "@badger/prisma/client";

export const registry = new Registry();

registry.registerMetric(
  new Gauge({
    name: "badger_jobs_total",
    help: "Number of jobs by state",
    labelNames: ["state"],
    async collect() {
      const byState = await db.baseJob.groupBy({
        by: "state",
        _count: {
          state: true,
        },
      });
      console.log(byState);
      for (const row of byState) {
        this.set({ state: row.state }, row._count.state);
      }
    },
  })
);

registry.registerMetric(
  new Gauge({
    name: "badger_job_wait_time_seconds_total",
    help: "Total time jobs have been waiting to run",
    labelNames: ["job_type"],
    async collect() {
      const jobs = await db.$queryRaw<
        { jobType: JobType; wait_time: string }[]
      >`
      SELECT "jobType", EXTRACT(EPOCH FROM SUM("startedAt" - "createdAt"))/3600 AS wait_time
      FROM base_jobs
      WHERE "startedAt" IS NOT NULL
      GROUP BY "jobType"
    `;
      for (const row of jobs) {
        this.set({ job_type: row.jobType }, parseFloat(row.wait_time));
      }
    },
  })
);

registry.registerMetric(
  new Gauge({
    name: "badger_job_run_time_seconds_total",
    help: "Total time jobs have taken to run",
    labelNames: ["job_type"],
    async collect() {
      const jobs = await db.$queryRaw<{ jobType: JobType; run_time: string }[]>`
      SELECT "jobType", EXTRACT(EPOCH FROM SUM("completedAt" - "startedAt"))/3600 AS run_time
      FROM base_jobs
      WHERE "completedAt" IS NOT NULL
      GROUP BY "jobType"
    `;
      for (const row of jobs) {
        this.set({ job_type: row.jobType }, parseFloat(row.run_time));
      }
    },
  })
);
