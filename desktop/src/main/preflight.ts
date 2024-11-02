import { createSlice } from "@reduxjs/toolkit";
import { AppThunk } from "./store";
import { initialiseSettings } from "./base/settings";
import { localMediaActions } from "./media/state";
import { WritableDraft } from "immer";
import { tryConnectToServer } from "./base/serverConnectionState";
import { obsTryConnect as tryConnectToOBS } from "./obs/state";
import { tryConnectToOntime } from "./ontime/state";

const PREFLIGHTS = [
  { name: "Settings", thunk: initialiseSettings, first: true },
  { name: "Local media", thunk: localMediaActions.initialise },
  { name: "Server connection", thunk: tryConnectToServer },
  { name: "OBS connection", thunk: tryConnectToOBS, noDelay: true },
  { name: "Ontime connection", thunk: tryConnectToOntime, noDelay: true },
];

export interface PreflightTask {
  name: string;
  status: "pending" | "success" | "error";
  error?: string;
}

const preflightSlice = createSlice({
  name: "preflight",
  initialState: {
    tasks: [] as PreflightTask[],
    done: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    const NEEDED = PREFLIGHTS.filter((x) => !x.noDelay).length;
    for (const { name, thunk } of PREFLIGHTS) {
      builder.addCase(thunk.pending, (state) => {
        state.tasks.push({ name, status: "pending" });
      });
      builder.addCase(thunk.fulfilled, (state) => {
        const task = state.tasks.find(
          (t) => t.name === name,
        ) as WritableDraft<PreflightTask>;
        task.status = "success";
        const done = state.tasks.filter((t) => t.status === "success").length;
        if (done === NEEDED) {
          state.done = true;
        }
      });
      builder.addCase(thunk.rejected, (state, action) => {
        const task = state.tasks.find(
          (t) => t.name === name,
        ) as WritableDraft<PreflightTask>;
        task.status = "error";
        task.error = action.error.message ?? "Unknown error";
      });
    }
  },
});

export const preflightReducer = preflightSlice.reducer;

export const doPreflight: () => AppThunk = () => async (dispatch) => {
  for (const task of PREFLIGHTS.filter((x) => x.first)) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await dispatch(task.thunk() as any);
  }
  for (const task of PREFLIGHTS.filter((x) => !x.first)) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dispatch(task.thunk() as any);
  }
};
