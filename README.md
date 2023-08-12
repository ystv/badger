# Bowser - Media management for YSTV Live

Bowser is a tool aimed at making YSTV Live setup easier by automating the process of setting up VT and continuity media
files.

**Features:**

* Create and manage show rundowns online
* Upload media files
* Check file quality (coming soon) and normalise loudness
* Automatically import media into OBS and vMix

## Architecture

Bowser is made up of three components:
* `server`, a [Next.js](https://nextjs.org/) app (using the [App Directory](https://nextjs.org/docs/getting-started/react-essentials)) which handles the web interface and API
* `jobrunner`, a standalone [Node.js](https://nodejs.org/en/) service which handles the media processing
* `desktop`, a [Electron](https://www.electronjs.org/) app which handles the OBS integration

All of these components are written in [TypeScript](https://www.typescriptlang.org/).

It also interfaces with a few other services:
* PostgreSQL database
* [Minio](https://min.io/) object storage
* [Tusd](https://tus.io/) file upload server

### Project Structure

`desktop`, `jobrunner`, and `server` are all independent projects with their own `package.json` files.
They are combined into a single project using [Yarn Workspaces](https://yarnpkg.com/features/workspaces).
There are also some extra packages, currently our [Prisma](https://www.prisma.io/) database client, in the `utility` folder.

In terms of imports,
* `desktop` imports some types from `server`, namely tRPC definitions
  * Note that only type imports are allowed, to avoid bundling server code into the desktop build. ESLint will warn you if you try to import anything else. (Importing from `bowser-prisma` is fine.)
* `jobrunner` is entirely separate from `server`
* All three import `bowser-prisma` (the Prisma client, found in `utility/prisma`)

In terms of communication,
* Server exposes a [tRPC](https://trpc.io/) API (in [app/api/_router.ts](./server/app/api/_router.ts), which is consumed by Desktop
* As Desktop is an Electron app, it has two separate processes: the main process and the renderer process.
  The renderer process is the Chrome window, while the main process is the Node.js backend.
  They are kept separate to avoid security issues.
  They communicate over Electron IPC in two ways:
  * Request/response is done using tRPC using [`electron-trpc`](https://github.com/jsonnull/electron-trpc)
    * This is done to improve type safety which is traditionally difficult in Electron
    * This is still done over IPC, not HTTP
  * Events are done through a custom system (defined in [common/ipcEvents.ts](./desktop/src/common/ipcEvents.ts))
* Jobrunner and Server are entirely independent, and only communicate by reading and writing to the PostgreSQL database.
  * Server triggers Jobrunner jobs through the Nomad job scheduler, so Jobrunner is not always running.

## Running

You will need Node.js - the latest LTS (18 at the time of writing) should be fine.
You will also need Yarn - if you don't have it, run `corepack enable` and [Corepack](https://nodejs.org/api/corepack.html) will take care of setting it up.

Clone the repo and install the dependencies:

```sh
# Make sure you have a SSH key set up with GitHub (see https://docs.github.com/en/github/authenticating-to-github/connecting-to-github-with-ssh)
$ git clone git@github.com:ystv/bowser.git
$ cd bowser
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

Then, run `yarn dev` (in the `server` folder) to start the server.

To start the desktop app, run `yarn start` in the `desktop` folder, and to start Jobrunner run `yarn dev` in the `jobrunner` folder.

If you get errors about missing database tables, most likely you haven't run the migrations, or there have been changes since you last pulled - run `yarn prisma:migrateDev`.

## Developing

We use [Linear](https://linear.app/ystv) to track issues - sign in using your @ystv.co.uk Google account (speak to a Computing Team member if you don't have one).

We use [GitHub Flow](https://guides.github.com/introduction/flow/) for development.
Linear has a handy button in the top-right (or press <kbd>Control</kbd><kbd>Shift</kbd><kbd>.</kbd>) to copy a name for an issue's branch, which will automatically link the pull request (when you open it) to the issue.

### Code Style

We use Prettier to automatically format code. If CI fails because of formatting, just run `yarn prettify`.

When it comes to testing, the policy is "please".
Write tests for non-trivial code and if you think it'd be valuable, but don't write tests for the sake of writing tests or just to get coverage up.
We have unit tests (for code that can be tested on its own) and integration tests (for code that *needs* a database or object store to be meaningfully tested), and will at some point ([BOW-69](https://linear.app/ystv/issue/BOW-69/proper-end-to-end-testing) (nice)) have end-to-end testing.

## Deployment

At YSTV, Bowser Server and Jobrunner are deployed to the [Nomad cluster](https://github.com/ystv/nomad).
This is done automatically by Jenkins.

Note that, if you need to deploy database migrations, this will need to be done manually:
1. Deploy a build containing the new migrations
2. Find the `bowser-server-dev` (or eventually `bowser-server-prod`) job in the [Nomad UI](https://nomad.comp.ystv.co.uk/)
3. Click "Exec" and open a shell in the `server` task
4. Run `npx prisma migrate deploy --schema=./utility/prisma/schema.prisma`
