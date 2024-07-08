import { Integration } from "../../common/types";

export let supportedIntegrations: Integration[];
// This is fairly rudimentary
if (
  process.env.E2E_TEST === "true" &&
  process.env.__TEST_SUPPORTED_INTEGRATIONS
) {
  supportedIntegrations = JSON.parse(process.env.__TEST_SUPPORTED_INTEGRATIONS);
} else if (process.platform === "win32") {
  supportedIntegrations = ["vmix", "obs", "ontime"];
} else {
  supportedIntegrations = ["obs", "ontime"];
}

export function DEV_overrideSupportedIntegrations(integrations: Integration[]) {
  supportedIntegrations = integrations;
}
