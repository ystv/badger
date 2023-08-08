import { JobState, PrismaClient } from "bowser-prisma/client";
import * as os from "os";
import AbstractJob from "./jobs/base.js";
import logging, { LogLevelNames } from "loglevel";
import prefix from "loglevel-plugin-prefix";
import ProcessMediaJob from "./jobs/ProcessMediaJob.js";
import { LoadAssetJob } from "./jobs/LoadAssetJob.js";

logging.setLevel(
  (process.env.LOG_LEVEL as LogLevelNames) ?? logging.levels.DEBUG,
);
prefix.reg(logging);
prefix.apply(logging, {
  template: "[%t] %l (%n):",
});

const hostname = os.hostname();
const workerID = `${hostname}-${Date.now()}`;
const logger = logging.getLogger("main");

const db = new PrismaClient();

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

(async function () {
  logger.info("Starting Job Runner");
  // noinspection InfiniteLoopJS
  while (true) {
    // This SQL grabs the ID of one pending job, and atomically (because of the "SELECT ... FOR UPDATE") marks it as
    // being run by this worker. The SKIP LOCKED avoids lock contention (likely won't be hit at our scale, but it
    // can't hurt).
    const jobID = await db.$queryRaw<{ id: number }[]>`
      UPDATE base_jobs
      SET state = ${JobState.Running}, "workerId" = ${workerID}
      WHERE id = (
          SELECT id FROM base_jobs
            WHERE state = ${JobState.Pending}
            LIMIT 1
            FOR UPDATE SKIP LOCKED
        )
      RETURNING id
    `;
    if (jobID.length === 0) {
      logger.trace("No jobs available, sleeping");
      await sleep(2500);
      continue;
    }
    logger.info(`Claimed job ${jobID[0].id}`);
    const nextJob = await db.baseJob.findUniqueOrThrow({
      where: {
        id: jobID[0].id,
      },
      include: {
        LoadAssetJob: true,
        ProcessMediaJob: true,
      },
    });
    let handler: AbstractJob;
    let payload;
    if (nextJob.ProcessMediaJob) {
      handler = await ProcessMediaJob.init(db);
      payload = nextJob.ProcessMediaJob;
    } else if (nextJob.LoadAssetJob) {
      handler = await LoadAssetJob.init(db);
      payload = nextJob.LoadAssetJob;
    } else {
      // TODO: This assumes that there will never be a jobrunner running that doesn't know how to handle a certain
      //  job type. If we ever introduce heterogeneous jobrunners, this will need to be changed.
      logger.error(`Unknown job type for job ${nextJob.id}`);
      await db.baseJob.update({
        where: {
          id: nextJob.id,
        },
        data: {
          state: JobState.Failed,
        },
      });
      continue;
    }
    try {
      await handler.run(payload);
    } catch (e) {
      logger.error(`Job ${nextJob.id} failed!`);
      logger.error(e);
      await db.baseJob.update({
        where: {
          id: nextJob.id,
        },
        data: {
          state: JobState.Failed,
        },
      });
      continue;
    }
    logger.info(`Job ${nextJob.id} complete`);
    await db.baseJob.update({
      where: {
        id: nextJob.id,
      },
      data: {
        state: JobState.Complete,
        completedAt: new Date(),
      },
    });
  }
})();
