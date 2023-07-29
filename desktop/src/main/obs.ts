import OBSWebSocket from "obs-websocket-js";
import { getOBSSettings, saveOBSSettings } from "./settings";

/*
 * This file contains OBSConnection, a wrapper around obs-websocket-js that provides a higher level, more typesafe API.
 * In general, anything that requires more than one call to OBS should go in obsHelpers.ts instead.
 */

export interface Scene {
  sceneIndex: number;
  sceneName: string;
}

export enum OBSBoundsTypes {
  OBS_BOUNDS_NONE = "OBS_BOUNDS_NONE" /**< no bounds */,
  OBS_BOUNDS_STRETCH = "OBS_BOUNDS_STRETCH" /**< stretch (ignores base scale) */,
  OBS_BOUNDS_SCALE_INNER = "OBS_BOUNDS_SCALE_INNER" /**< scales to inner rectangle */,
  OBS_BOUNDS_SCALE_OUTER = "OBS_BOUNDS_SCALE_OUTER" /**< scales to outer rectangle */,
  OBS_BOUNDS_SCALE_TO_WIDTH = "OBS_BOUNDS_SCALE_TO_WIDTH" /**< scales to the width  */,
  OBS_BOUNDS_SCALE_TO_HEIGHT = "OBS_BOUNDS_SCALE_TO_HEIGHT" /**< scales to the height */,
  OBS_BOUNDS_MAX_ONLY = "OBS_BOUNDS_MAX_ONLY" /**< no scaling, maximum size only */,
}
export type OBSBoundsType = keyof typeof OBSBoundsTypes;

export interface SceneItemTransform {
  alignment: number;
  boundsAlignment: number;
  boundsHeight: number;
  boundsType: OBSBoundsType;
  boundsWidth: number;
  cropBottom: number;
  cropLeft: number;
  cropRight: number;
  cropTop: number;
  height: number;
  positionX: number;
  positionY: number;
  rotation: number;
  scaleX: number;
  scaleY: number;
  sourceHeight: number;
  sourceWidth: number;
  width: number;
}

export interface SceneItem {
  inputKind: string;
  isGroup: null;
  sceneItemBlendMode: string;
  sceneItemEnabled: boolean;
  sceneItemId: number;
  sceneItemIndex: number;
  sceneItemLocked: boolean;
  sceneItemTransform: SceneItemTransform;
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

export interface OBSVideoSettings {
  /**
   * Numerator of the fractional FPS value
   */
  fpsNumerator: number;
  /**
   * Denominator of the fractional FPS value
   */
  fpsDenominator: number;
  /**
   * Width of the base (canvas) resolution in pixels
   */
  baseWidth: number;
  /**
   * Height of the base (canvas) resolution in pixels
   */
  baseHeight: number;
  /**
   * Width of the output resolution in pixels
   */
  outputWidth: number;
  /**
   * Height of the output resolution in pixels
   */
  outputHeight: number;
}

export interface InputBasicInfo {
  inputKind: string;
  unversionedInputKind: string;
  inputName: string;
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

  public async createMediaSourceInput(
    scene: string,
    inputName: string,
    path: string,
  ) {
    const res = await this.obs.call("CreateInput", {
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
    return res.sceneItemId;
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

  public async setSceneItemTransform(
    sceneName: string,
    sceneItemId: number,
    transform: Partial<SceneItemTransform>,
  ): Promise<void> {
    await this.obs.call("SetSceneItemTransform", {
      sceneName,
      sceneItemId,
      sceneItemTransform: transform,
    });
  }

  public async removeSceneItem(sceneTitle: string, itemId: number) {
    await this.obs.call("RemoveSceneItem", {
      sceneName: sceneTitle,
      sceneItemId: itemId,
    });
  }

  public async listSources(): Promise<InputBasicInfo[]> {
    return (await this.obs.call("GetInputList"))
      .inputs as unknown as InputBasicInfo[];
  }

  public async getVideoSettings(): Promise<OBSVideoSettings> {
    return await this.obs.call("GetVideoSettings");
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
