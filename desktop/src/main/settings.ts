import settings from "electron-settings";
import { safeStorage } from "./safeStorage";
import { z } from "zod";
import * as fsp from "fs/promises";
import { AssetTypeSchema } from "bowser-prisma/types";
import { IPCEvents } from "./ipcEventBus";

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

const LocalMediaData = z.object({
  mediaID: z.number(),
  path: z.string(),
});
export type LocalMediaType = z.infer<typeof LocalMediaData>;
export const LocalMediaSettingsSchema = z.array(LocalMediaData);

/**
 * Checks that all the files referenced in the local media state actually exist, and removes them if not.
 */
export async function validateLocalMediaState() {
  const v = await settings.get("localMedia");
  if (v === undefined) {
    console.log(
      "Skipping local media state validation, no local media settings.",
    );
    return;
  }
  let localMediaState = LocalMediaSettingsSchema.parse(v);
  for (const info of localMediaState) {
    try {
      const stat = await fsp.stat(info.path);
      if (!stat.isFile()) {
        console.warn(
          `Local media file ${info.path} is not a file. Removing from settings.`,
        );
        localMediaState = localMediaState.filter((v) => v !== info);
      }
    } catch (e) {
      console.warn(
        `Failed to stat local media file ${info.path}: ${e}. Removing from settings.`,
      );
      localMediaState = localMediaState.filter((v) => v !== info);
    }
  }
  // TODO[BOW-67]: What should we do about files that exist in the local media folder but aren't in the settings?
  //  Two cases - either they match our naming convention, in which case we can probably assume they're
  //  supposed to be there, or they don't - but we shouldn't delete them, to avoid data loss.
  await settings.set("localMedia", localMediaState);
  console.log("Finished validating local media state.");
}

export async function getLocalMediaSettings(): Promise<
  z.infer<typeof LocalMediaSettingsSchema>
> {
  const settingsData = await settings.get("localMedia");
  if (settingsData === undefined) {
    return [];
  }
  return LocalMediaSettingsSchema.parse(settingsData);
}

export async function updateLocalMediaState(
  mediaID: number,
  val: z.infer<typeof LocalMediaData>,
) {
  const localMediaState = await getLocalMediaSettings();
  const newLocalMediaState = localMediaState.filter(
    (v) => v.mediaID !== mediaID,
  );
  newLocalMediaState.push(val);
  await settings.set("localMedia", newLocalMediaState);
}

export const assetsSettingsSchema = z.object({
  loadTypes: z.record(AssetTypeSchema, z.enum(["list", "direct"])),
});
const defaultAssetsSettings: z.infer<typeof assetsSettingsSchema> = {
  loadTypes: {
    Still: "list",
    Graphic: "direct",
    Music: "list",
    SoundEffect: "direct",
  },
};

export async function getAssetsSettings(): Promise<
  z.infer<typeof assetsSettingsSchema>
> {
  const settingsData = await settings.get("assets");
  if (settingsData === undefined) {
    return defaultAssetsSettings;
  }
  return assetsSettingsSchema.parse(settingsData);
}

export async function saveAssetsSettings(
  val: z.infer<typeof assetsSettingsSchema>,
): Promise<void> {
  await settings.set("assets", val);
  IPCEvents.assetsSettingsChange();
}
