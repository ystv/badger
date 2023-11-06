function flag(name: string, varName: string, def: boolean): boolean {
  return process.env[varName] === "true" || def;
}

export const enableQualityControl = flag(
  "Quality Control",
  "ENABLE_QUALITY_CONTROL",
  true,
);

export const failUploadOnQualityControlFail = flag(
  "Fail Upload on Quality Control Fail",
  "FAIL_UPLOAD_ON_QUALITY_CONTROL_FAIL",
  process.env.E2E_TEST !== "true",
);
