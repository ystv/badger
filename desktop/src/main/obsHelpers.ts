import { castMediaSourceSettings, obsConnection } from "./obs";
import { getLocalMediaSettings } from "./settings";
import invariant from "../common/invariant";
import { inferProcedureOutput } from "@trpc/server";
import type { AppRouter } from "bowser-server/app/api/_router";

/*
 * This file contains helper functions that wrap obsConnection in obs.ts.
 */

export async function addMediaAsScene(
  info: inferProcedureOutput<AppRouter["media"]["get"]>,
) {
  invariant(
    info.continuityItem,
    "No continuity item for media in addMediaAsScene",
  );
  invariant(obsConnection, "no OBS connection");
  const localMedia = await getLocalMediaSettings();
  const item = localMedia.find((x) => x.mediaID === info.id);
  invariant(
    item !== undefined,
    `No local media for media ${info.id} [${info.name}] in addMediaAsScene`,
  );

  const mediaSourceName = `Bowser Media ${info.id}`;
  const sceneTitle = `${info.continuityItem.order} - ${info.continuityItem.name} [#${info.continuityItemID}]`;
  const scenes = await obsConnection.listScenes();
  const ours = scenes.find((x) => x.sceneName === sceneTitle);
  const videoSettings = await obsConnection.getVideoSettings();
  if (!ours) {
    console.log("addMediaAsScene: creating scene", sceneTitle);
    await obsConnection.createScene(sceneTitle);
    const id = await obsConnection.addMediaSourceToScene(
      sceneTitle,
      mediaSourceName,
      item.path,
    );
    await obsConnection.setSceneItemTransform(sceneTitle, id, {
      boundsWidth: videoSettings.baseWidth,
      boundsHeight: videoSettings.baseHeight,
      boundsType: "OBS_BOUNDS_SCALE_INNER",
    });
    return;
  }
  console.log("addMediaAsScene: found scene", ours);
  const items = await obsConnection.getSceneItems(sceneTitle);
  const existing = items.find((x) => x.sourceName === mediaSourceName);
  if (!existing) {
    console.log(
      "addMediaAsScene: existing scene doesn't have our source. Adding.",
    );
    // TODO: What do we do if the scene already has other sources? Should we remove them? Should we add our source
    //  before or after them? Should we prompt the user? If so, how?
    const id = await obsConnection.addMediaSourceToScene(
      sceneTitle,
      mediaSourceName,
      item.path,
    );
    await obsConnection.setSceneItemTransform(sceneTitle, id, {
      boundsWidth: videoSettings.baseWidth,
      boundsHeight: videoSettings.baseHeight,
      boundsType: "OBS_BOUNDS_SCALE_INNER",
    });
    return;
  }
  console.log("addMediaAsScene: found existing source", existing);
  const settings = await obsConnection.getSourceSettings(mediaSourceName);
  if (!castMediaSourceSettings(settings)) {
    console.warn(
      "addMediaAsScene: existing source is not a media source. Cowardly refusing to overwrite.",
    );
    return;
  }
  if (settings.inputSettings.local_file === item.path) {
    console.log(
      "addMediaAsScene: existing source is the same file. Nothing to do.",
    );
    return;
  }
  // This should actually never happen. When a media file is replaced, we create a new Media object with a new ID,
  // which would mean the source has a new name (see the definition of mediaSourceName). There being a source with the
  // same ID and name but different path suggests that the user has manually changed it, and we shouldn't touch it.
  console.warn(
    `addMediaAsScene: existing source has different path (${settings.inputSettings.local_file} vs ${item.path}). Cowardly refusing to overwrite.`,
  );
}
