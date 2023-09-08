import inq from "inquirer";
import { spawn as spawnRaw, exec as execRaw } from "node:child_process";
import { promisify } from "node:util";
import chalk from "chalk";
import * as semver from "semver";
import * as fsp from "node:fs/promises";
import { Octokit } from "octokit";
import { fetch } from "undici";

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
  {
    type: "confirm",
    name: "dontMakePR",
    message:
      "Abuse your power to bypass branch protection and push directly to the main branch?",
    default: false,
  },
]);

const octo = new Octokit({
  auth: (await exec("gh auth token")).stdout.trim(),
  request: { fetch },
});

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

await run("git add .");
if (data.dontMakePR) {
  console.log(
    chalk.bgRedBright(chalk.bold("Pushing bump commit to main branch")),
  );
  console.log(
    chalk.bold(chalk.red("You have 5 seconds to reconsider your decision")),
  );
  await new Promise((resolve) => setTimeout(resolve, 5000));
  console.log(chalk.bgYellowBright("yolo I guess"));
  await run(`git commit -m "Bump version to v${newV}"`);
  await run(`git push`);
} else {
  console.log("Creating bump PR...");
  await run(`git checkout -b release-${newV}`);
  await run(`git commit -m "Bump version to v${newV}"`);
  await run(`git push -u origin release-${newV}`);
  await run(`git checkout main`);

  const pr = await octo.rest.pulls.create({
    owner: "ystv",
    repo: "bowser",
    title: `Bump version to ${newV}`,
    base: "main",
    head: `release-${newV}`,
  });
  const prNumber = pr.data.number;
  await octo.rest.issues.addLabels({
    owner: "ystv",
    repo: "bowser",
    issue_number: prNumber,
    labels: ["release"],
  });

  console.log(
    chalk.green(
      `Opened PR ${chalk.underline(
        `https://github.com/ystv/bowser/pull/${prNumber}`,
      )}. Enabling auto-merge...`,
    ),
  );
  await octo.graphql(
    `
  mutation EnableAutoMerge($prID: ID!) {
    enablePullRequestAutoMerge(input: {
      pullRequestId: $prID,
      mergeMethod: SQUASH,
    }) {
      pullRequest {
        autoMergeRequest {
          enabledAt
        }
      }
    }
  }
  `,
    {
      prID: pr.data.node_id,
    },
  );

  process.stdout.write(chalk.yellow(`Waiting for PR to be merged... `));
  while (true) {
    const state = (
      await octo.rest.pulls.get({
        owner: "ystv",
        repo: "bowser",
        pull_number: prNumber,
      })
    ).data;
    if (state.state === "closed") {
      if (state.merged) {
        break;
      } else {
        console.error(
          chalk.red("PR was closed without being merged. Please try again."),
        );
        process.exit(1);
      }
    }
    await new Promise((resolve) => setTimeout(resolve, 5000));
  }

  console.log(chalk.green("PR merged!"));
}

console.log(chalk.blue("Creating tag and release..."));
await run(`git pull`);
await run(`git tag -a v${newV} -m "v${newV}"`);
await run(`git push origin v${newV}`);

const release = await octo.rest.repos.createRelease({
  owner: "ystv",
  repo: "bowser",
  tag_name: `v${newV}`,
  name: `v${newV}`,
  prerelease: data.prerelease,
  draft: true,
  generate_release_notes: true,
});

console.log(chalk.green("Release created."));
console.log(chalk.underline(release.data.html_url));
console.log(chalk.blue("Running desktop build workflow..."));
await octo.rest.actions.createWorkflowDispatch({
  owner: "ystv",
  repo: "bowser",
  workflow_id: "desktop-build.yml",
  ref: `v${newV}`,
  inputs: {
    ref: `v${newV}`,
    do_release: true,
  },
});

let runId;
for (let attempt = 0; attempt < 120; attempt++) {
  const runs = await octo.rest.actions.listWorkflowRuns({
    owner: "ystv",
    repo: "bowser",
    workflow_id: "desktop-build.yml",
  });
  runId = runs.data.workflow_runs.find(
    (run) => run.head_branch === `v${newV}`,
  )?.id;
  if (runId) {
    break;
  }
  await new Promise((resolve) => setTimeout(resolve, 1000));
}
if (!runId) {
  console.error(
    chalk.red(
      "Could not find desktop build workflow run. Something's gone terribly wrong in the release script.",
    ),
  );
  process.exit(1);
}
console.log(
  `Follow along at ${chalk.underline(
    `https://github.com/ystv/bowser/actions/runs/${runId}`,
  )}`,
);
await run(`gh run watch ${runId}`);

console.log(chalk.green("Desktop build workflow complete."));
console.log(
  `The draft release can be found at ${chalk.underline(
    release.data.html_url,
  )}.`,
);
console.log(
  `Please check over it, edit the release notes if necessary, and make sure everything looks good.`,
);
console.log(
  chalk.green.bold("Press enter once you are ready to publish the release."),
);
const { ready } = await inq.prompt([
  {
    type: "confirm",
    name: "ready",
    message: "Are you ready to publish the release?",
  },
]);
if (!ready) {
  console.log("😭");
  console.log(
    "The draft release will remain up if you want to come back later.",
  );
  process.exit(1);
}
console.log(chalk.blue("Finalising release..."));
await octo.rest.repos.updateRelease({
  owner: "ystv",
  repo: "bowser",
  release_id: release.data.id,
  draft: false,
});
console.log(chalk.green("Release published!"));
console.log(
  chalk.bgGreenBright(
    "Congratulations on another successful Bowser release! 🎉",
  ),
);
console.log(
  "From your release script, thank you for helping us help you help us all.",
);
