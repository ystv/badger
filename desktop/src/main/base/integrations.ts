import { createSlice } from "@reduxjs/toolkit";
import { Integration } from "../../common/types";

function getSupportedIntegrations(): Integration[] {
  // This is fairly rudimentary
  if (
    process.env.E2E_TEST === "true" &&
    process.env.__TEST_SUPPORTED_INTEGRATIONS
  ) {
    return JSON.parse(process.env.__TEST_SUPPORTED_INTEGRATIONS);
  } else if (process.platform === "win32") {
    return ["vmix", "obs", "ontime"];
  } else {
    return ["obs", "ontime"];
  }
}

const integrationsSlice = createSlice({
  name: "integrations",
  initialState: {
    supported: getSupportedIntegrations(),
  },
  reducers: {},
});

export const integrationsReducer = integrationsSlice.reducer;
