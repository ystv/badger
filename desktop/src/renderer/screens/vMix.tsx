import { ipc, useInvalidateQueryOnIPCEvent } from "../ipc";
import { Button } from "@bowser/components/button";
import { useCallback, useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";
import {
  CompleteAssetSchema,
  CompleteRundownItemSchema,
  CompleteRundownModel,
} from "@bowser/prisma/utilityTypes";
import { z } from "zod";
import { VMIX_NAMES } from "../../common/constants";
import { ListInput } from "../../main/vmixTypes";
import invariant from "../../common/invariant";
import { Alert } from "@bowser/components/alert";
import { Progress } from "@bowser/components/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@bowser/components/table";
import { Badge } from "@bowser/components/badge";
import { Label } from "@bowser/components/label";
import { Input } from "@bowser/components/input";

export function VMixConnection() {
  const [state] = ipc.vmix.getConnectionState.useSuspenseQuery();
  const tryConnect = ipc.vmix.tryConnect.useMutation({
    async onSettled() {
      await queryClient.invalidateQueries(
        getQueryKey(ipc.vmix.getConnectionState),
      );
    },
  });
  const queryClient = useQueryClient();

  return (
    <div>
      <form
        className="space-y-2"
        onSubmit={(e) => {
          e.preventDefault();
          const values = new FormData(e.currentTarget);
          tryConnect.mutate({
            host: values.get("host") as string,
            port: parseInt(values.get("port") as string, 10),
          });
        }}
      >
        <div>
          <Label htmlFor="host">vMix Host</Label>
          <Input id="host" name="host" type="text" defaultValue={state.host} />
        </div>
        <div>
          <Label htmlFor="port">vMix Port</Label>
          <Input
            id="port"
            name="port"
            type="number"
            defaultValue={state.port}
          />
        </div>
        <Button type="submit" color={state.connected ? "ghost" : "primary"}>
          Connect
        </Button>
        {tryConnect.error && (
          <div className="bg-danger-4 text-light">
            {tryConnect.error.message}
          </div>
        )}
        {state.connected && (
          <Alert>
            Connected to vMix {state.edition} v{state.version}
          </Alert>
        )}
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
        doDownload.mutate({ id: item.media.id, name: item.media.name });
      }
    }
  }, [doDownload, items]);

  return (
    <>
      <h2 className="text-xl font-light">VTs</h2>
      {doLoad.error && <Alert>{doLoad.error.message}</Alert>}
      <Table>
        <colgroup>
          <col />
          <col style={{ width: "12rem" }} />
        </colgroup>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="text-lg">{item.name}</TableCell>
              <TableCell>
                {item._state === "no-media" && (
                  <Badge variant="dark" className="w-full">
                    No media uploaded
                  </Badge>
                )}
                {item._state === "downloading" && (
                  <Progress value={item._downloadProgress} className="w-16" />
                )}
                {item._state === "no-local" && (
                  <Button
                    color="primary"
                    className="w-full"
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
                {item._state === "ready" && (
                  <Badge variant="default" className="w-full">
                    Ready for load
                  </Badge>
                )}
                {item._state === "loaded" && (
                  <Badge variant="outline" className="w-full">
                    Good to go!
                  </Badge>
                )}
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell />
            <TableCell>
              <Button
                disabled={doLoad.isLoading}
                onClick={() => doLoad.mutate({ rundownID: props.rundown.id })}
                className="w-full"
                color={
                  items.some((x) => x._state === "ready") ? "primary" : "ghost"
                }
              >
                Load All
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
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
      <Table className="space-y-2">
        <colgroup>
          <col />
          <col style={{ width: "12rem" }} />
        </colgroup>
        <TableBody>
          {assets?.map((asset) => (
            <TableRow key={asset.id}>
              <TableCell className="text-lg align-middle h-full">
                {asset.name}
              </TableCell>
              <TableCell className="flex justify-center flex-col">
                {asset._state === "no-media" && (
                  <span className="text-warning-4">No media!</span>
                )}
                {asset._state === "downloading" && (
                  <Progress value={asset._downloadProgress} />
                )}
                {asset._state === "no-local" && (
                  <Button
                    color="primary"
                    onClick={async () => {
                      invariant(
                        asset.media,
                        "no media for asset in download button handler",
                      );
                      await doDownload.mutateAsync({
                        id: asset.media.id,
                        name: asset.media.name,
                      });
                      await queryClient.invalidateQueries(
                        getQueryKey(ipc.media.getDownloadStatus),
                      );
                    }}
                    className="w-full"
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
                    color="primary"
                    className="w-full"
                  >
                    Load
                  </Button>
                )}
                {asset._state === "loaded" && (
                  <Badge variant="outline">Good to go!</Badge>
                )}
              </TableCell>
            </TableRow>
          )) ?? <div>Loading...</div>}
          <TableRow>
            <TableCell />
            <TableCell className="flex justify-center flex-col">
              <Button
                color={
                  assets?.some((x) => x._state === "ready")
                    ? "primary"
                    : "ghost"
                }
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
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
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

export default function VMixScreen(props: {
  rundown: z.infer<typeof CompleteRundownModel>;
}) {
  const connectionState = ipc.vmix.getConnectionState.useQuery();

  if (connectionState.isLoading) {
    return <div>Please wait...</div>;
  }
  if (connectionState.isError) {
    return (
      <div>
        <h2>Something went wrong inside Bowser</h2>
        <pre>{JSON.stringify(connectionState.error, null, 2)}</pre>
      </div>
    );
  }
  if (!connectionState.data.connected) {
    return (
      <Alert variant="danger">
        Not connected to vMix. Please ensure vMix is running and the TCP API is
        enabled.
      </Alert>
    );
  }
  return <Rundown rundown={props.rundown} />;
}
