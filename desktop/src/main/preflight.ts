import { createSlice } from "@reduxjs/toolkit";
import { AppThunk } from "./store";
import { initialiseSettings } from "./base/settings";
import { localMediaActions } from "./media/state";
import { WritableDraft } from "immer";
import { tryConnectToServer } from "./base/serverConnectionState";

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
    let done = 0;
    const checkDone = (
      state: WritableDraft<ReturnType<(typeof preflightSlice)["reducer"]>>,
    ) => {
      done++;
      if (done === 2) {
        state.done = true;
      }
    };
    builder.addCase(initialiseSettings.pending, (state) => {
      state.tasks.push({ name: "Settings", status: "pending" });
    });
    builder.addCase(initialiseSettings.fulfilled, (state) => {
      state.tasks.find((t) => t.name === "Settings")!.status = "success";
      checkDone(state);
    });
    builder.addCase(initialiseSettings.rejected, (state, action) => {
      state.tasks.find((t) => t.name === "Settings")!.status = "error";
      state.tasks.find((t) => t.name === "Settings")!.error =
        action.error.message;
    });

    builder.addCase(localMediaActions.initialise.pending, (state) => {
      state.tasks.push({ name: "Local Media", status: "pending" });
    });
    builder.addCase(localMediaActions.initialise.fulfilled, (state) => {
      state.tasks.find((t) => t.name === "Local Media")!.status = "success";
      checkDone(state);
    });
    builder.addCase(localMediaActions.initialise.rejected, (state, action) => {
      state.tasks.find((t) => t.name === "Local Media")!.status = "error";
      state.tasks.find((t) => t.name === "Local Media")!.error =
        action.error.message;
    });

    builder.addCase(tryConnectToServer.pending, (state) => {
      state.tasks.push({ name: "Server Connection", status: "pending" });
    });
    // NB: this is a matcher, so must come after all addCase calls
    builder.addMatcher(tryConnectToServer.settled, (state) => {
      state.tasks.find((t) => t.name === "Server Connection")!.status =
        "success";
      checkDone(state);
    });
  },
});

export const preflightReducer = preflightSlice.reducer;

export const doPreflight: () => AppThunk = () => async (dispatch) => {
  // first load settings
  await dispatch(initialiseSettings());
  // then everything else
  dispatch(localMediaActions.initialise());
  dispatch(tryConnectToServer());
};
