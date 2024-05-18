# Badger - Media management for YSTV Live

Badger is a tool aimed at making YSTV Live setup easier by automating the process of setting up VT and continuity media
files.

**Features:**

- Create and manage show rundowns online
- Upload media files
- Check file quality (coming soon) and normalise loudness
- Automatically import media into OBS and vMix
- Automatically load running order into Ontime

## Architecture

Badger is made up of three components:

- `server`, a [Next.js](https://nextjs.org/) app which handles the web interface and API
- `jobrunner`, a standalone [Node.js](https://nodejs.org/en/) service which handles the media processing
- `desktop`, a [Electron](https://www.electronjs.org/) app which handles the OBS integration

All of these components are written in [TypeScript](https://www.typescriptlang.org/).

It also interfaces with a few other services:

- PostgreSQL database
- [Minio](https://min.io/) (or other S3-compatible) object storage
- [Tusd](https://tus.io/) file upload server

## Running

_If you're looking to set up a development instance, follow the [contributing guide](./CONTRIBUTING.md) instead._

Every release has Docker images published at `ghcr.io/ystv/badger/server` and `ghcr.io/ystv/badger/jobrunner`.
We also create Desktop builds (Windows-only for now) in the [releases](https://github.com/ystv/badger/releases) section on GitHub.
There is an example [docker-compose file](./docker-compose-example.yml) in the repository which runs server, jobrunner, and all dependencies.

Server and Jobrunner are configured by setting environment variables. A minimal set (both use the same variables) is:

```
# Database connection string
DATABASE_URL="postgresql://root:postgres@localhost:5432/badger_test?schema=public&connection_limit=1"
# Tus endpoint
TUS_ENDPOINT="http://tusd:1080/files"
# If your tusd is accessible from a different URL (e.g. in Docker)
PUBLIC_TUS_ENDPOINT="http://localhost:1080/files"

# S3-compatible storage
S3_ENDPOINT="http://localhost:9000"
AWS_ACCESS_KEY_ID=root
AWS_SECRET_ACCESS_KEY=rootroot
AWS_REGION=us-east-1
STORAGE_BUCKET=badger

# The password you will need to enter into Desktop
API_SHARED_SECRET=aaa

# The URL where Server will be hosted
PUBLIC_URL=http://localhost:3000

# A secret key for signing authentication tokens. The value doesn't matter, but keep it secret!
JWT_SIGNING_KEY=please-change-me
ENVIRONMENT=production

# Use Google sign-in
ENABLE_GOOGLE_LOGIN=true
# Client ID of Google OAuth app for sign-in
GOOGLE_CLIENT_ID=
# Google email domains for which to auto-activate user accounts
# (otherwise users will need to be manually activated)
USER_AUTO_CREATE_DOMAINS=
```

You'll also need to set up the database tables before it will work. Run:

```sh
# inside the server container
$ npx -y prisma migrate deploy --schema utility/prisma/schema.prisma
```

You may need to re-run that command after upgrading.

## Background

Badger was initially developed at [York Student Television (YSTV)](https://ystv.co.uk) for our own live broadcast needs.
YSTV are still the primary users of it, though we have made it public in the hope that it may be useful to other student TV stations or similar organisations.

YSTV use Badger on a regular basis, so we are confident that it is (mostly) stable and usable.
However, we do not guarantee that it will work perfectly in other contexts, and there are still bugs that we work around.
Contributions are always welcome, though please be aware that we may decline changes that would not work for our workflow.
If in doubt, please file an issue before starting work.

There are still quite a few YSTV-isms in its design, for example the semi-arbitrary distinction between rundowns and continuity items - this was borne out of our workflow. Follow issue [BDGR-145](https://github.com/ystv/badger/issues/277) for progress on changing this.

## Developing

We use [Linear](https://linear.app/ystv) to track issues.
If you run into an issue or have a feature request, please create an issue.
If you're a YSTV member, sign in with your @ystv.co.uk Google account.
Otherwise, file a GitHub issue and it'll get automatically synced to Linear.
