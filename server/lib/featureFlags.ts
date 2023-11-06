function flag(name: string, varName: string, def: boolean): boolean {
  return process.env[varName] === "true" || def;
}
