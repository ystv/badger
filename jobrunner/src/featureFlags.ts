function flag(name: string, varName: string, def: boolean): boolean {
  return process.env[varName] === "true" || def;
}

export const enableQualityControl = flag(
  "Quality Control",
  "ENABLE_QUALITY_CONTROL",
  true,
);
