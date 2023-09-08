import inq from "inquirer";
import { spawn as spawnRaw, exec as execRaw } from "node:child_process";
import { promisify } from "node:util";
import chalk from "chalk";
import * as semver from "semver";
import * as fsp from "node:fs/promises";

const exec = promisify(execRaw);
const run = (cmd) =>
  promisify(execRaw)(cmd, {
    stdio: "inherit",
  });

try {
  const proc = await run("gh auth status");
  console.log(proc.stderr);
} catch (e) {
  if (e instanceof Error && e.message.includes("command not found")) {
    console.error(
      chalk.red("Please install the GitHub CLI (gh) and try again."),
    );
    process.exit(1);
  }
  if (
    e instanceof Error &&
    e.stderr.includes("You are not logged into any GitHub hosts.")
  ) {
    console.error(
      chalk.red("Please log into GitHub using `gh auth login` and try again."),
    );
    process.exit(1);
  }
  throw e;
}

const currentBranch = (await exec("git branch --show-current")).stdout.trim();
if (currentBranch !== "main") {
  console.error(chalk.red("Please run this script from the main branch."));
  process.exit(1);
}

const status = (await exec("git status --porcelain")).stdout.trim();
if (status !== "") {
  console.error(
    chalk.red(
      "Please commit or stash your changes before running this script.",
    ),
  );
  process.exit(1);
}

const data = await inq.prompt([
  {
    type: "list",
    name: "type",
    message: "What type of release is this?",
    choices: [
      { name: "Major (x.0.0)", value: "major" },
      { name: "Minor (x.y.0)", value: "minor" },
      { name: "Patch (x.y.z)", value: "patch" },
      { name: "Pre-release (x.y.z-w)", value: "prerelease" },
    ],
  },
  {
    type: "confirm",
    name: "prerelease",
    message: "Should this be a pre-release?",
  },
]);

console.log(chalk.blue("Updating package versions..."));
let versions = [];
for (const workspace of ["desktop", "jobrunner", "server"]) {
  versions.push(
    JSON.parse(await fsp.readFile(`${workspace}/package.json`, "utf-8"))
      .version,
  );
}
const maxV = semver.maxSatisfying(versions, "*");
const newV = semver.inc(maxV, data.type, data.prerelease ? "beta" : undefined);
console.log(`Bumping version from ${maxV} to ${newV}`);
for (const workspace of ["desktop", "jobrunner", "server"]) {
  // We don't use a JSON.parse/JSON.stringify cycle here because we want to preserve the formatting
  const pkg = await fsp.readFile(`${workspace}/package.json`, "utf-8");
  const newPkg = pkg.replace(/"version":\s*"[^"]+"/, `"version": "${newV}"`);
  await fsp.writeFile(`${workspace}/package.json`, newPkg);
}
await run("yarn");

console.log("Creating bump PR...");
await run("git add .");
await run(`git checkout -b release-${newV}`);
await run(`git commit -m "Bump version to ${data.type}"`);
await run(`git push -u origin release-${newV}`);
const output = await exec(
  `gh pr create --title "Bump version to ${newV}" --body "Bump version to ${newV}" --base main --head release-${newV}`,
);
const prNumber = output.stdout.match(
  /https:\/\/github.com\/ystv\/bowser\/pull\/(\d+)/,
)?.[1];
console.log(
  chalk.green(
    `Opened PR ${chalk.underline(
      `https://github.com/ystv/bowser/pull/${prNumber}`,
    )}. Enabling auto-merge...`,
  ),
);
await run(`gh pr merge --squash --auto`);

while (true) {
  const state = JSON.parse(
    (await exec(`gh pr view ${prNumber} --json state`)).stdout,
  ).state;
  if (state === "MERGED") {
    break;
  }
  console.log(chalk.yellow(`Waiting for PR to be merged... (state: ${state})`));
  await new Promise((resolve) => setTimeout(resolve, 1000));
}

console.log(chalk.green("PR merged!"));
console.log(chalk.blue("Creating tag and release..."));
await run(`git pull`);
await run(`git tag -a v${newV} -m "v${newV}"`);
await run(`git push origin v${newV}`);

const releaseURL = (
  await exec(
    `gh release create v${newV} --title "v${newV}" --draft ${
      data.prerelease && "--prerelease"
    } --generate-notes --verify-tag`,
  )
).stdout.trim();

console.log(chalk.green("Release created."));
console.log(chalk.underline(releaseURL));
console.log(chalk.blue("Running desktop build workflow..."));
await run(
  `gh workflow run desktop-build.yml -f ref=v${newV} -f do_release=true`,
);
const runs = JSON.parse(
  (
    await exec(
      `gh run list --workflow=desktop-build.yml --json status,databaseId`,
    )
  ).stdout,
);
const runId = runs.find(
  (run) => run.status === "queued" || run.status === "in_progress",
)?.databaseId;
if (!runId) {
  console.error(
    chalk.red(
      "Could not find desktop build workflow run. Something's gone terribly wrong in the release script.",
    ),
  );
  process.exit(1);
}
await run(`gh run watch ${runId}`);

console.log(chalk.green("Desktop build workflow complete."));
console.log(
  `The draft release can be found at ${chalk.underline(releaseURL)}.`,
);
console.log(
  `Please check over it, edit the release notes if necessary, and make sure everything looks good.`,
);
console.log(
  chalk.green.bold("Press enter once you are ready to publish the release."),
);
await inq.prompt([
  {
    type: "confirm",
    name: "ready",
    message: "Are you ready to publish the release?",
  },
]);
console.log(chalk.blue("Finalising release..."));
await run(`gh release edit v${newV} --draft false`);
console.log(chalk.green("Release published!"));
console.log(
  chalk.bgGreenBright(
    "Congratulations on another successful Bowser release! 🎉",
  ),
);
console.log(
  "From your release script, thank you for helping us help you help us all.",
);
