import * as fsp from "fs/promises";
import * as path from "path";

import { getLogger } from "../base/logging";
import { createAppSlice } from "../base/reduxHelpers";
import {
  doDownloadMedia,
  getDefaultMediaPath,
  LocalMediaItem,
  MediaDownloadState,
  scanLocalMedia,
} from "./mediaManagement";
import { AppState, AppThunk } from "../store";
import { setSetting } from "../base/settings";
import {
  createAsyncThunk,
  isAnyOf,
  PayloadAction,
  ThunkAction,
} from "@reduxjs/toolkit";
import { listenOnStore } from "../storeListener";

const logger = getLogger("media/state");

interface DownloadQueueItem {
  mediaID: number;
  status: MediaDownloadState;
  progressPercent?: number;
  error?: string;
}

const initialise = createAsyncThunk(
  "localMedia/loadLocalMedia",
  async (_, thunkAPI) => {
    const settings = (thunkAPI.getState() as AppState).settings;
    let mediaPath = settings.media.mediaPath;
    if (!mediaPath) {
      mediaPath = getDefaultMediaPath();
      thunkAPI.dispatch(setSetting("media", "mediaPath", mediaPath));
    }
    await fsp.mkdir(mediaPath, { recursive: true });
    const media = await scanLocalMedia(mediaPath);
    return media;
  },
);

const downloadMedia = createAsyncThunk(
  "localMedia/downloadMedia",
  async (task: { mediaID: number }, thunkAPI) => {
    const state = thunkAPI.getState() as AppState;
    const mediaPath = state.settings.media.mediaPath;
    if (!mediaPath) {
      throw new Error("Media path not set");
    }
    const { outputPath, sizeBytes } = await doDownloadMedia(
      task,
      mediaPath,
      (state, progress) => {
        thunkAPI.dispatch(
          localMediaState.actions.downloadProgress({
            mediaID: task.mediaID,
            state,
            progress,
          }),
        );
      },
    );
    return { mediaID: task.mediaID, path: outputPath, sizeBytes };
  },
);

const downloadAllMediaForSelectedShow: () => AppThunk =
  () => (dispatch, getState) => {
    const show = getState().selectedShow;
    if (!show) {
      return;
    }
    // This is all the media IDs, the reducer will filter out the ones that are already downloaded
    const mediaIDs: number[] = [];
    for (const rundown of show.rundowns) {
      for (const item of rundown.items) {
        if (item.media) {
          mediaIDs.push(item.media.id);
        }
      }
      for (const asset of rundown.assets) {
        mediaIDs.push(asset.media.id);
      }
    }
    for (const continuityItem of show.continuityItems) {
      if (continuityItem.media) {
        mediaIDs.push(continuityItem.media.id);
      }
    }
    dispatch(localMediaState.actions.queueMediaDownloads({ mediaIDs }));
  };

const localMediaState = createAppSlice({
  name: "localMedia",
  initialState: {
    media: [] as LocalMediaItem[],
    downloadQueue: [] as DownloadQueueItem[],
    isDownloadInProgress: false,
    preflightComplete: false,
  },
  reducers: {
    queueMediaDownload(state, action: PayloadAction<{ mediaID: number }>) {
      state.downloadQueue.push({
        mediaID: action.payload.mediaID,
        status: "pending",
      });
    },
    queueMediaDownloads(state, action: PayloadAction<{ mediaIDs: number[] }>) {
      const alreadyPresent = new Set(
        state.downloadQueue
          .map((i) => i.mediaID)
          .concat(state.media.map((i) => i.mediaID)),
      );
      for (const mediaID of action.payload.mediaIDs) {
        if (!alreadyPresent.has(mediaID)) {
          state.downloadQueue.push({
            mediaID,
            status: "pending",
          });
        }
      }
    },
    downloadProgress(
      state,
      action: PayloadAction<{
        mediaID: number;
        state: MediaDownloadState;
        progress: number;
      }>,
    ) {
      const item = state.downloadQueue.findIndex(
        (i) => i.mediaID === action.payload.mediaID,
      );
      if (item < 0) {
        logger.warn(
          `Received progress for unknown media ID ${action.payload.mediaID}`,
        );
        return;
      }
      state.downloadQueue[item].status = action.payload.state;
      state.downloadQueue[item].progressPercent = action.payload.progress;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(initialise.fulfilled, (state, action) => {
      state.media = action.payload;
      state.preflightComplete = true;
    });
    builder.addCase(downloadMedia.pending, (state) => {
      state.isDownloadInProgress = true;
    });
    builder.addCase(downloadMedia.fulfilled, (state, action) => {
      state.isDownloadInProgress = false;
      const item = state.downloadQueue.findIndex(
        (i) => i.mediaID === action.payload.mediaID,
      );
      if (item < 0) {
        logger.warn(
          `Received completion for unknown media ID ${action.payload.mediaID}`,
        );
        return;
      }
      state.downloadQueue[item].status = "done";
      state.media.push({
        mediaID: action.payload.mediaID,
        path: action.payload.path,
        sizeBytes: action.payload.sizeBytes,
      });
    });
    builder.addCase(downloadMedia.rejected, (state, action) => {
      state.isDownloadInProgress = false;
      const item = state.downloadQueue.findIndex(
        (i) => i.mediaID === action.meta.arg.mediaID,
      );
      if (item < 0) {
        logger.warn(
          `Received error for unknown media ID ${action.meta.arg.mediaID}`,
        );
        return;
      }
      state.downloadQueue[item].status = "error";
      state.downloadQueue[item].error = action.error.message;
    });
  },
});

// This effect handles starting downloads when they are queued
listenOnStore({
  matcher: isAnyOf(
    localMediaState.actions.queueMediaDownload,
    downloadMedia.fulfilled,
    downloadMedia.rejected,
  ),
  effect: (_, api) => {
    const state = api.getState() as AppState;
    if (state.localMedia.isDownloadInProgress) {
      return;
    }
    const nextItem = state.localMedia.downloadQueue
      .filter((x) => x.status === "pending")
      .shift();
    if (!nextItem) {
      return;
    }
    api.dispatch(downloadMedia({ mediaID: nextItem.mediaID }));
  },
});

export const localMediaReducer = localMediaState.reducer;
export const localMediaActions = {
  initialise,
  queueMediaDownload: localMediaState.actions.queueMediaDownload,
  downloadAllMediaForSelectedShow,
};
