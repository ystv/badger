import { AsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "./base/reduxHelpers";
import { updateContinuityScenes } from "./obs/state";
import { updateLoadState } from "./vmix/state";

/**
 * Redux slice for managing global error state.
 *
 * @remarks
 * This slice handles the storage and management of global application errors,
 * including async operation failures and their dismissal. This is shown in the
 * UI as a banner at the top of the screen. This is intended for use where having
 * error UI in the component that caused the error is not possible or practical,
 * for instance for background tasks.
 *
 * To trigger a banner from an error, add a handler in the `extraReducers` section
 * for the action creator that can fail.
 */
const globalErrorSlice = createAppSlice({
  name: "globalError",
  initialState: {
    errors: [] as { id: number; message: string; reason: string }[],
    lastID: 0,
  },
  reducers: {
    dismiss(state, action: PayloadAction<{ id: number }>) {
      state.errors = state.errors.filter((e) => e.id !== action.payload.id);
    },
  },
  extraReducers: (builder) => {
    function handle(
      message: string,
      ac: AsyncThunk<unknown, void, NonNullable<unknown>>["rejected"],
    ) {
      builder.addCase(ac, (state, action) => {
        if (
          typeof action.error === "object" &&
          action.error &&
          action.error.message
        ) {
          state.errors.push({
            id: state.lastID++,
            message: message,
            reason: action.error.message,
          });
        }
      });
    }

    handle("Failed to update OBS state", updateContinuityScenes.rejected);
    handle("Failed to update vMix state", updateLoadState.rejected);
  },
});

export const globalErrorReducer = globalErrorSlice.reducer;
export const { dismiss: dismissGlobalError } = globalErrorSlice.actions;
