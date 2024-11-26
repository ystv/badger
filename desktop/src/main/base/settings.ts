import {
  createAction,
  createAsyncThunk,
  createReducer,
} from "@reduxjs/toolkit";
import { AnyZodObject, z, ZodType } from "zod";
import { createAppSlice } from "./reduxHelpers";
import { set, throttle, isEqual, cloneDeep, defaultsDeep } from "lodash";
import { getSettingsStore } from "./settingsStorage";
import { listenOnStore } from "../storeListener";
import { connectToServer } from "./serverConnectionState";
import { getLogger } from "./logging";
import { connectToOBS } from "../obs/state";
import { castDraft, original } from "immer";

const logger = getLogger("settings");

export const AppSettingsSchema = z.object({
  server: z.object({
    endpoint: z.string().url().or(z.null()),
    password: z.string(),
  }),
  obs: z.object({
    host: z.string(),
    port: z.number(),
    password: z.string(),
  }),
  media: z.object({
    mediaPath: z.string(),
    downloader: z.enum(["Auto", "Node", "Curl"]),
  }),
  devtools: z.object({
    enabled: z.boolean(),
  }),
  ontime: z.object({
    host: z.string().url().or(z.null()),
  }),
});
export type AppSettings = z.infer<typeof AppSettingsSchema>;
const defaultSettings: AppSettings = {
  devtools: {
    enabled: false,
  },
  media: {
    mediaPath: "",
    downloader: "Auto",
  },
  obs: {
    host: "",
    port: 4455,
    password: "",
  },
  ontime: {
    host: null,
  },
  server: {
    endpoint: null,
    password: "",
  },
};
export const SettingsStateSchema = AppSettingsSchema.extend({
  _loaded: z.boolean(),
});
type SettingsState = z.infer<typeof SettingsStateSchema>;

export const setSetting = createAction(
  "settings/setSetting",
  (group: keyof AppSettings, field: string, value: unknown) => {
    const groupSchema: AnyZodObject =
      AppSettingsSchema.shape[group as keyof AppSettings];
    const fieldSchema: ZodType = groupSchema.shape[field];
    const val = fieldSchema.parse(value);
    return { payload: { key: `${group}.${field}`, val } };
  },
);

export const initialiseSettings = createAsyncThunk(
  "settings/initialise",
  async () => {
    if (process.env.E2E_TEST === "true") {
      logger.info("Running in E2E test mode, not loading settings from disk");
      return;
    }
    const store = await getSettingsStore();
    return await store.loadSettings();
  },
);

export const settingsReducer = createReducer({} as SettingsState, (builder) => {
  builder.addCase(initialiseSettings.fulfilled, (state, action) => {
    if (!action.payload) {
      state._loaded = true;
      return;
    }
    return {
      ...action.payload,
      _loaded: true,
    };
  });
  builder.addCase(setSetting, (state, action) => {
    set(state, action.payload.key, action.payload.val);
    SettingsStateSchema.parse(state); // validate
  });

  // Save server connection details when we connect
  builder.addCase(connectToServer.fulfilled, (state, action) => {
    state.server.endpoint = action.meta.arg.host;
    state.server.password = action.meta.arg.password;
  });
  // dto for OBS
  builder.addCase(connectToOBS.fulfilled, (state, action) => {
    state.obs.host = action.meta.arg.host;
    state.obs.port = action.meta.arg.port || 4455;
    state.obs.password = action.meta.arg.password;
  });

  // This ensures that the state always has at least the defaults
  builder.addDefaultCase((state) => {
    const rv = cloneDeep(original(state)) ?? {};
    defaultsDeep(rv, defaultSettings);
    return { _loaded: true, ...rv } as SettingsState;
  });
});

const doSaveSettings = throttle(async function (settings: AppSettings) {
  if (process.env.E2E_TEST === "true") {
    logger.info("Running in E2E test mode, not saving settings to disk");
    return;
  }
  const store = await getSettingsStore();
  await store.saveSettings(settings);
}, 500);

listenOnStore({
  predicate: (action, newState, oldState) =>
    !isEqual(newState.settings, oldState.settings) &&
    !initialiseSettings.fulfilled.match(action),
  effect: async (_, api) => {
    const newSettings = api.getState().settings;
    // TODO: feedback?
    await doSaveSettings(newSettings);
  },
});
