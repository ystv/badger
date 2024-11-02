import { app } from "electron/main";
import { AppSettings, AppSettingsSchemaWithDefaults } from "./settings";
import { once, cloneDeep } from "lodash";
import * as fsp from "fs/promises";
import { safeStorage } from "electron";
import { getLogger } from "./logging";
import { inspect } from "util";

const logger = getLogger("settingsStorage");

const path = once(() => app.getPath("userData") + "/settings.json");

type DeepTrue<T> = {
  [K in keyof T]?: T[K] extends object ? DeepTrue<T[K]> : true;
};
const encryptedFields: DeepTrue<AppSettings> = {
  server: {
    password: true,
  },
  obs: {
    password: true,
  },
};

export async function saveSettings(val: AppSettings) {
  await app.whenReady();
  const nv = cloneDeep(val);
  for (const [group, fields] of Object.entries(encryptedFields)) {
    for (const field of Object.keys(fields)) {
      // @ts-expect-error typing is complicated
      const encrypted = safeStorage.encryptString(nv[group][field]);
      // @ts-expect-error typing is complicated
      nv[group][field] = encrypted.toString("base64");
    }
  }
  const data = JSON.stringify(nv, null, 2);
  await fsp.writeFile(path(), data, { encoding: "utf-8", flag: "w" });
  logger.info("Saved settings");
}

export async function loadSettings(): Promise<AppSettings> {
  await app.whenReady();
  let data;
  try {
    data = await fsp.readFile(path(), { encoding: "utf-8" });
  } catch (e) {
    if (
      e instanceof Error &&
      (e as unknown as { code: string }).code === "ENOENT"
    ) {
      return AppSettingsSchemaWithDefaults.parse(undefined);
    }
    throw e;
  }
  const settings = AppSettingsSchemaWithDefaults.safeParse(JSON.parse(data));
  if (!settings.success) {
    logger.error("Failed to parse settings: " + inspect(settings.error));
    return AppSettingsSchemaWithDefaults.parse(undefined);
  }
  // Decrypt encrypted fields
  for (const [group, fields] of Object.entries(encryptedFields)) {
    for (const field of Object.keys(fields)) {
      // @ts-expect-error typing is complicated
      const encrypted = settings.data[group][field];
      const decrypted = safeStorage.decryptString(
        Buffer.from(encrypted, "base64"),
      );
      // @ts-expect-error typing is complicated
      settings.data[group][field] = decrypted;
    }
  }
  return settings.data;
}
