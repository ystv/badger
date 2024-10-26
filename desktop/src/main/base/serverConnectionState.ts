import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  _setServerApiClient,
  checkForVersionSkew,
  newAPIClient,
} from "./serverApiClient";
import { AppState, AppThunk } from "../store";

const serverConnectionSlice = createSlice({
  name: "serverConnection",
  initialState: {
    state: "disconnected" as "disconnected" | "connecting" | "connected",
    error: null as string | null,
    server: "",
    versionSkew: false,
    preflightComplete: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(connectToServer.pending, (state) => {
      state.state = "connecting";
    });

    builder.addCase(connectToServer.rejected, (state, action) => {
      state.state = "disconnected";
      state.error = action.error.message ?? "Unknown error";
    });

    builder.addMatcher(
      isAnyOf(connectToServer.fulfilled, tryConnectToServer.fulfilled),
      (state, action) => {
        if (action.payload) {
          state.state = "connected";
          state.error = null;
          state.versionSkew = action.payload.versionSkew;
        }
      },
    );

    builder.addMatcher(tryConnectToServer.settled, (state) => {
      state.preflightComplete = true;
    });
  },
});

export const serverConnectionReducer = serverConnectionSlice.reducer;

async function _tryConnect(endpoint: string, password: string) {
  const client = await newAPIClient(endpoint, password);
  const versionSkew = await checkForVersionSkew(client);
  _setServerApiClient(client);
  return {
    versionSkew,
  };
}

export const connectToServer = createAsyncThunk(
  "serverConnection/connect",
  async (data: { host: string; password: string; silenceErrors?: boolean }) => {
    return await _tryConnect(data.host, data.password);
  },
);

export const tryConnectToServer = createAsyncThunk(
  "serverConnection/tryConnect",
  async (_, { getState }) => {
    const settings = (getState() as AppState).settings;
    if (
      settings.server.endpoint.length === 0 ||
      settings.server.password.length === 0
    ) {
      return;
    }
    return await _tryConnect(
      settings.server.endpoint,
      settings.server.password,
    );
  },
);
