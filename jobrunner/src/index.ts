import dotenv from "dotenv-flow";
import { parseArgs } from "node:util";
import { JobState, PrismaClient } from "bowser-prisma/client";
import * as os from "os";
import AbstractJob from "./jobs/base.js";
import logging, { LogLevelNames } from "loglevel";
import prefix from "loglevel-plugin-prefix";
import ProcessMediaJob from "./jobs/ProcessMediaJob.js";
import { LoadAssetJob } from "./jobs/LoadAssetJob.js";
import DummyTestJob from "./jobs/DummyTestJob.js";

dotenv.config();
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

// Only exported for testing
export const db = new PrismaClient();

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Run a single job to completion. Note that this assumes that the job has already been claimed, and will not
 * update the "worker" field or set the state to processing. It will, however, update the state to completed or failed.
 * @param jobID
 */
async function doJob(jobID: number) {
  const nextJob = await db.baseJob.findUniqueOrThrow({
    where: {
      id: jobID,
    },
    include: {
      LoadAssetJob: true,
      ProcessMediaJob: true,
      DummyTestJob: true,
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
  } else if (nextJob.DummyTestJob) {
    handler = await DummyTestJob.init(db);
    payload = nextJob.DummyTestJob;
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
    return;
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
    return;
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

// Only exported for testing
export async function doOneJob() {
  // This SQL grabs the ID of one pending job, and atomically (because of the "SELECT ... FOR UPDATE") marks it as
  // being run by this worker. The SKIP LOCKED avoids lock contention (likely won't be hit at our scale, but it
  // can't hurt).
  const jobID = await db.$queryRaw<{ id: number }[]>`
      UPDATE base_jobs
      SET state = ${JobState.Running}::job_state, "workerId" = ${workerID}
      WHERE id = (
          SELECT id FROM base_jobs
            WHERE state = ${JobState.Pending}::job_state
            LIMIT 1
            FOR UPDATE SKIP LOCKED
        )
      RETURNING id
    `;
  if (jobID.length === 0) {
    logger.trace("No jobs available, sleeping");
    return;
  }
  logger.info(`Claimed job ${jobID[0].id}`);

  await doJob(jobID[0].id);
}

if (require.main === module || (import.meta as any).main) {
  (async function () {
    const args = parseArgs({
      options: {
        watch: {
          type: "boolean",
          default: false,
          short: "w",
        },
        job: {
          type: "string",
          short: "j",
        },
        force: {
          type: "boolean",
          default: false,
        },
      },
    });
    if (args.values.job) {
      if (args.values.force) {
        console.warn("Forcibly claiming job!");
        await db.$executeRaw`
          UPDATE base_jobs
          SET state      = ${JobState.Pending}::job_state,
              "workerId" = ${workerID}
          WHERE id = ${parseInt(args.values.job, 10)}
        `;
      } else {
        const rows = await db.$executeRaw`
          UPDATE base_jobs
          SET state      = ${JobState.Pending}::job_state,
              "workerId" = ${workerID}
          WHERE id = ${parseInt(args.values.job, 10)}
            AND "workerId" IS NULL
        `;
        if (rows === 0) {
          logger.error(
            `Job ${args.values.job} is already claimed by another worker. To forcibly claim it, use --force - ` +
              `but only do this if you're sure that the other worker is dead!`,
          );
          process.exit(1);
        }
      }
      await doJob(parseInt(args.values.job, 10));
    }
    if (args.values.watch) {
      if (args.values.force) {
        console.error("Cannot use --force with --watch");
        process.exit(1);
      }
      logger.info("Starting Job Runner");
      // noinspection InfiniteLoopJS
      while (true) {
        await doOneJob();
        await sleep(2500);
      }
    }
    console.error("Either --watch or --job must be specified");
    process.exit(1);
  })();
}
