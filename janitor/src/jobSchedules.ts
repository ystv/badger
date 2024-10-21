import { PeriodicJob } from "./jobUtils";

export const scheduledJobs = [
  new PeriodicJob("DummyTestJob", 120),
];

export async function tickPeriodicJobs() {
  for (const job of scheduledJobs) {
    console.log(`Ticking ${job.type}`);
    await job.tick();
  }
}
