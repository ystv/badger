import { message, danger, fail, warn } from "danger";

const issueKeyRe = /(BOW-\d+)/g;

async function findAddedAndRemovedTodoIssues() {
  const removed = new Set<string>();
  const added = new Set<string>();
  const linesWithoutKey = new Set<string>();
  const fixmes = new Set<string>();
  for (const file of danger.git.modified_files.concat(
    ...danger.git.created_files,
  )) {
    const delta = await danger.git.structuredDiffForFile(file);
    if (!delta) {
      continue;
    }
    for (const chunk of delta.chunks) {
      for (const line of chunk.changes) {
        if (line.content.includes("TODO")) {
          const matches = line.content.match(issueKeyRe);
          if (matches) {
            for (const match of matches) {
              if (line.type === "del") {
                removed.add(match);
              } else if (line.type === "add") {
                added.add(match);
              }
            }
          } else {
            // Don't warn if we're removing it
            if (line.type === "add") {
              linesWithoutKey.add(line.content);
            }
          }
        } else if (line.content.includes("FIXME") && line.type !== "del") {
          fixmes.add(line.content);
        }
      }
    }
  }
  return { removed, added, linesWithoutKey, fixmes };
}

export default async () => {
  const { removed, added, linesWithoutKey, fixmes } =
    await findAddedAndRemovedTodoIssues();
  if (removed.size > 0) {
    message(`Removed TODOs: ${Array.from(removed)
      .map((key) => `[${key}](https://linear.app/ystv/issue/${key})`)
      .join(", ")}

Once merged, please close the corresponding Linear tickets.
You can also include \`Closes ${Array.from(removed).join(
      ", ",
    )}\` in the PR description to close the tickets automatically.`);
  }
  if (added.size > 0) {
    message(
      `Added TODOs: ${Array.from(added)
        .map((key) => `[${key}](https://linear.app/ystv/issue/${key})`)
        .join(", ")}`,
    );
  }
  if (linesWithoutKey.size > 0) {
    fail(
      `TODOs without issue key. Please file a Linear ticket and add the number to the comment: \n${Array.from(
        linesWithoutKey,
      )
        .map((l) => " * `" + l + "`")
        .join("\n")}`,
    );
  }
  if (fixmes.size > 0) {
    fail(
      `Found ${fixmes.size} FIXME comments. Please either remove them or convert them to TODOs (with an associated Linear ticket).`,
    );
  }
};

const ticketBranchPrefixRe = /^bow-\d+/i;

if (danger.github.pr) {
  if (
    !(
      issueKeyRe.test(danger.github.pr.title) ||
      issueKeyRe.test(danger.github.pr.body) ||
      ticketBranchPrefixRe.test(danger.github.pr.head.ref)
    )
  ) {
    warn(
      "No Linear ticket found. Please include one in either the pull request title (e.g. `[BOW-123] Fix something`), the description (`Fixes BOW-123.`), or the branch name (`bow-123-fix-something`).",
    );
  }
}
