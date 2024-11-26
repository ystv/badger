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
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(tryConnectToServer.pending, (state) => {
      state.state = "connecting";
    });

    builder.addCase(tryConnectToServer.rejected, (state) => {
      state.state = "disconnected";
      // no error here
    });

    builder.addCase(connectToServer.pending, (state) => {
      state.state = "connecting";
    });

    builder.addCase(connectToServer.rejected, (state, action) => {
      state.state = "disconnected";
      state.error = action.error.message ?? "Unknown error";
    });

    builder.addMatcher(serverConnected, (state, action) => {
      if (action.payload) {
        state.state = "connected";
        state.error = null;
        state.versionSkew = action.payload.versionSkew;
      } else {
        state.state = "disconnected";
      }
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
      !settings.server.endpoint?.length ||
      settings.server.password.length === 0
    ) {
      return false;
    }
    return await _tryConnect(
      settings.server.endpoint,
      settings.server.password,
    );
  },
);

export const serverConnected = isAnyOf(
  connectToServer.fulfilled,
  tryConnectToServer.fulfilled,
);
