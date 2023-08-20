import { fail, warn } from "danger";

const pathMain = process.env.MAIN_RESULTS;
const pathPR = process.env.PR_RESULTS;

if (!pathMain || !pathPR) {
  fail("Internal error: missing path to results");
  process.exit(1);
}

const newMessages: Array<{ file: string; message: string; line: number }> = [];

for (const project of ["desktop", "server", "jobrunner"]) {
  let baseResults;
  try {
    baseResults = require(`${pathMain}/lint-${project}.json`);
  } catch (e) {
    warn(`Failed to load base results for ${project}: ${e}`);
    continue;
  }
  let prResults;
  try {
    prResults = require(`${pathPR}/lint-${project}.json`);
  } catch (e) {
    fail(`Failed to load PR results for ${project}: ${e}`);
    continue;
  }

  const baseMessages = new Set<string>();
  for (const file of baseResults) {
    for (const msg of file.messages) {
      const key = [file.filePath, msg.line, msg.messageId].join(":");
      baseMessages.add(key);
    }
  }

  for (const file of prResults) {
    for (const msg of file.messages) {
      const key = [file.filePath, msg.line, msg.messageId].join(":");
      if (!baseMessages.has(key)) {
        newMessages.push({
          file: file.filePath.replace(process.env.GITHUB_WORKSPACE + "/", ""),
          line: msg.line,
          message: msg.message,
        });
      }
    }
  }
}

for (const msg of newMessages) {
  warn("New lint warning: " + msg.message, msg.file, msg.line);
}
