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

// -----------------------------------------------------------------
// Rolled-out features
//
// Flags that can likely be removed now as the feature is always on
// -----------------------------------------------------------------

export const enableUserManagement = flag(
  "User Management",
  "ENABLE_USER_MANAGEMENT",
  true,
);

// -----------------------------------------------------------------
// Kill-switches
//
// Flags that solely exist to allow us to disable a feature in production
// if it starts causing problems
// -----------------------------------------------------------------

export const enableQualityControl = flag(
  "Quality Control",
  "ENABLE_QUALITY_CONTROL",
  true,
);

// -----------------------------------------------------------------
// Development features
//
// Flags that allow us to enable a feature in development that
// isn't yet ready for production use.
// -----------------------------------------------------------------

export const enableYoutube = flag(
  "YouTube Integration",
  "ENABLE_YOUTUBE",
  nonProd,
);

// -----------------------------------------------------------------
// Feature controls
//
// Flags that allow us to enable/disable a feature in production.
// Unlike other flags, there are legitimate reasons to enable or
// disable these.
//
// If we ever have a proper settings system, these should be
// migrated to that.
// -----------------------------------------------------------------

export const enableNomadJobQueue = flag(
  "Nomad Job Queue",
  "ENABLE_NOMAD_JOB_QUEUE",
  false,
);

export const enableGoogleLogin = flag(
  "Google Login",
  "ENABLE_GOOGLE_LOGIN",
  nonE2e,
);

// -----------------------------------------------------------------
// Testing behaviour switches
//
// Flags that allow us to change behaviour in tests if a feature
// is simply untestable or too difficult to test. These should
// never be enabled in production.
// -----------------------------------------------------------------

export const failUploadOnQualityControlFail = flag(
  "Fail Upload on Quality Control Fail",
  "FAIL_UPLOAD_ON_QUALITY_CONTROL_FAIL",
  nonE2e,
);

export const disablePermissionsChecks = flag(
  "Disable Permissions Checks",
  "DISABLE_PERMISSIONS_CHECKS",
  e2e,
);

export const useDummyTestAuth = flag(
  "Use Dummy Test Auth",
  "USE_DUMMY_TEST_AUTH",
  e2e,
);

export const autoActivateAllUsers = flag(
  "Auto-activate All Users",
  "AUTO_ACTIVATE_ALL_USERS",
  e2e,
);
