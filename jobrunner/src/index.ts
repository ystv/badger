import { JobState, PrismaClient } from "@prisma/client";
import * as os from "os";
import AbstractJob from "./jobs/base.js";
import logging, { LogLevelNames } from "loglevel";
import prefix from "loglevel-plugin-prefix";
import ProcessMediaJob from "./jobs/ProcessMediaJob.js";
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
  while (true) {
    const nextJob = await db.baseJob.findFirst({
      where: {
        workerId: null,
        state: JobState.Pending,
      },
      include: {
        ProcessMediaJob: true,
      },
    });
    if (!nextJob) {
      logger.trace("No jobs available, sleeping");
      await sleep(2500);
      continue;
    }
    logger.info(`Claiming job ${nextJob.id}`);
    await db.baseJob.update({
      where: {
        id: nextJob.id,
      },
      data: {
        workerId: workerID,
        state: JobState.Running,
        startedAt: new Date(),
      },
    });
    let handler: AbstractJob;
    let payload;
    if (nextJob.ProcessMediaJob) {
      handler = await ProcessMediaJob.init(db);
      payload = nextJob.ProcessMediaJob;
    } else {
      logger.error(`Unknown job type for job ${nextJob.id}`);
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
