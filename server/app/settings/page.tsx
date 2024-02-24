import { requirePermission } from "@/lib/auth";
import { getAllSettings } from "@/lib/settingsValues";
import { SettingsForm } from "./components";
import Link from "next/link";

export default async function SettingsPage() {
  await requirePermission("ManageSystemSettings");
  const values = await getAllSettings();
  return (
    <div>
      <Link href="/">Back</Link>
      <h1 className="text-2xl">Settings</h1>
      <SettingsForm initialValues={values} />
    </div>
  );
}
