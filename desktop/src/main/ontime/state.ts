import { createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";
import { createAppSlice } from "../base/reduxHelpers";
import { createOntimeConnection } from "./ontime";
import { AppState } from "../store";
import { getLogger } from "../base/logging";

const logger = getLogger("ontime/state");

const ontimeSlice = createAppSlice({
  name: "ontime",
  initialState: {
    connected: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(connectToOntime.fulfilled, tryConnectToOntime.fulfilled),
      (state, action) => {
        if (action.payload) {
          state.connected = true;
        }
      },
    );
  },
});

export const ontimeReducer = ontimeSlice.reducer;

export const connectToOntime = createAsyncThunk(
  "ontime/connect",
  async (payload: { serverURL: string }, api) => {
    await createOntimeConnection(payload.serverURL);
    return true;
  },
);

export const tryConnectToOntime = createAsyncThunk(
  "ontime/tryConnect",
  async (_, api) => {
    const state = api.getState() as AppState;
    const settings = state.settings.ontime;
    if (!settings.host) {
      logger.info("No saved Ontime credentials, skipping connection attempt");
      return;
    }
    try {
      await createOntimeConnection(settings.host);
    } catch (e) {
      logger.error(`Failed to connect to Ontime using saved credentials: ${e}`);
    }
    return true;
  },
);
