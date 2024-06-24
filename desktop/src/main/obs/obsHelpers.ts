import {
  castMediaSourceSettings,
  obsConnection,
  OBSVideoSettings,
  SceneItem,
} from "./obs";
import invariant from "../../common/invariant";
import type { Media } from "@badger/prisma/client";
import { getLogger } from "../base/logging";
import { getLocalMedia } from "../media/mediaManagement";

const logger = getLogger("obsHelpers");

/*
 * This file contains helper functions that wrap obsConnection in obs.ts.
 */

export type MediaType = Media & {
  containerType: "rundownItem" | "continuityItem" | "asset";
  containerId: number;
  containerName: string;
  order: number;
};

const MEDIA_SOURCE_PREFIX = "Badger Media ";
export const OLD_CONTINUITY_SCENE_NAME_REGEXP = /^\d+ - .+? \[#(\d+)]$/;
export const NEW_SCENE_NAME_REGEXP =
  /^\d - .*? \[(VT|Continuity|Asset) #(\d+)\]$/;

/**
 * Adds a file to an OBS scene as a media source, creating the scene if it does not exist.
 * @param info the media to add
 * @param replaceMode how to handle OBS scenes that already exist:
 *   "none": do not replace existing sources
 *   "replace": replace pre-existing Badger scenes, but not scenes containing other sources
 *   "force": replace the contents of the scene no matter what
 * @return
 *   done: true if the media was added to the scene
 *   warnings: any warnings that occurred
 *   promptReplace: if replaceMode is *not* "replace" or "force", and the scene already exists, this will be "replace" or "force" to indicate that the user should be prompted to replace the scene
 */
export async function addOrReplaceMediaAsScene(
  info: MediaType,
  replaceMode: "none" | "replace" | "force",
): Promise<{
  done: boolean;
  warnings: string[];
  promptReplace?: "replace" | "force";
}> {
  const warnings: string[] = [];
  const warn = (v: string) => {
    logger.warn("addMediaAsScene:", v);
    warnings.push(v);
  };

  invariant(obsConnection, "no OBS connection");
  const localMedia = getLocalMedia();
  const item = localMedia.find((x) => x.mediaID === info.id);
  invariant(
    item !== undefined,
    `No local media for media ${info.id} [${info.name}] in addMediaAsScene`,
  );

  const videoSettings = await obsConnection.getVideoSettings();

  const mediaSourceName = MEDIA_SOURCE_PREFIX + info.id.toString(10);

  const containerTypeStr =
    info.containerType === "rundownItem"
      ? "VT"
      : info.containerType === "continuityItem"
        ? "Continuity"
        : "Asset";
  const sceneTitle = `${info.order} - ${info.containerName} [${containerTypeStr} #${info.containerId}]`;
  // Sanity checks
  invariant(
    mediaSourceName.startsWith(MEDIA_SOURCE_PREFIX),
    "Generated media source name that won't match our prefix checks later: " +
      mediaSourceName,
  );
  invariant(
    sceneTitle.match(NEW_SCENE_NAME_REGEXP),
    "Generated scene title that won't match our regex checks later: " +
      sceneTitle,
  );

  const scenes = await obsConnection.listScenes();
  const ours = scenes.find((x) => x.sceneName === sceneTitle);
  if (!ours) {
    // The scene doesn't exist, create it from scratch.
    logger.debug("addMediaAsScene: creating scene", sceneTitle);
    await obsConnection.createScene(sceneTitle);
    await _doAddMediaToScene(sceneTitle, mediaSourceName, item, videoSettings);
    return { warnings, done: true };
  }

  // The scene exists. Check if it has the source we want, and if not, add it.
  logger.debug("addMediaAsScene: found scene", ours);
  const items = await obsConnection.getSceneItems(sceneTitle);
  // If the scene is empty, we can go ahead and add our source
  if (items.length === 0) {
    logger.debug(
      "addMediaAsScene: existing scene doesn't have our source. Adding.",
    );
    await _doAddMediaToScene(sceneTitle, mediaSourceName, item, videoSettings);
    return { warnings, done: true };
  }

  // If the scene is non-empty, but only has our source, we're probably fine - do some sanity checks.
  if (items.length === 1 && items[0].sourceName === mediaSourceName) {
    // The scene exists, and it has a source that matches our naming convention. Check if it's the same file.
    logger.debug("addMediaAsScene: found existing source");
    const settings = await obsConnection.getSourceSettings(mediaSourceName);
    if (!castMediaSourceSettings(settings)) {
      // Should never happen unless the user manually creates a different source, or there's a Badger version incompatibility.
      if (replaceMode === "force") {
        warn("Existing source is not a media source. Forcing replacement.");
        await obsConnection.removeSceneItem(sceneTitle, items[0].sceneItemId);
        await _doAddMediaToScene(
          sceneTitle,
          mediaSourceName,
          item,
          videoSettings,
        );
        return { warnings, done: true };
      } else {
        warn("Existing source is not a media source.");
        return { warnings, done: false };
      }
    }
    if (settings.inputSettings.local_file === item.path) {
      logger.debug(
        "addMediaAsScene: existing source is the same file. Nothing to do.",
      );
      return { warnings, done: false };
    }

    // The scene exists, and has a source that matches our naming convention, but it's a different file.
    // This should never actually happen. When a media file is replaced, we create a new Media object with a new ID,
    // which would mean the source has a new name (see the definition of mediaSourceName). There being a source with the
    // same ID and name but different path suggests that the user has manually changed it, and we shouldn't touch it.
    if (replaceMode === "force") {
      warn(
        `Media source ${mediaSourceName} in scene ${sceneTitle} has a different path (${settings.inputSettings.local_file}) than expected (${item.path}). Forcing replacement.`,
      );
      await obsConnection.replaceMediaSourceInScene(
        sceneTitle,
        mediaSourceName,
        item.path,
      );
      return { warnings, done: true };
    } else {
      warn(
        `Media source ${mediaSourceName} in scene ${sceneTitle} has a different path (${settings.inputSettings.local_file}) than expected (${item.path}). Not updating.`,
      );
      return {
        warnings,
        done: false,
        promptReplace: "force",
      };
    }
  }
  // If the scene is non-empty, but has only one other source, and it's a Badger source, we can replace it if the user permits it.
  if (
    items.length === 1 &&
    items[0].sourceName.startsWith(MEDIA_SOURCE_PREFIX)
  ) {
    if (replaceMode === "replace" || replaceMode === "force") {
      logger.debug(
        "addMediaAsScene: existing scene has one Badger source with mismatching ID. Replacing.",
      );
      await obsConnection.removeSceneItem(sceneTitle, items[0].sceneItemId);
      await _doAddMediaToScene(
        sceneTitle,
        mediaSourceName,
        item,
        videoSettings,
      );
      return { warnings, done: true };
    } else {
      warn(
        `Scene ${sceneTitle} has a pre-existing Badger source for a different media file.`,
      );
      return { warnings, done: false, promptReplace: "replace" };
    }
  }
  // The scene has non-Badger sources in it.
  if (replaceMode === "force") {
    // If the user has chosen to force replacement, we can just remove all the other sources and override the path for ours.
    // Note that we don't remove ours due to a potential race condition when removing and adding the same source.
    logger.debug(
      "addMediaAsScene: existing scene has non-Badger sources. Replacing as the replaceMode is 'force'.",
    );
    let oursPresent = false;
    for (const item of items) {
      if (item.sourceName == mediaSourceName) {
        oursPresent = true;
      } else {
        await obsConnection.removeSceneItem(sceneTitle, item.sceneItemId);
      }
    }
    if (oursPresent) {
      await obsConnection.replaceMediaSourceInScene(
        sceneTitle,
        mediaSourceName,
        item.path,
      );
    } else {
      await _doAddMediaToScene(
        sceneTitle,
        mediaSourceName,
        item,
        videoSettings,
      );
    }
    return { warnings, done: true };
  } else {
    // Bail.
    warn(
      `Scene ${sceneTitle} has non-Badger sources in it. Cowardly refusing to overwrite.`,
    );
    return { warnings, done: false, promptReplace: "force" };
  }
}

async function _doAddMediaToScene(
  sceneTitle: string,
  mediaSourceName: string,
  localMedia: { path: string },
  videoSettings: OBSVideoSettings,
) {
  invariant(obsConnection, "no OBS connection");
  const id = await obsConnection.createMediaSourceInput(
    sceneTitle,
    mediaSourceName,
    localMedia.path,
  );
  await obsConnection.setSceneItemTransform(sceneTitle, id, {
    boundsWidth: videoSettings.baseWidth,
    boundsHeight: videoSettings.baseHeight,
    boundsType: "OBS_BOUNDS_SCALE_INNER",
  });
}

export async function findScenes(): Promise<
  Array<{
    sceneName: string;
    type: "rundownItem" | "continuityItem" | "asset";
    itemId: number;
    sources: (SceneItem & {
      mediaID?: number;
    })[];
  }>
> {
  invariant(obsConnection, "no OBS connection");
  const scenes = await obsConnection.listScenes();
  const continuityScenes = scenes.filter(
    (x) =>
      OLD_CONTINUITY_SCENE_NAME_REGEXP.test(x.sceneName) ||
      NEW_SCENE_NAME_REGEXP.test(x.sceneName),
  );
  const sceneItems = await Promise.all(
    continuityScenes.map((x) => obsConnection!.getSceneItems(x.sceneName)),
  );
  return continuityScenes.map((x, i) => {
    const sources = sceneItems[i].map((item) => {
      if (!item.sourceName.startsWith(MEDIA_SOURCE_PREFIX)) {
        return item;
      }
      return {
        ...item,
        mediaID: parseInt(
          item.sourceName.slice(MEDIA_SOURCE_PREFIX.length),
          10,
        ),
      };
    });
    const oldRes = OLD_CONTINUITY_SCENE_NAME_REGEXP.exec(x.sceneName);
    if (oldRes) {
      return {
        sceneName: x.sceneName,
        type: "rundownItem",
        itemId: parseInt(oldRes[1], 10),
        sources,
      };
    }
    const newRes = NEW_SCENE_NAME_REGEXP.exec(x.sceneName);
    if (newRes) {
      return {
        sceneName: x.sceneName,
        type:
          newRes[1] === "VT"
            ? "rundownItem"
            : newRes[1] === "Continuity"
              ? "continuityItem"
              : "asset",
        itemId: parseInt(newRes[2], 10),
        sources,
      };
    }
    invariant(false, "Scene name didn't match either regex");
  });
}
