import { requirePermission } from "@/lib/auth";
import { db } from "@/lib/db";
import { JobsDataTable } from "./dataTable";

export default async function JobsPage() {
  await requirePermission("ManageJobs");

  const jobs = await db.baseJob.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <>
      <h1 className="text-3xl">Jobs</h1>
      <JobsDataTable data={jobs} />
    </>
  );
}
