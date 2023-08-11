function flag(name: string, def: boolean): boolean {
  return process.env[`ENABLE_${name}`] === "true" || def;
}

export const enableNomadJobQueue = flag("NOMAD_JOB_QUEUE", false);
