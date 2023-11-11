const serverFlagStates = new Map<string, boolean>();
const desktopFlagStates = new Map<string, boolean>();
function flag(
  name: string,
  varName: string,
  def: boolean,
  desktop?: boolean,
): boolean {
  let v;
  if (varName in process.env) {
    v = process.env[varName] === "true";
  } else {
    v = def;
  }
  if (desktop) {
    desktopFlagStates.set(name, v);
  } else {
    serverFlagStates.set(name, v);
  }
  return v;
}

export function logFlagState(desktop?: boolean) {
  console.log("Feature Flags:");
  for (const [name, state] of (desktop
    ? desktopFlagStates
    : serverFlagStates
  ).entries()) {
    console.log(`  ${name}: ${state ? "enabled" : "disabled"}`);
  }
  console.log();
}

const e2e = process.env.E2E_TEST === "true";
const nonE2e = !e2e;
const production = process.env.ENVIRONMENT === "prod";
const nonProd = !production;

export const enableNomadJobQueue = flag(
  "Nomad Job Queue",
  "ENABLE_NOMAD_JOB_QUEUE",
  false,
);

export const enableQualityControl = flag(
  "Quality Control",
  "ENABLE_QUALITY_CONTROL",
  true,
);

export const failUploadOnQualityControlFail = flag(
  "Fail Upload on Quality Control Fail",
  "FAIL_UPLOAD_ON_QUALITY_CONTROL_FAIL",
  nonE2e,
);

export const enableUserManagement = flag(
  "User Management",
  "ENABLE_USER_MANAGEMENT",
  true,
);

export const enableGoogleLogin = flag(
  "Google Login",
  "ENABLE_GOOGLE_LOGIN",
  nonE2e,
);

export const disablePermissionsChecks = flag(
  "Disable Permissions Checks",
  "DISABLE_PERMISSIONS_CHECKS",
  e2e,
);
