import { ipc, useInvalidateQueryOnIPCEvent } from "../ipc";
import Button from "../components/Button";
import { useCallback, useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";
import {
  CompleteAssetSchema,
  CompleteRundownItemSchema,
  CompleteRundownModel,
} from "bowser-prisma/utilityTypes";
import { z } from "zod";
import { VMIX_NAMES } from "../../common/constants";
import { ListInput } from "../../main/vmixTypes";
import invariant from "../../common/invariant";

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

type ItemState =
  | "no-media"
  | "media-processing"
  | "no-local"
  | "downloading"
  | "ready"
  | "loaded";

function RundownVTs(props: { rundown: z.infer<typeof CompleteRundownModel> }) {
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
  const doLoad = ipc.vmix.loadRundownVTs.useMutation({
    onSuccess() {
      queryClient.invalidateQueries(getQueryKey(ipc.vmix.getCompleteState));
    },
  });
  const doDownload = ipc.media.downloadMedia.useMutation({
    onSuccess() {
      queryClient.invalidateQueries(getQueryKey(ipc.media.getDownloadStatus));
    },
  });

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
        if (!item.media) {
          return {
            ...item,
            _state: "no-media",
          };
        }
        if (item.media.state !== "Ready") {
          return {
            ...item,
            _state: "media-processing",
          };
        }
        const local = localMedia.data?.find(
          (x) => x.mediaID === item.media!.id,
        );
        if (!local) {
          const dl = downloadState.data?.find(
            (x) => x.mediaID === item.media!.id,
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
      if (item._state === "no-local" && item.media) {
        doDownload.mutate({ id: item.media.id });
      }
    }
  }, [doDownload, items]);

  return (
    <>
      <h2 className="text-xl font-light">VTs</h2>
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
            <span className="text-lg">{item.name}</span>
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
                    invariant(
                      item.media,
                      "no media for item in download button handler",
                    );
                    await doDownload.mutateAsync({ id: item.media.id });
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
    </>
  );
}

function RundownAssets(props: {
  rundown: z.infer<typeof CompleteRundownModel>;
}) {
  const queryClient = useQueryClient();
  const vmixState = ipc.vmix.getCompleteState.useQuery(undefined, {
    refetchInterval: () => 15_000,
    staleTime: 2_500,
  });
  const downloadState = ipc.media.getDownloadStatus.useQuery(undefined, {
    refetchInterval: (data) =>
      data?.some((x) => x.status !== "done") ? 1_000 : false,
  });
  const localMedia = ipc.media.getLocalMedia.useQuery(undefined, {
    refetchInterval: () =>
      downloadState.data?.some((x) => x.status === "downloading")
        ? 2_500
        : 10_000,
    staleTime: 2_500,
  });
  const assetSettings = ipc.assets.getSettings.useQuery();
  useInvalidateQueryOnIPCEvent(
    getQueryKey(ipc.assets.getSettings),
    "assetsSettingsChange",
  );
  const doDownload = ipc.media.downloadMedia.useMutation({
    async onSuccess() {
      await queryClient.invalidateQueries(
        getQueryKey(ipc.media.getDownloadStatus),
      );
    },
  });
  const doLoad = ipc.vmix.loadAssets.useMutation({
    async onSuccess() {
      await queryClient.invalidateQueries(
        getQueryKey(ipc.vmix.getCompleteState),
      );
    },
  });

  const assets: Array<
    z.infer<typeof CompleteAssetSchema> & {
      _state: ItemState;
      _downloadProgress?: number;
    }
  > | null = useMemo(() => {
    if (!assetSettings.data) {
      return null;
    }
    if (!localMedia.data) {
      return null;
    }
    if (!vmixState.data) {
      return null;
    }
    return props.rundown.assets.map((asset) => {
      if (!asset.media) {
        return {
          ...asset,
          _state: "no-media",
        };
      }
      if (asset.media.state !== "Ready") {
        return {
          ...asset,
          _state: "media-processing",
        };
      }
      const local = localMedia.data.find((x) => x.mediaID === asset.media!.id);
      if (!local) {
        const dl = downloadState.data?.find(
          (x) => x.mediaID === asset.media!.id,
        );
        if (dl) {
          return {
            ...asset,
            _state: "downloading",
            _downloadProgress: dl.progressPercent,
          };
        }
        return {
          ...asset,
          _state: "no-local",
        };
      }
      const addMode = assetSettings.data.loadTypes[asset.type] ?? "direct";
      let alreadyPresent;
      if (addMode === "direct") {
        alreadyPresent = vmixState.data.inputs.find(
          (x) => x.title === local.path,
        );
      } else {
        const list = vmixState.data.inputs.find(
          (x) => x.shortTitle === VMIX_NAMES.ASSET_LIST[asset.type],
        );
        if (list) {
          alreadyPresent = (list as ListInput).items.find(
            (x) => x.source === local.path,
          );
        } else {
          alreadyPresent = false;
        }
      }
      return {
        ...asset,
        _state: alreadyPresent ? "loaded" : "ready",
      };
    });
  }, [
    assetSettings.data,
    downloadState.data,
    localMedia.data,
    props.rundown.assets,
    vmixState.data,
  ]);

  return (
    <>
      <h2 className="text-xl font-light">Assets</h2>
      <div>
        <div className="flex flex-row ml-auto">
          <Button
            onClick={() => {
              invariant(assets, "no assets");
              assets
                .filter((x) => x._state === "no-local")
                .forEach((a) => doDownload.mutate({ id: a.media!.id }));
            }}
          >
            Download All
          </Button>
          <Button
            onClick={() => {
              invariant(assets, "no assets");
              doLoad.mutate({
                rundownID: props.rundown.id,
                assetIDs: assets
                  .filter((x) => x._state === "ready")
                  .map((x) => x.id),
              });
            }}
          >
            Load All
          </Button>
        </div>
      </div>
      <div className="space-y-2">
        {assets?.map((asset) => (
          <div key={asset.id} className="flex flex-row flex-wrap">
            <span className="text-lg">{asset.name}</span>
            <div className="ml-auto">
              {asset._state === "no-media" && (
                <span className="text-warning-4">No media!</span>
              )}
              {asset._state === "downloading" && (
                <span className="text-purple-4">
                  Downloading {asset._downloadProgress?.toFixed(2)}%
                </span>
              )}
              {asset._state === "no-local" && (
                <Button
                  color="primary"
                  onClick={async () => {
                    invariant(
                      asset.media,
                      "no media for asset in download button handler",
                    );
                    await doDownload.mutateAsync({ id: asset.media.id });
                    await queryClient.invalidateQueries(
                      getQueryKey(ipc.media.getDownloadStatus),
                    );
                  }}
                >
                  Download
                </Button>
              )}
              {asset._state === "ready" && (
                <Button
                  onClick={() =>
                    doLoad.mutate({
                      rundownID: props.rundown.id,
                      assetIDs: [asset.id],
                    })
                  }
                >
                  Load
                </Button>
              )}
              {asset._state === "loaded" && (
                <span className="text-success-4">Good to go!</span>
              )}
            </div>
          </div>
        )) ?? <div>Loading...</div>}
      </div>
    </>
  );
}

function Rundown(props: { rundown: z.infer<typeof CompleteRundownModel> }) {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl">{props.rundown.name}</h1>
      <RundownVTs rundown={props.rundown} />
      <RundownAssets rundown={props.rundown} />
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
