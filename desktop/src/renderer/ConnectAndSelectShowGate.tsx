import { ReactNode, useState } from "react";
import Button from "@badger/components/button";
import { dispatch, useAppSelector } from "./store";
import invariant from "../common/invariant";

function ServerConnectForm() {
  const [addrEntry, setAddrEntry] = useState(
    import.meta.env.DEV ? "http://localhost:3000" : "https://badger.ystv.co.uk",
  );
  const [password, setPassword] = useState("");
  const state = useAppSelector((state) => state.serverConnection.state);
  const error = useAppSelector((state) => state.serverConnection.error);

  function connect() {
    dispatch.connectToServer({
      host: addrEntry,
      password,
    });
  }

  return (
    <>
      <label>
        Server address
        <input
          className="w-full"
          type="text"
          value={addrEntry}
          onChange={(e) => setAddrEntry(e.target.value)}
        />
      </label>
      <label>
        Server Password
        <input
          className="w-full"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <Button
        color="primary"
        onClick={connect}
        disabled={state === "connecting"}
      >
        Connect
      </Button>
      {error && (
        <div className="block bg-danger-4 text-light p-1 rounded">{error}</div>
      )}
    </>
  );
}

export function SelectShowForm(props: { onSelect?: () => void }) {
  const { upcomingShows, upcomingShowsError, upcomingShowsLoading } =
    useAppSelector((state) => state.serverData);
  const pending = useAppSelector((state) => state.selectedShow.isLoading);
  if (upcomingShowsLoading) {
    return <div>Please wait, loading shows list...</div>;
  }
  if (upcomingShowsError) {
    return (
      <div>
        <h2 className="text-2xl">Error</h2>
        <div className="block bg-danger-4 text-light p-1 rounded">
          {upcomingShowsError}
        </div>
      </div>
    );
  }
  invariant(upcomingShows, "upcomingShows is null");
  return (
    <div data-testid="SelectShowForm.showsList" role="list">
      {upcomingShows.map((show) => (
        <div key={show.id} role="listitem">
          <h3 className="text-xl">{show.name}</h3>
          <Button
            color="primary"
            onClick={() =>
              dispatch
                .changeSelectedShow(show.id)
                .then(() => props.onSelect?.())
            }
            disabled={pending}
          >
            Select
          </Button>
        </div>
      ))}
    </div>
  );
  return null;
}

export default function ConnectAndSelectShowGate(props: {
  children: ReactNode;
}) {
  const connState = useAppSelector((state) => state.serverConnection);
  const selectedShow = useAppSelector(
    (state) => state.selectedShow.show !== null,
  );

  if (connState.state === "connected" && selectedShow) {
    return props.children;
  }
  return (
    <div className="absolute bg-primary-4 w-full h-full m-0 p-0">
      <div className="w-144 h-24 m-auto p-8">
        <h1 className="text-5xl text-light">🦡 Badger</h1>
        {connState.versionSkew && (
          <div className="block bg-warning-4 text-light p-1 rounded">
            <strong>Server/Desktop version skew detected!</strong> Some features
            may not work correctly, if at all. Check the Desktop logs for more
            details.
          </div>
        )}
        <div className="m-2 p-4 bg-light text-dark rounded">
          {(connState.state === "connected") !== true ? (
            <ServerConnectForm />
          ) : (
            <>
              <h2 className="text-2xl">Select a show</h2>
              <SelectShowForm />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
