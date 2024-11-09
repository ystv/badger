# Releasing Badger

The bulk of the release process is automated by GitHub Actions.

## Starting a release

This step must be done by someone with "Core" access (@badger-media/core-dev team membership).

Create a tag in the `vx.x.x-rc.x` format, where `vx.x.x` is the new version number and `x` is the release candidate number. For example, `v1.2.3-rc.1`.

Then `git push --tags` to trigger the release action. Watch it in the Actions tab on GitHub.

Wait for a Linear ticket to be filed with a testing checklist. Go through the tests. Then approve the workflow (must be done by someone with "Core" access).

## Behind The Scenes

You can see the definition of it in [`.github/workflows/release.yml`](../.github/workflows/release.yml).

The action will:

1. Create Desktop Windows builds, and Server/Jobrunner Docker images (tagged as e.g. `ghcr.io/badger-media/badger/server/vx.x.x-rc.x`).
2. Run the Server E2E and Desktop Standalone test suites, using those builds, to check that they work.
3. Create a Linear ticket with a manual testing checklist.
4. Wait for approval.
5. Publish the Docker images (tagged as `ghcr.io/badger-media/badger/server/vx.x.x`) and GitHub release (with Desktop installer)

## If It Goes Wrong

Fix it, tag a new RC, and the process starts again.
