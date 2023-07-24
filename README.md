# Bowser - Media management for YSTV Live

Bowser is a tool aimed at making YSTV Live setup easier by automating the process of setting up VT and continuity media
files.

**Features:**

* Create and manage show rundowns online
* Upload media files
* Check file quality (coming soon) and normalise loudness
* Automatically import media into OBS and (coming soon) vMix


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


