import { createAsyncThunk, isAnyOf, PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "../base/reduxHelpers";
import { createVMixConnection, getVMixConnection } from "./vmix";
import { AppState } from "../store";
import { getSelectedShow, showDataChangeMatcher } from "../base/selectedShow";
import invariant from "../../common/invariant";
import { listenOnStore } from "../storeListener";
import {
  addSingleItemToList,
  isListPlaying,
  matchMediaToRundown,
  reconcileList,
  loadAssets as doLoadAssets,
} from "./vmixHelpers";
import { VMIX_NAMES } from "../../common/constants";
import {
  PartialMediaModel,
  PartialMediaType,
} from "@badger/prisma/utilityTypes";
import { getLogger } from "../base/logging";

const logger = getLogger("vmix/state");

const vmixSlice = createAppSlice({
  name: "vmix",
  initialState: {
    connection: {
      connected: false,
      connecting: false,
      host: "",
      port: 0,
      version: "",
      edition: "",
      error: null as string | null,
    },
    activeRundownID: null as number | null,
    loadedAssetCategories: {} as Record<string, "all" | "partial" | "none">,
    loadedVTs: "none" as "all" | "partial" | "none",
    loadedVTIDs: [] as number[],
  },
  reducers: {
    switchRundown(state, action: PayloadAction<{ rundownID: number }>) {
      const show = getSelectedShow();
      invariant(show, "No selected show");
      invariant(
        show.rundowns.find((x) => x.id === action.payload.rundownID),
        "No such rundown",
      );
      state.activeRundownID = action.payload.rundownID;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(connectToVMix.pending, (state) => {
      state.connection.connecting = true;
    });
    builder.addCase(connectToVMix.rejected, (state, action) => {
      state.connection.error = action.error.message ?? "Unknown error";
      state.connection.connecting = false;
    });

    builder.addCase(updateLoadState.fulfilled, (state, action) => {
      if (action.payload) {
        state.loadedAssetCategories = action.payload.loadedAssetCategories;
        state.loadedVTs = action.payload.loadedVTs;
        state.loadedVTIDs = action.payload.loadedVTIDs;
      }
    });

    builder.addMatcher(
      isAnyOf(connectToVMix.fulfilled, tryConnectToVMix.fulfilled),
      (state, action) => {
        if (action.payload) {
          state.connection.connected = true;
          state.connection.connecting = false;
          state.connection.version = action.payload.version;
          state.connection.edition = action.payload.edition;
        }
      },
    );
  },
});

export const vmixReducer = vmixSlice.reducer;

export const switchActiveRundown = vmixSlice.actions.switchRundown;

export const connectToVMix = createAsyncThunk(
  "vmix/connect",
  async (payload: { host: string; port: number }) => {
    const conn = await createVMixConnection(payload.host, payload.port);
    const state = await conn.getFullState();
    return {
      version: state.version,
      edition: state.edition,
    };
  },
);

export const tryConnectToVMix = createAsyncThunk(
  "vmix/tryConnect",
  async () => {
    let conn;
    try {
      conn = await createVMixConnection();
    } catch (e) {
      return null;
    }
    let state;
    try {
      state = await conn.getFullState();
    } catch (e) {
      return null;
    }
    return {
      version: state.version,
      edition: state.edition,
    };
  },
);

export const updateLoadState = createAsyncThunk(
  // TODO: Rewrite this as a reducer which takes the current state as an action payload
  "vmix/updateLoadState",
  async (_, api) => {
    // TODO(BDGR-170): For now we assume that VTs are always in a list named "VTs"
    // and assets are either in a list named after the category, or
    // as loose sources named after the local file name.
    // This assumption may cease to hold when BDGR-170 is implemented.
    const state = api.getState() as AppState;
    const show = state.selectedShow.show;
    if (!show) {
      logger.warn("No show selected");
      return;
    }
    const selectedRundown = show.rundowns.find(
      (x) => x.id === state.vmix.activeRundownID,
    );
    if (!selectedRundown) {
      logger.warn("No active rundown");
      return;
    }
    const vmix = getVMixConnection();
    invariant(vmix, "No vMix connection");
    const fullState = await vmix.getFullState();
    return matchMediaToRundown(selectedRundown, fullState);
  },
);

listenOnStore({
  matcher: isAnyOf(
    vmixSlice.actions.switchRundown,
    connectToVMix.fulfilled,
    tryConnectToVMix.fulfilled,
  ),
  effect: (_, api) => {
    api.dispatch(updateLoadState());
  },
});

listenOnStore({
  matcher: showDataChangeMatcher,
  effect: (_, api) => {
    api.dispatch(updateLoadState());
  },
});

export const loadAllVTs = createAsyncThunk(
  "vmix/loadAllVTs",
  async (payload: { rundownID: number; force?: boolean }, api) => {
    const vmix = getVMixConnection();
    invariant(vmix, "No vMix connection");
    if (!payload.force) {
      const isPlaying = await isListPlaying(VMIX_NAMES.VTS_LIST);
      if (isPlaying) {
        return { ok: false, reason: "alreadyPlaying" };
      }
    }
    const state = api.getState() as AppState;
    const show = state.selectedShow.show;
    invariant(show, "No selected show");
    const rundown = show.rundowns.find((x) => x.id === payload.rundownID);
    invariant(rundown, "No such rundown");
    const media = rundown.items
      .sort((a, b) => a.order - b.order)
      .map<PartialMediaType | null>((i) => i.media)
      .filter((x) => x && x.state === "Ready");
    const localMedia = state.localMedia.media;
    const paths = media.map(
      (remote) =>
        localMedia.find((local) => local.mediaID === remote?.id)?.path,
    );
    if (paths.some((x) => !x)) {
      throw api.rejectWithValue("Not all media is available locally");
    }
    await reconcileList(VMIX_NAMES.VTS_LIST, paths as string[]);
    return {
      ok: true,
    };
  },
);

export const loadSingleVT = createAsyncThunk(
  "vmix/loadSingleVT",
  async (payload: { rundownID: number; itemID: number }, api) => {
    const state = api.getState() as AppState;
    const show = state.selectedShow.show;
    invariant(show, "No show selected");
    const rundown = show.rundowns.find((x) => x.id === payload.rundownID);
    invariant(rundown, "Rundown not found");
    const item = rundown.items.find((x) => x.id === payload.itemID);
    invariant(item, "Item not found");
    if (!item.media) {
      throw new Error("Item has no media");
    }
    if (item.media.state !== "Ready") {
      throw new Error("Media is not ready");
    }
    const localMedia = state.localMedia.media;
    const local = localMedia.find((x) => x.mediaID === item.media!.id);
    invariant(local, "No local media for asset");
    await addSingleItemToList(VMIX_NAMES.VTS_LIST, local.path);
  },
);

export type LoadAssetsArgs =
  | { rundownID: number; category: string; loadType: "direct" | "list" }
  | { rundownID: number; assetID: number };
export const loadAssets = createAsyncThunk(
  "vmix/loadAssets",
  async (payload: LoadAssetsArgs, api) => {
    const state = api.getState() as AppState;
    const show = state.selectedShow.show;
    invariant(show, "No show selected");
    const rundown = show.rundowns.find((x) => x.id === payload.rundownID);
    invariant(rundown, "Rundown not found");
    const localMedia = state.localMedia.media;

    if ("category" in payload) {
      const assets = rundown.assets.filter(
        (x) => x.category === payload.category,
      );
      await doLoadAssets(
        assets,
        payload.loadType,
        payload.category,
        localMedia,
      );
    } else {
      const asset = rundown.assets.find((x) => x.id === payload.assetID);
      invariant(asset, "Asset not found");
      await doLoadAssets([asset], "direct", asset.category, localMedia);
    }
  },
);
