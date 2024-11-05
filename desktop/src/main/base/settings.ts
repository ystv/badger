import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { AnyZodObject, z, ZodType } from "zod";
import { createAppSlice } from "./reduxHelpers";
import { set, throttle, isEqual } from "lodash";
import { getSettingsStore } from "./settingsStorage";
import { listenOnStore } from "../storeListener";
import { connectToServer } from "./serverConnectionState";
import { getLogger } from "./logging";
import { connectToOBS } from "../obs/state";

const logger = getLogger("settings");

export const AppSettingsSchema = z.object({
  server: z.object({
    endpoint: z.string().url(),
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
    host: z.string().url(),
  }),
});
export type AppSettings = z.infer<typeof AppSettingsSchema>;
export const AppSettingsSchemaWithDefaults = AppSettingsSchema.default({
  server: {
    endpoint: "https://badger.ystv.co.uk",
    password: "",
  },
  obs: {
    host: "",
    port: 4444,
    password: "",
  },
  media: {
    mediaPath: "",
    downloader: "Auto",
  },
  devtools: {
    enabled: false,
  },
  ontime: {
    host: "http://localhost:4001",
  },
});

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

type SettingsState = AppSettings & { _loaded: boolean };

const settings = createAppSlice({
  name: "settings",
  initialState: { _loaded: false } as SettingsState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setSetting, (state, action) => {
      set(state, action.payload.key, action.payload.val);
    });
    builder.addCase(initialiseSettings.fulfilled, (_, action) => {
      return {
        ...action.payload,
        _loaded: true,
      };
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
  },
});

export const initialiseSettings = createAsyncThunk(
  "settings/initialise",
  async () => {
    const store = await getSettingsStore();
    return await store.loadSettings();
  },
);

const doSaveSettings = throttle(async function (settings: AppSettings) {
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

export const settingsReducer = settings.reducer;
