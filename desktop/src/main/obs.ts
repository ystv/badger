import OBSWebSocket from "obs-websocket-js";
import { getOBSSettings, saveOBSSettings } from "./settings";

export interface Scene {
  sceneIndex: number;
  sceneName: string;
}

export interface SceneItem {
  inputKind: string;
  isGroup: null;
  sceneItemBlendMode: string;
  sceneItemEnabled: boolean;
  sceneItemId: number;
  sceneItemIndex: number;
  sceneItemLocked: boolean;
  sceneItemTransform: unknown; // TODO {alignment: 5, boundsAlignment: 0, boundsHeight: 0, boundsType: "OBS_BOUNDS_NONE", boundsWidth: 0, ...}
  sourceName: string;
  sourceType: string;
}

export interface MediaSourceSettings {
  local_file: string;
  is_local_file: boolean;
  looping: boolean;
  restart_on_activate: boolean;
}

export interface InputSettingsResult<T = unknown> {
  inputKind: string;
  inputSettings: T;
}

export function castMediaSourceSettings(
  x: InputSettingsResult,
): x is InputSettingsResult<MediaSourceSettings> {
  return x.inputKind === "ffmpeg_source";
}

export default class OBSConnection {
  private obs!: OBSWebSocket;
  private constructor() {}
  public static async create(
    obsHost: string,
    obsPassword: string,
    obsPort = 4455,
  ) {
    const obs = new OBSWebSocket();
    console.log("Connecting to OBS at", `ws://${obsHost}:${obsPort}`);
    await obs.connect(`ws://${obsHost}:${obsPort}`, obsPassword, {
      rpcVersion: 1,
    });
    const obsConnection = new OBSConnection();
    obsConnection.obs = obs;
    return obsConnection;
  }

  public async createScene(name: string): Promise<void> {
    await this.obs.call("CreateScene", { sceneName: name });
  }

  public async listScenes(): Promise<Scene[]> {
    return (await this.obs.call("GetSceneList")).scenes as unknown as Scene[];
  }

  public async getSceneItems(scene: string): Promise<SceneItem[]> {
    return (await this.obs.call("GetSceneItemList", { sceneName: scene }))
      .sceneItems as unknown as SceneItem[];
  }

  public async addMediaSourceToScene(
    scene: string,
    inputName: string,
    path: string,
  ) {
    await this.obs.call("CreateInput", {
      sceneName: scene,
      inputName,
      inputKind: "ffmpeg_source",
      inputSettings: {
        local_file: path,
        is_local_file: true,
        looping: false,
        restart_on_activate: true,
      },
    });
  }

  public async getSourceSettings(
    inputName: string,
  ): Promise<InputSettingsResult> {
    return await this.obs.call("GetInputSettings", { inputName });
  }

  public async replaceMediaSourceInScene(
    scene: string,
    inputName: string,
    path: string,
  ) {
    await this.obs.call("SetInputSettings", {
      inputName: inputName,
      inputSettings: {
        local_file: path,
        is_local_file: true,
        looping: false,
        restart_on_activate: true,
      },
    });
  }

  public async ping() {
    return await this.obs.call("GetVersion");
  }
}

export let obsConnection: OBSConnection | null = null;
export async function createOBSConnection(
  obsHost: string,
  obsPassword: string,
  obsPort = 4455,
) {
  obsConnection = await OBSConnection.create(obsHost, obsPassword, obsPort);
  await obsConnection.ping();
  await saveOBSSettings({
    host: obsHost,
    password: obsPassword,
    port: obsPort,
  });
  return obsConnection;
}

export async function tryCreateOBSConnection() {
  const settings = await getOBSSettings();
  if (settings !== null) {
    try {
      obsConnection = await OBSConnection.create(
        settings.host,
        settings.password,
        settings.port,
      );
      console.log("Successfully connected to OBS using saved credentials");
    } catch (e) {
      console.warn("Failed to connect to OBS (will ignore)", e);
    }
  }
}
