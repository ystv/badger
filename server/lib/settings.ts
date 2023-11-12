import { SettingKey, SettingsCategory } from "@bowser/prisma/client";
import { JsonValue } from "@bowser/prisma/client/runtime/library";
import { db } from "./db";

interface SettingsTypes
  extends Record<SettingsCategory, Record<SettingKey, JsonValue>> {
  [SettingsCategory.YouTube]: {
    [SettingKey.TitleMetadataID]: number;
    [SettingKey.DescriptionMetadataID]: number;
  };
}

const SETTINGS_DEFAULT_VALUES: Record<
  SettingsCategory,
  Partial<Record<SettingKey, JsonValue>>
> = {
  YouTube: {},
};

export async function getSetting<
  C extends SettingsCategory,
  K extends SettingKey,
>(category: C, key: K): Promise<SettingsTypes[C][K] | undefined> {
  const value = await db.setting.findUnique({
    where: {
      category_key: {
        category,
        key,
      },
    },
  });
  if (value) {
    return value.value as SettingsTypes[C][K];
  }

  return SETTINGS_DEFAULT_VALUES[category][key] as
    | SettingsTypes[C][K]
    | undefined;
}
