// Copy of settingsStorage.ts but doesn't use Electron.
import { AppSettings, SettingsStateSchema } from "./settings";
import { once, cloneDeep } from "lodash";
import * as fsp from "fs/promises";
import { getLogger } from "./logging";
import { inspect } from "util";
import * as nodePath from "path";

const logger = getLogger("settingsStorage.dev");

const dir = nodePath.join(process.cwd(), ".dev");
const path = once(() => nodePath.join(dir, "settings.json"));

export async function saveSettings(val: AppSettings) {
  const nv = cloneDeep(val);
  const data = JSON.stringify(nv, null, 2);
  await fsp.mkdir(dir, { recursive: true });
  await fsp.writeFile(path(), data, { encoding: "utf-8", flag: "w" });
  logger.info("Saved settings");
}

export async function loadSettings(): Promise<AppSettings> {
  let data;
  try {
    data = await fsp.readFile(path(), { encoding: "utf-8" });
  } catch (e) {
    if (
      e instanceof Error &&
      (e as unknown as { code: string }).code === "ENOENT"
    ) {
      return SettingsStateSchema.parse(undefined);
    }
    throw e;
  }
  const settings = SettingsStateSchema.safeParse(JSON.parse(data));
  if (!settings.success) {
    logger.error("Failed to parse settings: " + inspect(settings.error));
    return SettingsStateSchema.parse(undefined);
  }
  return settings.data;
}
