import electronSettings from "electron-settings";
import { safeStorage } from "./safeStorage";
import { z } from "zod";

/*
 * In E2E tests we don't want settings to persist between tests, so we use
 * an in-memory store that can be reset by the test harness.
 */

interface SettingsStore {
  get(key: string): Promise<unknown | undefined>;
  set(key: string, value: unknown): Promise<void>;
  unset(key: string): Promise<void>;
}

const testSettingsBacking = new Map<string, unknown>();
const testSettingsStore: SettingsStore = {
  async get(key: string) {
    if (process.env[`__TEST_SETTINGS_${key.toUpperCase()}`]) {
      // TODO[BDGR-175]: validate that this matches the requisite schema
      // Will require slightly refactoring this file to allow getting the schema
      // by name, though as a bonus this should let us avoid duplicating the load/save code
      return JSON.parse(
        process.env[`__TEST_SETTINGS_${key.toUpperCase()}`] as string,
      );
    }
    return testSettingsBacking.get(key);
  },
  async set(key: string, value: unknown) {
    testSettingsBacking.set(key, value);
  },
  async unset(key: string) {
    testSettingsBacking.delete(key);
  },
};

const settings: SettingsStore =
  process.env.E2E_TEST === "true" ? testSettingsStore : electronSettings;

export async function migrateSettings() {
  await settings.unset("localMedia");
}

/**
 * Since settings are stored as JSON files on disk, we pass them through zod as a sanity check.
 */
const ServerSettingsSchema = z.object({
  endpoint: z.string().url(),
  password: z.string(),
});

export async function getServerSettings(): Promise<z.infer<
  typeof ServerSettingsSchema
> | null> {
  const settingsDataRaw = await settings.get("server");
  if (settingsDataRaw === undefined) {
    return null;
  }
  const settingsData = ServerSettingsSchema.parse(settingsDataRaw);
  settingsData.password = safeStorage.decryptString(
    Buffer.from(settingsData.password, "base64"),
  );
  return settingsData;
}

export async function saveServerSettings(
  valRaw: z.infer<typeof ServerSettingsSchema>,
): Promise<void> {
  const val = { ...valRaw };
  val.password = safeStorage.encryptString(val.password).toString("base64");
  await settings.set("server", val);
}

const OBSSettingsSchema = z.object({
  host: z.string(),
  port: z.number(),
  password: z.string(),
});
export type OBSSettings = z.infer<typeof OBSSettingsSchema>;

export async function getOBSSettings(): Promise<z.infer<
  typeof OBSSettingsSchema
> | null> {
  const settingsDataRaw = await settings.get("obs");
  if (settingsDataRaw === undefined) {
    return null;
  }
  const settingsData = OBSSettingsSchema.parse(settingsDataRaw);
  settingsData.password = safeStorage.decryptString(
    Buffer.from(settingsData.password, "base64"),
  );
  return settingsData;
}

export async function saveOBSSettings(
  valIn: z.infer<typeof OBSSettingsSchema>,
): Promise<void> {
  const val = { ...valIn };
  val.password = safeStorage.encryptString(val.password).toString("base64");
  await settings.set("obs", val);
}

const MediaSettingsSchema = z.object({
  mediaPath: z.string(),
});

export async function getMediaSettings(): Promise<z.infer<
  typeof MediaSettingsSchema
> | null> {
  const settingsData = await settings.get("media");
  if (settingsData === undefined) {
    return null;
  }
  return MediaSettingsSchema.parse(settingsData);
}

export async function saveMediaSettings(
  val: z.infer<typeof MediaSettingsSchema>,
): Promise<void> {
  await settings.set("media", val);
}

export const devToolsConfigSchema = z.object({
  enabled: z.boolean(),
});
export type DevToolsConfigType = z.infer<typeof devToolsConfigSchema>;

export async function getDevToolsConfig(): Promise<
  z.infer<typeof devToolsConfigSchema>
> {
  const settingsData = await settings.get("devTools");
  if (settingsData === undefined) {
    return { enabled: false };
  }
  return devToolsConfigSchema.parse(settingsData);
}

export async function saveDevToolsConfig(
  val: z.infer<typeof devToolsConfigSchema>,
): Promise<void> {
  await settings.set("devTools", val);
}

export const ontimeSettingsSchema = z.object({
  host: z.string().url(),
});
export type OntimeSettings = z.infer<typeof ontimeSettingsSchema>;

export async function getOntimeSettings(): Promise<OntimeSettings | null> {
  const settingsData = await settings.get("ontime");
  if (settingsData === undefined) {
    return null;
  }
  return ontimeSettingsSchema.parse(settingsData);
}

export async function saveOntimeSettings(val: OntimeSettings): Promise<void> {
  await settings.set("ontime", val);
}

export const downloadsSettingsSchema = z.object({
  downloader: z.enum(["Auto", "Node", "Curl"]),
});

export type DownloadsSettings = z.infer<typeof downloadsSettingsSchema>;

export async function getDownloadsSettings(): Promise<DownloadsSettings> {
  const settingsData = await settings.get("downloads");
  if (settingsData === undefined) {
    return { downloader: "Auto" };
  }
  return downloadsSettingsSchema.parse(settingsData);
}

export async function saveDownloadsSettings(
  val: DownloadsSettings,
): Promise<void> {
  await settings.set("downloads", val);
}

export const itemLoadingSettingsSchema = z.object({
  rundownItems: z.enum(["obs", "vmix"]).default("vmix"),
  continuityItems: z.enum(["obs", "vmix"]).default("obs"),
  assets: z.enum(["obs", "vmix"]).default("vmix"),
});
export type ItemLoadingSettings = z.infer<typeof itemLoadingSettingsSchema>;

export async function getItemLoadingSettings(): Promise<ItemLoadingSettings> {
  const settingsData = await settings.get("itemLoading");
  if (settingsData === undefined) {
    return itemLoadingSettingsSchema.parse({});
  }
  return itemLoadingSettingsSchema.parse(settingsData);
}

export async function saveItemLoadingSettings(
  val: ItemLoadingSettings,
): Promise<void> {
  await settings.set("itemLoading", val);
}
