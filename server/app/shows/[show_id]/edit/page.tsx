import { requirePermission } from "@/lib/auth";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { EditShowForm } from "./form";

export default async function EditShowDetailsForm({
  params,
}: {
  params: { show_id: string };
}) {
  await requirePermission("ManageShows");
  const show = await db.show.findFirst({
    where: {
      id: parseInt(params.show_id, 10),
    },
  });
  if (!show) {
    notFound();
  }

  return <EditShowForm initialValues={show} />;
}
