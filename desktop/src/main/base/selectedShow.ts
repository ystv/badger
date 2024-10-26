import { CompleteShowType } from "../../common/types";
import { serverAPI } from "./serverApiClient";
import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  TaskAbortError,
} from "@reduxjs/toolkit";
import { listenOnStore } from "../storeListener";
import { getLogger } from "./logging";

const logger = getLogger("selectedShow");

const selectedShowState = createSlice({
  name: "selectedShow",
  initialState: {
    show: null as CompleteShowType | null,
    isLoading: false,
  },
  reducers: {
    _updateShowData: (state, action: PayloadAction<CompleteShowType>) => {
      state.show = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(changeSelectedShow.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(changeSelectedShow.fulfilled, (state, action) => {
      state.show = action.payload;
      state.isLoading = false;
    });
    // TODO handle error? (Probably want some kind of global handler)
  },
});

export const selectedShowReducer = selectedShowState.reducer;

export const changeSelectedShow = createAsyncThunk(
  "selectedShow/changeSelectedShow",
  async (showID: number) => {
    return await serverAPI().shows.get.query({ id: showID });
  },
);

listenOnStore({
  actionCreator: changeSelectedShow.fulfilled,
  effect: async (initialShowState, api) => {
    api.cancelActiveListeners();
    api.fork(async (forkAPI) => {
      logger.debug("Starting show data update loop");
      for (;;) {
        try {
          await forkAPI.delay(10_000); // TODO configurable
          const { show: current } = api.getState().selectedShow;
          if (current === null || current.id !== initialShowState.payload.id) {
            return;
          }
          const serverVersion = await serverAPI().shows.getVersion.query({
            id: current.id,
          });
          if (serverVersion.version === current.version) {
            continue;
          }
          const newData = await serverAPI().shows.get.query({
            id: current.id,
          });
          api.dispatch(selectedShowState.actions._updateShowData(newData));
        } catch (e) {
          if (e instanceof TaskAbortError) {
            throw e;
          }
          logger.error("Error updating show data", e); // TODO surface to user
        }
      }
    });
    // Cancel as soon as a new show is selected
    await api.condition(changeSelectedShow.pending.match);
    api.cancel();
    logger.debug("Cancelled show data update loop");
  },
});
