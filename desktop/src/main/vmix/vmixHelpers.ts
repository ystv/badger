import { CompleteRundownType } from "@badger/prisma/utilityTypes";
import invariant from "../../common/invariant";
import { getLogger } from "../base/logging";
import { LOCAL_MEDIA_PATH_REGEX } from "../media/constants";
import { getVMixConnection } from "./vmix";
import { InputType, ListInput, ListItem, VMixState } from "./vmixTypes";
import type { Asset, Media } from "@badger/prisma/types";
import { VMIX_NAMES } from "../../common/constants";

const logger = getLogger("vmixHelpers");

export async function reconcileList(listName: string, elements: string[]) {
  const conn = getVMixConnection();
  invariant(conn, "VMix connection not initialized");
  const state = await conn.getFullState();
  const existingInput = state.inputs.find((x) => x.shortTitle === listName);
  let key;
  if (existingInput) {
    key = existingInput.key;
  } else {
    key = await conn.addInput("VideoList", "");
    await conn.renameInput(key, listName);
    try {
      await conn.setListAutoNext(key, false);
    } catch (e) {
      // Don't want to block the rest if this fails
      logger.warn("Failed to set list auto next: " + String(e));
    }
  }
  // TODO: Can we do this without removing and adding everything?
  //  Shortcuts unfortunately don't let us reorder, only add and remove.
  await conn.clearList(key);
  // Not done in a Promise.all() to ensure they're done in order
  for (const el of elements) {
    await conn.addInputToList(key, el);
  }
}

export async function addSingleItemToList(listName: string, path: string) {
  const conn = getVMixConnection();
  invariant(conn, "VMix connection not initialized");
  const state = await conn.getFullState();
  const existingInput = state.inputs.find((x) => x.shortTitle === listName);
  let key;
  if (existingInput) {
    key = existingInput.key;
  } else {
    key = await conn.addInput("VideoList", "");
    await conn.renameInput(key, listName);
    try {
      await conn.setListAutoNext(key, false);
    } catch (e) {
      // Don't want to block the rest if this fails
      logger.warn("Failed to set list auto next: " + String(e));
    }
  }
  await conn.addInputToList(key, path);
}

export async function isListPlaying(listName: string): Promise<boolean> {
  const conn = getVMixConnection();
  invariant(conn, "VMix connection not initialized");
  let state;
  try {
    state = await conn.getPartialState(
      `vmix/inputs/input[@shortTitle="${listName}"]`,
    );
  } catch (e) {
    if (e instanceof Error && e.message.includes("Entry Not Found")) {
      return false;
    }
    throw e;
  }
  return state["@_state"] === "Running";
}

export function getInputTypeForAsset(
  asset: Asset & { media: Media | null },
): InputType {
  const extension = asset.media!.name.split(".").pop();
  switch (extension) {
    case "gtxml":
    case "gtzip":
      return "Title";
    case "mp4":
    case "mov":
    case "avi":
    case "mkv":
    case "webm":
      return "Video";
    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
    case "bmp":
      return "Image";
    case "mp3":
    case "wav":
    case "flac":
    case "ogg":
    case "m4a":
      return "AudioFile";
    default:
      throw new Error("Unknown file extension " + extension);
  }
}

export async function loadAssets(
  assets: (Asset & { media: Media | null })[],
  loadType: "direct" | "list",
  category: string,
  localMedia: { mediaID: number; path: string }[],
) {
  const vmix = getVMixConnection();
  invariant(vmix, "No vMix connection");
  const state = await vmix.getFullState();

  let listKey;
  let listMedia: ListItem[] = [];
  if (loadType === "list") {
    const list = state.inputs.find((x) => x.shortTitle === category);
    if (list) {
      listKey = list.key;
      listMedia = (list as ListInput).items;
    } else {
      listKey = await vmix.addInput("VideoList", "");
      await vmix.renameInput(listKey, category);
      try {
        await vmix.setListAutoNext(listKey, false);
      } catch (e) {
        // Don't want to block the rest if this fails
        logger.warn("Failed to set list auto next: " + String(e));
      }
    }
  }

  for (const asset of assets) {
    if (!asset.media || asset.media.state !== "Ready") {
      throw new Error("Not all assets have remote media");
    }
    const local = localMedia.find((x) => x.mediaID === asset.media!.id);
    if (!local) {
      throw new Error("No local media for asset " + asset.id);
    }

    if (loadType === "direct") {
      const present = state.inputs.find((x) => x.title === asset.media!.name);
      if (!present) {
        await vmix.addInput(getInputTypeForAsset(asset), local.path);
      }
    } else if (loadType === "list") {
      const present = listMedia.some((x) => x.source === local.path);
      if (!present) {
        invariant(listKey, "not got a listKey for a list we just created");
        await vmix.addInputToList(listKey, local.path);
      }
    } else {
      invariant(false, "Invalid load type " + loadType);
    }
  }
}

export function matchMediaToRundown(
  selectedRundown: CompleteRundownType,
  state: VMixState,
) {
  const items = [];
  for (const input of state.inputs) {
    if (input.type === "VideoList") {
      for (const item of (input as ListInput).items) {
        const mediaIDMatch = LOCAL_MEDIA_PATH_REGEX.exec(item.source);
        if (!mediaIDMatch) {
          continue;
        }
        const mediaID = Number(mediaIDMatch[1]);
        items.push({ mediaID, context: input.shortTitle });
      }
    } else {
      const mediaIDMatch = LOCAL_MEDIA_PATH_REGEX.exec(input.title);
      if (!mediaIDMatch) {
        continue;
      }
      const mediaID = Number(mediaIDMatch[1]);
      items.push({ mediaID, context: null });
    }
  }

  const expectedVTs = selectedRundown.items.filter(
    (x) => x.type === "VT" && x.mediaId !== null,
  );
  const loadedAssetCategories: Record<string, "all" | "partial" | "none"> = {};
  const loadedVTMedia = items.filter((x) => x.context === VMIX_NAMES.VTS_LIST);
  let loadedVTs: "all" | "partial" | "none";
  if (loadedVTMedia.length !== expectedVTs.length) {
    loadedVTs = "partial";
  } else {
    const loadedIDs = new Set(loadedVTMedia.map((x) => x.mediaID));
    if (expectedVTs.every((x) => loadedIDs.has(x.mediaId!))) {
      loadedVTs = "all";
    } else {
      loadedVTs = "partial";
    }
  }

  const expectedAssetsByCategory = new Map<string, Set<number>>();
  for (const asset of selectedRundown.assets) {
    let cur = expectedAssetsByCategory.get(asset.category);
    if (!cur) {
      cur = new Set();
      expectedAssetsByCategory.set(asset.category, cur);
    }
    cur.add(asset.id);
  }
  for (const [cat, expectedMediaIDs] of expectedAssetsByCategory.entries()) {
    const loadedAssets = items.filter((x) => x.context === cat);
    if (loadedAssets.length !== expectedMediaIDs.size) {
      loadedAssetCategories[cat] = "partial";
    } else {
      const loadedIDs = new Set(loadedAssets.map((x) => x.mediaID));
      if (Array.from(expectedMediaIDs).every((x) => loadedIDs.has(x))) {
        loadedAssetCategories[cat] = "all";
      } else {
        loadedAssetCategories[cat] = "partial";
      }
    }
  }
  return {
    loadedAssetCategories,
    loadedVTs,
    loadedVTIDs: loadedVTMedia.map((x) => x.mediaID),
  };
}
