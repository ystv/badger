import "server-only";
import { db } from "./db";
import {
  SETTINGS_DEFAULT_VALUES,
  SettingsTypes,
  SettingsTypesSchema,
} from "./settings";
import { SettingKey } from "@bowser/prisma/client";
import { cache } from "react";

export const getAllSettings = cache(async function _getAllSettings(): Promise<
  Partial<SettingsTypes>
> {
  const rawValues = await db.setting.findMany({});
  const settings = {} as SettingsTypes;
  for (const value of rawValues) {
    // @ts-expect-error we know this is correct, and do a runtime check below
    settings[value.key] = value.value;
  }
  for (const key of Object.keys(SETTINGS_DEFAULT_VALUES) as SettingKey[]) {
    if (settings[key] === undefined) {
      // @ts-expect-error ditto
      settings[key] = SETTINGS_DEFAULT_VALUES[key];
    }
  }
  return SettingsTypesSchema.deepPartial().parse(settings);
});

export async function getSetting<K extends SettingKey>(
  key: K,
): Promise<SettingsTypes[K] | undefined> {
  const vals = await getAllSettings();
  return vals[key];
}
