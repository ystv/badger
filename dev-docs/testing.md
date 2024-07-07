# Testing Badger

## Why?

In short, automated testing ensures that the code you write (a) works and (b, more importantly) continues to work as people (you or others) make changes to the code.
Badger has quite a few moving parts and it's easy to break something without realising it.
The advantage of automated tests is that it checks that _all_ of Badger works, all the time, automatically, for free.

A side-benefit is that we can use this automation for other things.
For example, we run [Renovate](https://docs.renovatebot.com/) to automatically update our dependencies.
In most cases, if the tests pass after an update, Renovate can even merge it automatically, saving huge amounts of time.

## How?

Since Badger has quite a few components (Desktop, Jobrunner, and Server), it has quite a few tests in different suites.

Some of this is a natural consequence of the differing setups of each component.
For example, Server's unit/integration tests use [Jest](https://jestjs.io/), because Next.js has native integration with Jest to avoid needing to configure the build environment by hand.
Whereas Desktop's tests use [Vitest](https://vitest.dev/) because its builds use Vite and Vitest can reuse its config, rather than needing to configure Jest to understand it.

> [!NOTE]
> I'll be the first to admit that it's a bit messy.
> The test suite has naturally grown as the project's scaled.
> If someone wants to try to consolidate it I'll be a very happy bunny.

### Unit Tests

**What:** Individual, isolated bits of code. In particular tests that don't need a working database.  
**Where:** `*.test.ts` files in `server/` / `desktop/`  
**Framework:** Jest (Server), Vitest (Desktop)  
**How to run:** `yarn test`

> [!WARNING]
> Jest and Vitest are very similar - their APIs are nearly identical!
> However, they're not quite the same, so be mindful of which you're using.
> In particular, if you're doing things like mocking, take care to not mix up `jest.mock()` and `vi.mock()`.
>
> Also note that Jest's `beforeAll`/`afterEach` and friends are globally available, whereas in Vitest you need to import them from `vitest`.

### Integration Tests

**What:** Tests that need to talk to a real PostgreSQL database, but don't need to serve HTTP or a webpage.  
**Where:** `*.integration.test.ts` files  
**Framework:** Jest (Server), Vitest (Jobrunner)  
**How to run:** `yarn test:integration`

Integration tests are written in the same way as unit tests, with one key difference: instead of wrapping tests in the `describe` function from Jest/Vitest, they're wrapped in a `integrate` function from `@badger/testing` (`utility/testing`).
This function skips the test if the `TEST_INTEGRATION` environment variable isn't set, so that we can run them separately from the unit tests (since the test runner discovers both at the same time).

The setup file (`jest.init-integration.mjs` / `vitest.init-integration.mjs`) has a trick up its sleeve: it wraps the Prisma database connection to use a new database for each test.
This ensures that tests don't interfere with each other.

### End-to-End Tests

**What:** Tests that exercise the real UI/API, like a human would.  
**Where:** `desktop/e2e`, `server/e2e`  
**Framework**: Playwright  
**How to run:** `yarn test:e2e`

These tests are the most comprehensive, and often the easiest to write, but also the slowest to run.
They start up a real server/desktop app and interact with it as if they were a user.

There's a few things to note about them.

#### General Notes

Server and Desktop often change their behaviour for tests, specifically when the `E2E_TEST` environment variable is set to `true`.
For example, Server can skip authentication, instead using "dummy test auth" (`test`/`test` for the username and password).
Meanwhile, Desktop disables storing its settings on disk, so that tests can override them.

In Server, this is preferably done using feature flags (`utility/feature-flags`) using the `e2e` helper, to centralise it, however there's still some places where the variable is checked directly.

To troubleshoot tests, there's a few useful flags you can pass to Playwright:

- `yarn test:e2e --headed` runs the tests in a visible browser window, so you can see what's going on
- `DEBUG='pw:browser*,pw:api*' yarn test:e2e` will log Playwright's browser calls, so you can see exactly where it gets stuck

In CI, if a test fails, it'll upload a _trace_ as a GitHub Actions artifact.
You can drop this trace into the [trace viewer](https://traces.playwright.dev) to see exactly what the browser was doing when the test failed.
_(It can sometimes be temperamental - if you're using Chrome, try Firefox.)_
Note that your mileage may vary with Desktop tests, as Electron testing is still somewhat immature.

#### Server

Note that, unlike integration tests, we can't easily run tests against a new database each time, as this would require creating a new connection for each test which is too difficult to implement.
Instead, there's a special secret `/api/testOnlyAPIsDoNotUseOutsideOfTestsOrYouWillBeFired/resetDB` endpoint, which deletes all data from the database.
The test fixture (in `server/e2e/lib.ts`) calls it before each test.

As a consequence, Server E2E tests can't run in parallel, as they'd interfere with each other.

Server tests are also run across multiple browsers.
You can run against a specific one using the Playwright `--project` parameter (e.g. `yarn test:e2e --project=firefox`).

#### Desktop

Desktop's tests are split into two suites, `complete` and `standalone`.
You can specify which one to run using the Playwright `--project` parameter (e.g. `yarn test:e2e --project=standalone`).
By default it'll run both.

`standalone` is for tests that solely exercise Desktop's functionality, without also testing Server.
Rather than talking to a live Server instance, they use "MicroServer" (described below) to serve up test data.
You can specify which MicroServer scenario to run against using `test.use()`:

```ts
import { test } from "./base";

test.use({ scenario: "big-show" });
```

`complete` tests, on the other hand, run the full Badger stack: Desktop, Server, and Jobrunner.
These provide the best assurance that Badger works, however they're also the slowest to run.

Where possible, prefer to write `standalone` tests, as they're faster and more reliable.
However, we should still have a few `complete` tests for additional peace of mind.

All other parts of Desktop work as normal, except that when they talk to OBS/vMix they talk to a fake server (OBS) or have the calls mocked out (vMix).
This is because we can't run OBS/vMix in a CI environment.

## MicroServer

MicroServer is a small, lightweight server that serves up test data for the end-to-end tests.

It serves up a tRPC API that's a subset of the real Server API, except that it serves pre-written test data.
It has a "scenarios" system to allow some tests to use slightly different test data.

You can also use MicroServer to develop the Desktop app without needing to run the full Badger stack.

To run it, cd into `server`, run `yarn microserver`, and follow the instructions.

See [`index.ts`](../server/microserver/index.ts)'s top comment for a full description of how to write scenarios.

### Conformance Tests

**What:** Tests that check that the MicroServer API conforms to the real Server API.  
**Where:** `server/microserver/scenarios/**/*.spec.ts`  
**Framework**: Playwright  
**How to run:** `yarn test:e2e --project=microserver` (in the `server` folder)

MicroServer also has its own tests, which are run as part of the Server E2E suite.
They check that the MicroServer API conforms to the real Server API, so that we can be confident that the tests are testing the right thing.
These live in `*.spec.ts` files next to the scenario.

Note that, because tests are isolated, you generally want to write a scenario's worth of tests as one Playwright test and use [soft assertions](https://playwright.dev/docs/test-assertions#soft-assertions) to check multiple things.
This is to avoid needing to set up your entire scenario in Server for each endpoint.
See the `default` tests for an example.

## Writing Tests

When it comes to testing, the policy is "please".
Write tests for non-trivial code and if you think it'd be valuable, but don't write tests for the sake of writing tests or just to get coverage up.

However, writing _regression tests_ (tests that check that a bug doesn't come back) is always a good idea.

In particular, when you set out to fix a bug, it's often a good idea to first write a (failing) test that demonstrates the bug, then fix it, and then re-run your test.
That way you can be confident that you've fixed it, and that it won't come back.

Write the smallest test you can to validate your behaviour - if it can be unit tested, unit test it.
Integration and E2E tests are slower and more prone to flake (tests failing for seemingly no reason).

To quote the [Django testing tutorial](https://docs.djangoproject.com/en/5.0/intro/tutorial05/):

> Up to a certain point, ‘checking that it seems to work’ will be a satisfactory test.
> In a more sophisticated application, you might have dozens of complex interactions between components.

> A change in any of those components could have unexpected consequences on the application’s behavior.
> Checking that it still ‘seems to work’ could mean running through your code’s functionality with twenty different variations of your test data to make sure you haven’t broken something - not a good use of your time.

> That’s especially true when automated tests could do this for you in seconds.
> If something’s gone wrong, tests will also assist in identifying the code that’s causing the unexpected behavior.

> It might seem that our tests are growing out of control.
> At this rate there will soon be more code in our tests than in our application, and the repetition is unaesthetic, compared to the elegant conciseness of the rest of our code.
>
> It doesn’t matter.
> Let them grow.
> For the most part, you can write a test once and then forget about it.
> It will continue performing its useful function as you continue to develop your program.

Once you have written a test and validated that your new feature / bug fix works, it will remain useful - validating that it _still_ works even as people make changes to the code.
