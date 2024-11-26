import { createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";
import { createAppSlice } from "../base/reduxHelpers";
import { createOntimeConnection, getOntimeInstance } from "./ontime";
import { AppState } from "../store";
import { getLogger } from "../base/logging";
import invariant from "../../common/invariant";
import { showToOntimeEvents } from "./ontimeHelpers";

const logger = getLogger("ontime/state");

const ontimeSlice = createAppSlice({
  name: "ontime",
  initialState: {
    connected: false,
    host: "",
    connectionError: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(connectToOntime.rejected, (state, action) => {
      state.connectionError = String(action.error.message);
    });
    builder.addMatcher(
      isAnyOf(connectToOntime.fulfilled, tryConnectToOntime.fulfilled),
      (state, action) => {
        if (action.payload) {
          state.connected = true;
          state.host = action.payload.host;
        }
      },
    );
  },
});

export const ontimeReducer = ontimeSlice.reducer;

export const connectToOntime = createAsyncThunk(
  "ontime/connect",
  async (payload: { serverURL: string }) => {
    await createOntimeConnection(payload.serverURL);
    return { host: payload.serverURL };
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
    return { host: settings.host };
  },
);

export const pushEvents = createAsyncThunk(
  "ontime/pushEvents",
  async (payload: { rundownID?: number; replacementMode?: "force" }, api) => {
    const state = api.getState() as AppState;
    const selectedShow = state.selectedShow.show;
    invariant(selectedShow, "No show selected");
    const events = showToOntimeEvents(selectedShow, payload.rundownID);
    logger.debug("Ready for Ontime push");
    logger.debug(events);

    const ontime = getOntimeInstance();
    const current = await ontime.getEvents();
    if (payload.replacementMode === "force" || current.length === 0) {
      await ontime.deleteAllEvents();
      // Not in a Promise.all to ensure they're done in order
      // NB: A new event is added to the *top* of the rundown in Ontime, so we need to add them in reverse order
      for (const event of events.reverse()) {
        await ontime.createEvent(event);
      }
      return { done: true };
    }

    if (current.length !== events.length) {
      return { done: false };
    }
    for (let i = 0; i < current.length; i++) {
      if (events[i] && current[i].title !== events[i].title) {
        return { done: false };
      }
    }
    // Nothing to do
    return { done: true };
  },
);
