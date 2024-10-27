# Badger Desktop code architecture

Desktop is an Electron application, so follows the standard Electron process model: a Node.js "main" process (that interacts with the OS and external APIs) and a Chrome "renderer" process (that displays a pretty UI). However, the way the two communicate in Badger is a little unconventional and worth explaining.

In short, we (ab)use Redux.

If you're not familiar with redux, read through the [Redux core concepts](https://redux.js.org/introduction/core-concepts) docs first, as well as some of the other pages on the Redux website (the tutorials are good). The rest of this document assumes you have a basic understanding of Redux.

## Redux

The main process runs a Redux store, just like you may be familiar with from other React apps, except that it runs entirely in Node.js. It stores the entire state of the application (at least anything that the renderer may ever need to care about). This store is created in [`main/store.ts`](../desktop/src/main/store.ts);

Any changes to the state in the main store are sent to the renderer process (over standard Electron IPC) by a special middleware. The renderer process runs its own skeleton store that simply listens for these updates and applies them to its own store. This is done in [`renderer/store.ts`](../desktop/src/renderer/store.ts).

In short:

1. Something in the main process dispatches an action to the main store, either in response to an IPC message or a timer or whatever.
2. The main store runs its reducers to get a new state.
3. A listener in `main/index.ts` (using the [Redux Toolkit listener middleware](https://redux-toolkit.js.org/api/createListenerMiddleware)) reacts to the state change by sending an IPC message `stateChange` to the renderer process.
4. In [`common/preload.ts`](../desktop/src/common/preload.ts), we expose `MainStoreAPI.onStateChange`.
5. In [`renderer/store.ts`](../desktop/src/renderer/store.ts), we listen for `stateChange` messages and dispatch them to the renderer store.
6. The renderer store updates its state (with a dummy reducer that simply applies the state change), and the UI re-renders.

### Special case: the selected show

Nearly every bit of the Badger application needs to know what show is selected, and its contents. For this reason, the selectedShow slice is handled a little differently.

In `main/store.ts`, we define a custom root reducer. When it is called by a Redux dispatch, it first runs the selectedShow reducer. Then it stores the selected show state in a special global variable. It then runs the rest of the reducers, before clearing that special variable (to ensure that it can only be used during reducers.)

That special variable can be acessed with the `getSelectedShow` function in `selectedShow.ts`, but it's only valid to use inside reducers - anywhere else you'll need to access it from the store state as normal.

To quote a comment in main/store.ts:

```ts
// This seems like a side effect and thus forbidden in Redux, but it's actually
// valid, since it's only used within the reducer function itself.
// This is a way to apply the "reducer compostion" pattern within the constraints
// of Redux Toolkit. The "clean" Redux way would be for all the other reducers to
// take the current show state as a third argument, but Redux Toolkit doesn't support
// this and we don't want to re-implement it. So we use this global as a pseudo-argument.
//
// Note that, if any other slices want to react to changes in the selected show, they
// will need to include showDataChangeMatcher as a reducer case as normal.
```

## Dispatching from the renderer

If the renderer wants to interact with the main process, it does this by dispatching an action. However the way it does this is a little unconventional.

Because we need to ensure that actions (including action creators, to be handled by middleware like redux-thunk) all run on the main process, we can't just send back the action objects.
Instead, we "proxy" an object with a set of blessed actions.
This proxy sends back a message to the main process, with all the parameters of the action creator, which then actually calls the action creator and dispatches the result on the main process's store.
Some TypeScript shenanigans makes this look palatable.

The magic happens in:

- [`common/preload.ts`](../desktop/src/common/preload.ts) which exposes the `MainStoreAPI` object, which allows the renderer process to call into the main process.
- [`main/store.ts`](../desktop/src/main/store.ts) which defines `ExposedActionCreators`, an interface of action creators that can be called from the renderer process. It also registers an IPC handler for `dispatch`, which calls the action creator and dispatches the result.
- [`renderer/actionProxiesRenderer.ts`](../desktop/src/renderer/actionProxiesRenderer.ts) which defines the proxy object that the renderer process uses to call action creators.
- [`renderer/store.ts`](../desktop/src/renderer/store.ts) which defines the renderer store, the listener for main process updates, and the blessed handlers (as well as a middleware to catch accidental dispatches)

The flow of a renderer action is:

1. Some renderer code calls `dispatch.someAction(someParams)` (`dispatch` is exported from `renderer/store.ts`)
2. `dispatch` is a proxy that turns that call into a call to `MainStoreAPI._dispatch("someAction", someParams)`
3. `MainStoreAPI._dispatch` sends a `dispatch` invocation to the main process over IPC
4. On the main process, the listener in `main/store.ts` receives the `dispatch` message
5. It calls `exposedActionCreators.someAction(someParams)` and dispatches the resulting action to the main store
6. This creates a standard Redux action that's handled the usual way by the main store's reducers
7. The result of it makes its way back to the renderer process store as above.
8. The result of the dispatch (step 3) is also sent back to the renderer process. This lets you use things like [the result of an async thunk](https://redux-toolkit.js.org/api/createAsyncThunk#handling-thunk-results).
