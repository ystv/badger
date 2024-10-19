import { ReactNode, useCallback, useEffect, useState } from "react";
import { ipc } from "./ipc";
import Button from "@badger/components/button";
import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";
import invariant from "../common/invariant";

function ServerConnectForm() {
  const queryClient = useQueryClient();
  const [addrEntry, setAddrEntry] = useState(
    import.meta.env.DEV ? "http://localhost:3000" : "https://badger.ystv.co.uk",
  );
  const [password, setPassword] = useState("");
  const doConnect = ipc.core.connectToServer.useMutation();
  const [error, setError] = useState<string | null>(null);
  const connect = useCallback(async () => {
    try {
      await doConnect.mutateAsync({ endpoint: addrEntry, password });
      await queryClient.invalidateQueries(
        getQueryKey(ipc.core.serverConnectionStatus),
      );
    } catch (e) {
      setError(String(e));
    }
  }, [addrEntry, doConnect, password, queryClient]);
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
      <Button color="primary" onClick={connect}>
        Connect
      </Button>
      {error && (
        <div className="block bg-danger-4 text-light p-1 rounded">{error}</div>
      )}
    </>
  );
}

export function SelectShowForm(props: { onSelect?: () => void }) {
  const queryClient = useQueryClient();
  const listShows = ipc.shows.listUpcomingShows.useQuery();
  const selectShow = ipc.shows.setSelectedShow.useMutation({
    async onSuccess() {
      await queryClient.invalidateQueries(
        getQueryKey(ipc.shows.getSelectedShow),
      );
      props.onSelect?.();
    },
  });
  if (listShows.isLoading) {
    return <div>Please wait, loading shows list...</div>;
  }
  if (listShows.error) {
    return (
      <div>
        <h2 className="text-2xl">Error</h2>
        <div className="block bg-danger-4 text-light p-1 rounded">
          {listShows.error.message}
        </div>
        <pre>{JSON.stringify(listShows.error, null, 2)}</pre>
      </div>
    );
  }
  invariant(listShows.data, "listShows.data is null");
  return (
    <div data-testid="SelectShowForm.showsList" role="list">
      {listShows.data.map((show) => (
        <div key={show.id} role="listitem">
          <h3 className="text-xl">{show.name}</h3>
          <Button
            color="primary"
            onClick={() => selectShow.mutate({ id: show.id })}
          >
            Select
          </Button>
        </div>
      ))}
    </div>
  );
}

export default function ConnectAndSelectShowGate(props: {
  children: ReactNode;
}) {
  const queryClient = useQueryClient();
  const connState = ipc.core.serverConnectionStatus.useQuery(void 0, {
    staleTime: 5000,
  });
  const selectedShow = ipc.shows.getSelectedShow.useQuery(void 0);

  useEffect(() => {
    const handler = async () => {
      await queryClient.invalidateQueries(
        getQueryKey(ipc.shows.getSelectedShow),
      );
    };
    window.IPCEventBus.on("selectedShowChange", handler);
    return () => {
      window.IPCEventBus.off("selectedShowChange", handler);
    };
  }, [queryClient]);

  if (connState.error) {
    return (
      <div>
        <h2 className="text-2xl">Error (checking serverConnectionStatus)</h2>
        <div className="block bg-danger-4 text-light p-1 rounded">
          {connState.error.message}
        </div>
        <pre>{JSON.stringify(connState.error, null, 2)}</pre>
      </div>
    );
  }
  if (connState.isLoading || selectedShow.isLoading) {
    return <div>Please wait, getting selected show...</div>;
  }
  if (
    connState.data.ok === true &&
    typeof selectedShow.data === "object" &&
    selectedShow.data !== null
  ) {
    return props.children;
  }
  return (
    <div className="absolute bg-primary-4 w-full h-full m-0 p-0">
      <div className="w-144 h-24 m-auto p-8">
        <h1 className="text-5xl text-light">🦡 Badger</h1>
        {connState.data.warnings?.versionSkew && (
          <div className="block bg-warning-4 text-light p-1 rounded">
            <strong>Server/Desktop version skew detected!</strong> Some features
            may not work correctly, if at all. Check the Desktop logs for more
            details.
          </div>
        )}
        <div className="m-2 p-4 bg-light text-dark rounded">
          {connState.data.ok !== true ? (
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
