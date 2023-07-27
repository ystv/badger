import { castMediaSourceSettings, obsConnection } from "./obs";
import { getLocalMediaSettings } from "./settings";
import invariant from "../common/invariant";
import { inferProcedureOutput } from "@trpc/server";
import type { AppRouter } from "bowser-server/app/api/_router";

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
  if (!ours) {
    console.log("addMediaAsScene: creating scene", sceneTitle);
    await obsConnection.createScene(sceneTitle);
    await obsConnection.addMediaSourceToScene(
      sceneTitle,
      mediaSourceName,
      item.path,
    );
    return;
  }
  console.log("addMediaAsScene: found scene", ours);
  const items = await obsConnection.getSceneItems(sceneTitle);
  const existing = items.find((x) => x.sourceName === mediaSourceName);
  if (!existing) {
    console.log(
      "addMediaAsScene: existing scene doesn't have our source. Adding.",
    );
    await obsConnection.addMediaSourceToScene(
      sceneTitle,
      mediaSourceName,
      item.path,
    );
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
  console.log(
    `addMediaAsScene: existing source is a different file. Replacing with ${item.path}.`,
  );
  await obsConnection.replaceMediaSourceInScene(
    sceneTitle,
    mediaSourceName,
    item.path,
  );
}
