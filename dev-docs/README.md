## Developing

We use [Linear](https://linear.app/ystv) to track issues.
If you're a YSTV member, sign in with your @ystv.co.uk Google account.
Otherwise, file a GitHub issue and it'll get automatically synced to Linear.

> [!NOTE]
> YSTV members: unless there's a reason not to (e.g. private Slack conversations), add the `Public` label to the Linear ticket when you create it.
> This will create a GitHub issue so that people outside YSTV can see the issue and contribute.

We use [GitHub Flow](https://guides.github.com/introduction/flow/) for development.
Linear has a handy button in the top-right (or press <kbd>Control</kbd><kbd>Shift</kbd><kbd>.</kbd>) to copy a name for an issue's branch, which will automatically link the pull request (when you open it) to the issue.

Please ensure your PR has a Linear ticket associated with it before merging.

## Project Structure

`desktop`, `jobrunner`, and `server` are all independent projects with their own `package.json` files.
They are combined into a single project using [Yarn Workspaces](https://yarnpkg.com/features/workspaces).
There are also some extra packages, currently our [shadcn/ui](https://ui.shadcn.com) components and our [Prisma](https://www.prisma.io/) database client, in the `utility` folder.

In terms of imports,

- `desktop` imports some types from `server`, namely tRPC definitions
  - Note that only type imports are allowed, to avoid bundling server code into the desktop build. ESLint will warn you if you try to import anything else. (Importing from `@badger/prisma` is fine.)
- `jobrunner` is entirely separate from `server`
- Desktop and Server use `@badger/prisma` (our UI components library, found in `utility/components`)
- All three import `@badger/prisma` (the Prisma client, found in `utility/prisma`)

In terms of communication,

- Server exposes a [tRPC](https://trpc.io/) API (in [app/api/\_router.ts](./server/app/api/_router.ts), which is consumed by Desktop
- As Desktop is an Electron app, it has two separate processes: the main process and the renderer process.
  The renderer process is the Chrome window, while the main process is the Node.js backend.
  They are kept separate to avoid security issues.
  They communicate over Electron IPC in two ways:
  - Request/response is done using tRPC using [`electron-trpc`](https://github.com/jsonnull/electron-trpc)
    - This is done to improve type safety which is traditionally difficult in Electron
    - This is still done over IPC, not HTTP
  - Events are done through a custom system (defined in [common/ipcEvents.ts](./desktop/src/common/ipcEvents.ts))
- Jobrunner and Server are entirely independent, and only communicate by reading and writing to the PostgreSQL database.
  - Server triggers Jobrunner jobs through the Nomad job scheduler, so Jobrunner is not always running.

## Running

You will need Node.js - the latest LTS (18 at the time of writing) should be fine.
You will also need Yarn - if you don't have it, run `corepack enable` and [Corepack](https://nodejs.org/api/corepack.html) will take care of setting it up.

Clone the repo and install the dependencies:

```sh
# Make sure you have a SSH key set up with GitHub (see https://docs.github.com/en/github/authenticating-to-github/connecting-to-github-with-ssh)
$ git clone git@github.com:ystv/badger.git
$ cd badger
$ yarn
```

You will need a PostgreSQL instance, S3 or a S3-compatible object storage service, and a tusd server.
The easiest way to set all these up is to use Docker Compose:

```sh
$ docker-compose up -d
```

Go into the `server/` folder and create a file called `.env.local`.
There you can set environment variables that you don't want to accidentally commit and make public.
For now, the only ones you'll need are `YSTV_SSO_USERNAME` and `YSTV_SSO_PASSWORD` - these are application credentials for our internal [SSO service](https://github.com/ystv/SSO) (not your usual login) and can be acquired by asking @markspolakovs.
Alternatively, you can add `USE_DUMMY_TEST_AUTH=true` to `.env.local` and use username and password `test`.

Then, run `yarn dev` (in the `server` folder) to start the server.

To start the desktop app, run `yarn start` in the `desktop` folder, and to start Jobrunner run `yarn dev` in the `jobrunner` folder.

If you get errors about missing database tables, most likely you haven't run the migrations, or there have been changes since you last pulled - run `yarn prisma:migrateDev`.

### Libraries

We use [Prisma](https://www.prisma.io/) as our database client.
Note that our Prisma client lives in a utility package (`@badger/prisma`, found in [utility/prisma](./utility/prisma)), which means that you need to run `yarn prisma:generate` rather than the usual `yarn prisma generate` after making changes to the schema.
Similarly, when making a new migration, use `yarn prisma:migrateDev` rather than `yarn prisma migrate dev`.
(Why in a utility package? Because we use [zod-prisma-types](https://github.com/chrishoermann/zod-prisma-types) to generate [Zod](https://github.com/colinhacks/zod) type definitions from the Prisma models, which are also used by Desktop.)

We use [Tailwind CSS](https://tailwindcss.com/) for styling.
This is a utility-first CSS framework, which means that rather than having a set of pre-defined components, you have a set of utility classes that you can use to build your own components.

We use [shadcn/ui](https://ui.shadcn.com/) as our UI component library.
shadcn is unique in that, rather than it being a library that you install, you copy-paste its components' source into your project.
This means that we can easily customise it to our needs, and it's also easier to debug.
shadcn internally uses [Tailwind CSS](https://tailwindcss.com/) and [Radix UI](https://www.radix-ui.com/).

Note that our components live in a utility package (`@badger/components`, found in [utility/components](./utility/components)), which confuses the shadcn CLI, so you may need to add new components by hand.
When you do this, you'll probably also need to change the `@/lib/utils` import to `./utils`.

#### Automation

We use [Renovate](https://docs.renovatebot.com/) to automatically watch for new versions of our dependencies and file PRs.

Renovate is also configured to automatically merge upgrades to `devDependencies`, as well as all patch version (e.g. `1.2.3` to `1.2.4`) upgrades - assuming tests pass, of course.
This means that a lot of the work of keeping dependencies up-to-date is automated.
Where Renovate doesn't auto-merge, just merge the PR yourself.

### Testing

See [the testing guide](./dev-docs/testing.md) for more information.

#### Running tests

We use [Jest](https://jestjs.io) (in Server) and [Vitest](https://vitest.dev) (in Desktop and Jobrunner) for our unit and integration tests, and [Playwright](https://playwright.dev/) for our end-to-end tests.
All tests are run on every pull request by CI (GitHub Actions), and the E2E tests run against Chrome, Firefox, and WebKit (Safari) to validate cross-browser compatibility.

To run the tests on your machine, run these commands in the appropriate folder (`server`/`jobrunner`/`desktop`):

- Unit tests: `yarn test`
- Integration tests: `yarn test:integration`
- E2E tests: `yarn test:e2e`
  - You will need to run a database (see above) and Server (`NODE_ENV=test E2E_TEST=true USE_DUMMY_TEST_AUTH=true yarn dev`). For some tests you will also need to run Jobrunner (`NODE_ENV=test E2E_TEST=true yarn dev --watch`)
  - You will need to build Desktop before running its E2E tests (`yarn package`)
    - It may be helpful to run them as `yarn package && yarn test:e2e`

To debug the E2E tests, run `yarn test:e2e --debug` (see Playwright's docs).
For even more debugging output, run `DEBUG=pw:api,pw:browser yarn test:e2e`.

GitHub is configured to not allow merging a pull request untill all tests (including E2E) are passing.
This not only serves as a safeguard, but also means you can use the "auto-merge" button to automatically merge the PR once all tests have passed.

If a test fails on your PR, fix it.
We rely on a broad test suite to ensure that Badger remains functional.
In some cases the E2E tests can "flake", or fail for seemingly no reason - in this case it's acceptable to re-run the test to see if it'll pass on the second run, but please file a [Linear](https://linear.app/ystv/team/BDGR) ticket, with the Playwright test trace (downloadable from the Artifacts section on the GitHub Actions summary), to remind us to track down the cause of the flake and fix it.
Playwright's [trace](https://playwright.dev/docs/trace-viewer-intro) feature is very useful for tracking down the cause of a failure.

As an absolute last resort, if the test keeps failing and you're _sure_ that the failure is unrelated to your code, @markspolakovs and @dan-wade42 can override the merge requirements - though please still file a ticket.

### Code Style

We use Prettier to automatically format code. If CI fails because of formatting, just run `yarn prettify`.

TODO comments are allowed, but must be associated with a Linear ticket prior to merging your pull request (e.g. `// TODO [BDGR-123]: Fix this`).
It's a good idea to wait until just before merging before you file the ticket, so you don't end up adding TODOs that you later remove.
CI will remind you if you leave any.

FIXME comments are not allowed, so you can use those as "notes to self" that you intend to address before merging.
CI will not let you merge if you leave any in.

## Deployment

At YSTV, Badger Server and Jobrunner are deployed to the [Nomad cluster](https://github.com/ystv/nomad).
This is done automatically by Jenkins.

Note that, if you need to deploy database migrations, this will need to be done manually:

1. Deploy a build containing the new migrations
2. Find the `badger-dev` or `badger-prod` job in the [Nomad UI](https://nomad.comp.ystv.co.uk/)
3. Click "Exec" and open a shell in the `server` task
4. Run `npx prisma migrate deploy --schema=./utility/prisma/schema.prisma`

### Releasing

We have two "environments" of Badger in production, `dev` (https://badger.dev.ystv.co.uk) and `prod` (https://badger.ystv.co.uk).
They have separate databases and file stores from each other, so you can use `dev` for testing while people carry on using `prod` for shows.

All code merged into the `main` branch is automatically deployed to `dev` by Jenkins.
Code can be deployed to `prod` by pushing a Git tag in the format `vx.y.z`.

Don't do this by hand though!
You'll need to update the `version` in all the package.json files so that it shows up correctly.
You'll probably also want to build a new .msi of Desktop to install on the studio PCs.
(Eventually there'll be auto-update support, but there isn't yet.)

There is a script, [`scripts/do-release.mjs`](./scripts/do-release.mjs), that will automate the whole process, including bumping the versions, pushing a tag, and building Desktop.
Run `node scripts/do-release.mjs` and it'll handle the rest.
(You'll also need the [`gh` CLI](https://cli.github.com/) installed as it uses it internally.)
