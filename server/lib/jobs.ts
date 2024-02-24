import { dispatchParameterizedJob } from "@/lib/nomad";
import invariant from "@/lib/invariant";
import { enableNomadJobQueue } from "@badger/feature-flags";
import { db } from "@/lib/db";

export async function dispatchJobForJobrunner(baseJobID: number) {
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
