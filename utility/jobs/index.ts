import { dispatchParameterizedJob } from "./nomad";
import invariant from "./invariant";
import { enableNomadJobQueue } from "@badger/feature-flags";
import { type PrismaClient } from "@badger/prisma/client";

export async function dispatchJobForJobrunner(db: PrismaClient, baseJobID: number) {
  if (!enableNomadJobQueue) {
    // The DB acts as its own queueing mechanism if Nomad job management is disabled.
    return;
  }
  invariant(
    process.env.NOMAD_JOBRUNNER_JOB_ID,
    "NOMAD_JOBRUNNER_JOB_ID is not set",
  );
  const res = await dispatchParameterizedJob(
    process.env.NOMAD_JOBRUNNER_JOB_ID!,
    { job_id: baseJobID.toString(10) },
    undefined,
    baseJobID.toString(),
  );
  await db.baseJob.update({
    where: {
      id: baseJobID,
    },
    data: {
      externalJobProvider: "nomad",
      externalJobID: res.DispatchedJobID,
    },
  });
}
