function flag(name: string, varName: string, def: boolean): boolean {
  return process.env[varName] === "true" || def;
}

export const enableNomadJobQueue = flag(
  "Nomad Job Queue",
  "ENABLE_NOMAD_JOB_QUEUE",
  false,
);
