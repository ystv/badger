import invariant from "../../common/invariant";
import { getLocalMedia } from "../media/mediaManagement";
import { getVMixConnection } from "./vmix";
import { InputType, ListInput, ListItem } from "./vmixTypes";
import type { Asset, Media } from "@badger/prisma/client";

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
) {
  const localMedia = getLocalMedia();
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
