import { Integration } from "../../common/types";

export let supportedIntegrations: Integration[];
// This is fairly rudimentary
if (process.platform === "win32") {
  supportedIntegrations = ["vmix", "obs", "ontime"];
} else {
  supportedIntegrations = ["obs", "ontime"];
}

export function DEV_overrideSupportedIntegrations(integrations: Integration[]) {
  supportedIntegrations = integrations;
}
