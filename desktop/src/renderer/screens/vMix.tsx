import { ipc } from "../ipc";
import Button from "../components/Button";
import { useCallback, useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";
import {
  CompleteRundownItemSchema,
  CompleteRundownModel,
} from "bowser-server/lib/db/utilityTypes";
import { z } from "zod";
import { VMIX_NAMES } from "../../common/constants";
import { ListInput } from "../../main/vmixTypes";

function VMixConnection() {
  const tryConnect = ipc.vmix.tryConnect.useMutation();
  const queryClient = useQueryClient();

  const [host, setHost] = useState("localhost");
  const [port, setPort] = useState(8099);

  const [error, setError] = useState<string | null>(null);

  const doTryConnect = useCallback(async () => {
    try {
      await tryConnect.mutateAsync({ host, port });
      await queryClient.invalidateQueries(
        getQueryKey(ipc.vmix.getConnectionState),
      );
    } catch (e) {
      setError(String(e));
    }
  }, [host, port, queryClient, tryConnect]);

  return (
    <div>
      <h2>Connect to vMix</h2>
      <form
        className="space-y-2"
        onSubmit={async (e) => {
          e.preventDefault();
          await doTryConnect();
        }}
      >
        <label className="block">
          vMix Host
          <input
            type="text"
            value={host}
            onChange={(e) => setHost(e.target.value)}
          />
        </label>
        <label className="block">
          vMix Port
          <input
            type="number"
            value={port}
            onChange={(e) => setPort(Number(e.target.value))}
          />
        </label>
        <Button type="submit" color="primary">
          Connect
        </Button>
        {error && <div className="bg-danger-4 text-light">{error}</div>}
      </form>
    </div>
  );
}

type ItemState = "no-media" | "no-local" | "downloading" | "ready" | "loaded";

function Rundown(props: { rundown: z.infer<typeof CompleteRundownModel> }) {
  const queryClient = useQueryClient();
  const vmixState = ipc.vmix.getCompleteState.useQuery();
  const downloadState = ipc.media.getDownloadStatus.useQuery(undefined, {
    refetchInterval: (data) =>
      data?.some((x) => x.status !== "done") ? 1_000 : false,
  });
  const localMedia = ipc.media.getLocalMedia.useQuery(undefined, {
    refetchInterval: () =>
      downloadState.data?.some((x) => x.status !== "done") ? 1_000 : 10_000,
    staleTime: 2_500,
  });
  const doLoad = ipc.vmix.loadRundownVTs.useMutation();
  const doDownload = ipc.media.downloadMedia.useMutation();

  const vtsListState = useMemo(() => {
    if (!vmixState.data) {
      return null;
    }
    return (
      (vmixState.data.inputs.find(
        (x) => x.shortTitle === VMIX_NAMES.VTS_LIST,
      ) as ListInput) ?? null
    );
  }, [vmixState.data]);
  const items: Array<
    z.infer<typeof CompleteRundownItemSchema> & {
      _state: ItemState;
      _downloadProgress?: number;
    }
  > = useMemo(() => {
    return props.rundown.items
      .filter((item) => item.type !== "Segment")
      .map((item) => {
        if (item.media.length === 0 || item.media[0].state !== "Ready") {
          return {
            ...item,
            _state: "no-media",
          };
        }
        const local = localMedia.data?.find(
          (x) => x.mediaID === item.media[0].id,
        );
        if (!local) {
          const dl = downloadState.data?.find(
            (x) => x.mediaID === item.media[0].id,
          );
          if (dl) {
            return {
              ...item,
              _state: "downloading",
              _downloadProgress: dl.progressPercent,
            };
          }
          return {
            ...item,
            _state: "no-local",
          };
        }
        if (vtsListState?.items?.find((x) => x.source === local.path)) {
          return {
            ...item,
            _state: "loaded",
          };
        }
        return {
          ...item,
          _state: "ready",
        };
      });
  }, [
    downloadState.data,
    localMedia.data,
    props.rundown.items,
    vtsListState?.items,
  ]);

  const doDownloadAll = useCallback(() => {
    for (const item of items) {
      if (item._state === "no-local") {
        doDownload.mutate({ id: item.media[0].id });
      }
    }
  }, [doDownload, items]);

  return (
    <div>
      <h1 className="text-2xl">{props.rundown.name}</h1>
      <div>
        <div className="ml-auto">
          <Button
            isDisabled={items.every((x) => x._state !== "no-local")}
            onClick={doDownloadAll}
          >
            Download All
          </Button>
          <Button
            isDisabled={doLoad.isLoading}
            onClick={() => doLoad.mutate({ rundownID: props.rundown.id })}
          >
            Load All
          </Button>
        </div>
      </div>
      {doLoad.error && (
        <div className="bg-danger-4 text-light">{doLoad.error.message}</div>
      )}
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.id} className="flex flex-row flex-wrap">
            <span className="text-lg font-bold">{item.name}</span>
            <div className="ml-auto">
              {item._state === "no-media" && (
                <span className="text-warning-4">No media!</span>
              )}
              {item._state === "downloading" && (
                <span className="text-purple-4">
                  Downloading {item._downloadProgress?.toFixed(2)}%
                </span>
              )}
              {item._state === "no-local" && (
                <Button
                  color="primary"
                  onClick={async () => {
                    await doDownload.mutateAsync({ id: item.media[0].id });
                    await queryClient.invalidateQueries(
                      getQueryKey(ipc.media.getDownloadStatus),
                    );
                  }}
                >
                  Download
                </Button>
              )}
              {item._state === "ready" && <span>Ready for load</span>}
              {item._state === "loaded" && (
                <span className="text-success-4">Good to go!</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function VMixScreen() {
  const show = ipc.getSelectedShow.useQuery().data!;
  const connectionState = ipc.vmix.getConnectionState.useQuery();
  const [activeRundownID, setActiveRundownID] = useState<number | null>(null);

  if (connectionState.isLoading) {
    return <div>Please wait...</div>;
  }
  if (connectionState.error) {
    return (
      <div>
        <h2>Something went wrong inside Bowser</h2>
        <pre>{JSON.stringify(connectionState.error, null, 2)}</pre>
      </div>
    );
  }
  if (!connectionState.data.connected) {
    return <VMixConnection />;
  }
  return (
    <div className="mt-2">
      {activeRundownID ? (
        <>
          <Button
            size="small"
            color="light"
            onClick={() => setActiveRundownID(null)}
          >
            Change Rundown
          </Button>
          <Rundown
            rundown={show.rundowns.find((x) => x.id === activeRundownID)!}
          />
        </>
      ) : (
        <div className="space-y-2">
          {show.rundowns.map((rundown) => (
            <div key={rundown.id} className="flex flex-row flex-wrap">
              <span className="text-lg font-bold">{rundown.name}</span>
              <div className="ml-auto">
                <Button onClick={() => setActiveRundownID(rundown.id)}>
                  Select
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
      <small className="absolute bottom-0">
        Connected to vMix {connectionState.data.edition} version{" "}
        {connectionState.data.version}
      </small>
    </div>
  );
}
