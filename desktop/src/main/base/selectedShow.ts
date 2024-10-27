import { CompleteShowType } from "../../common/types";
import { serverAPI } from "./serverApiClient";
import {
  createAsyncThunk,
  createSlice,
  isAnyOf,
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

/**
 * Slices can use this to listen for changes to the selected show data.
 */
export const showDataChangeMatcher = isAnyOf(
  changeSelectedShow.fulfilled.match,
  selectedShowState.actions._updateShowData.match,
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

// This hackery allows all other slice reducers to access selectedShow without
// needing to maintain a copy in their slice. See the comment in store.ts
// for more detail (including why it's legal).

// This sigil allows us to enforce that getSelectedShow is only called within a reducer.
// The value of state is this sigil whenever we're not in a reducer.
const sigil = Symbol("SelectedShow_notInReducer");
let state: CompleteShowType | null | typeof sigil = sigil;
export function _enterReducer(value: CompleteShowType | null) {
  state = value;
}
export function _exitReducer() {
  state = sigil;
}

/**
 * Get the currently selected show.
 * **This is only legal to call within a Redux reducer**, during the top-level store update cycle. Any other
 * usage will throw an error.
 */
export function getSelectedShow() {
  if (state === sigil) {
    throw new Error(
      "getSelectedShow called outside of a reducer. It is only valid inside a Redux reducer. For all other uses, access the state directly.",
    );
  }
  return state;
}
