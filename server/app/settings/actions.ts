"use server";

import { FormResponse } from "@/components/Form";
import { zodErrorResponse } from "@/components/FormServerHelpers";
import { requirePermission } from "@/lib/auth";
import { db } from "@/lib/db";
import {
  SETTINGS_DEFAULT_VALUES,
  SettingsTypes,
  SettingsTypesSchema,
} from "@/lib/settings";
import { SettingKey } from "@bowser/prisma/client";
import { revalidatePath } from "next/cache";

export async function updateSettings(vals: unknown): Promise<FormResponse> {
  await requirePermission("ManageSystemSettings");
  const res = SettingsTypesSchema.partial().safeParse(vals);
  if (!res.success) {
    return zodErrorResponse(res.error);
  }
  await db.$transaction(async ($db) => {
    const curVals = await $db.setting.findMany({});
    for (const [key, newVal] of Object.entries(res.data) as [
      SettingKey,
      SettingsTypes[SettingKey],
    ][]) {
      const curVal = curVals.find((v) => v.key === key);
      if (curVal) {
        await $db.setting.update({
          where: { id: curVal.id },
          data: { value: newVal },
        });
      } else {
        // Only create it if it's not the default
        const def = SETTINGS_DEFAULT_VALUES[key];
        if (def !== newVal) {
          await $db.setting.create({
            data: {
              key,
              value: newVal,
            },
          });
        }
      }
    }
  });
  revalidatePath("/settings");
  return { ok: true };
}
