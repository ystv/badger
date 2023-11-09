import { requirePermission } from "@/lib/auth";
import { Permission } from "@bowser/prisma/client";
import CreateShowForm from "./form";

export default async function CreateShowPage() {
  await requirePermission(Permission.ManageShows);
  return <CreateShowForm />;
}
