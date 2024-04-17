import { ipc, useInvalidateQueryOnIPCEvent } from "../ipc";
import { Button } from "@badger/components/button";
import { useEffect, useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";
import {
  CompleteAssetSchema,
  CompleteRundownItemSchema,
  CompleteRundownModel,
} from "@badger/prisma/utilityTypes";
import { z } from "zod";
import { ListInput } from "../../main/vmix/vmixTypes";
import invariant from "../../common/invariant";
import { Alert } from "@badger/components/alert";
import { Progress } from "@badger/components/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@badger/components/table";
import { Badge } from "@badger/components/badge";
import { Label } from "@badger/components/label";
import { Input } from "@badger/components/input";
import {
  IoCheckmarkDone,
  IoChevronDown,
  IoChevronForward,
  IoDownload,
  IoPush,
} from "react-icons/io5";
import type { Rundown } from "@badger/prisma/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@badger/components/dropdown-menu";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { VMIX_NAMES } from "../../common/constants";

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
  | "archived"
  | "media-processing"
  | "no-local"
  | "downloading"
  | "download-error"
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
      .sort((a, b) => a.order - b.order)
      .map((item) => {
        if (!item.media) {
          return {
            ...item,
            _state: "no-media",
          };
        }
        // Special-case archived
        if (item.media.state === "Archived") {
          return {
            ...item,
            _state: "archived",
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
            switch (dl.status) {
              case "downloading":
                return {
                  ...item,
                  _state: "downloading",
                  _downloadProgress: dl.progressPercent,
                };
              case "pending":
                return {
                  ...item,
                  _state: "downloading",
                  _downloadProgress: 0,
                };
              case "error":
                return {
                  ...item,
                  _state: "download-error",
                };
              case "done":
                // This should advance into "ready" as soon as the localMedia query
                // updates, but for now it'll get stuck as no-local, which is undesirable.
                return {
                  ...item,
                  _state: "downloading",
                  _downloadProgress: 100,
                };
            }
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
                {item._state === "media-processing" && (
                  <Badge variant="purple" className="w-full">
                    Processing on server
                  </Badge>
                )}
                {item._state === "archived" && (
                  <Badge variant="dark" className="w-full">
                    Archived on server
                  </Badge>
                )}
                {item._state === "downloading" && (
                  <Progress value={item._downloadProgress} className="w-16" />
                )}
                {item._state === "download-error" && (
                  <>
                    <Badge variant="danger" className="w-full">
                      Download error!
                    </Badge>
                  </>
                )}
                {(item._state === "no-local" ||
                  item._state === "download-error") && (
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
                    {item._state === "no-local" ? "Download" : "Retry"}
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
                Load All <span className="sr-only">VTs</span>
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
}

type Asset = z.infer<typeof CompleteAssetSchema>;

interface AssetState {
  state:
    | "no-media"
    | "downloading"
    | "no-local"
    | "processing"
    | "processing-failed"
    | "ready";
  downloadProgress?: number;
}

function SingleAsset({
  asset,
  state,
  rundown,
}: {
  asset: Asset;
  state: AssetState;
  rundown: Rundown;
}) {
  const queryClient = useQueryClient();
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

  return (
    <TableRow>
      <TableCell className="text-lg align-middle h-full">
        {asset.name}
      </TableCell>
      <TableCell className="flex justify-center flex-col">
        {state.state === "no-media" && (
          <span className="text-warning-4">No media!</span>
        )}
        {state.state === "processing" && (
          <span className="text-primary-4">Processing on server</span>
        )}
        {state.state === "processing-failed" && (
          <span className="text-warning-4">Processing failed on server!</span>
        )}
        {state.state === "downloading" && (
          <Progress value={state.downloadProgress} />
        )}
        {state.state === "no-local" && (
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
        {state.state === "ready" && (
          <Button
            onClick={() =>
              doLoad.mutate({
                rundownID: rundown.id,
                assetID: asset.id,
              })
            }
            color="primary"
            className="w-full"
          >
            Load
          </Button>
        )}
      </TableCell>
    </TableRow>
  );
}

function AssetCategory(props: {
  category: string;
  assets: Asset[];
  rundown: Rundown;
}) {
  const [isExpanded, setExpanded] = useState(false);

  const queryClient = useQueryClient();
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
  useInvalidateQueryOnIPCEvent(
    getQueryKey(ipc.media.getLocalMedia),
    "localMediaStateChange",
  );

  const doDownload = ipc.media.downloadMedia.useMutation({
    async onSuccess() {
      await queryClient.invalidateQueries(
        getQueryKey(ipc.media.getDownloadStatus),
      );
    },
  });

  // Just so there's *some* feedback - determining it from vMix is unreliable
  // as we don't know how it'll be loaded
  const [didLoad, setDidLoad] = useState(false);
  const doLoad = ipc.vmix.loadAssets.useMutation({
    async onSuccess() {
      setDidLoad(true);
    },
  });

  function getAssetState(asset: Asset): AssetState {
    if (!asset.media) {
      return { state: "no-media" };
    }
    if (asset.media.state === "Archived") {
      return { state: "no-media" };
    }
    if (asset.media.state === "Processing") {
      return { state: "processing" };
    }
    if (asset.media.state === "ProcessingFailed") {
      return { state: "processing-failed" };
    }
    if (asset.media.state !== "Ready") {
      return { state: "no-media" };
    }

    const local = localMedia.data?.find((x) => x.mediaID === asset.media!.id);
    if (!local) {
      const dl = downloadState.data?.find((x) => x.mediaID === asset.media!.id);
      if (dl) {
        switch (dl.status) {
          case "downloading":
            return {
              state: "downloading",
              downloadProgress: dl.progressPercent,
            };
          case "pending":
            return { state: "downloading" };
          case "error":
            return { state: "no-local" };
          case "done":
            return { state: "downloading", downloadProgress: 100 };
        }
      }
      return { state: "no-local" };
    }

    return { state: "ready" };
  }

  const someNeedDownload = props.assets.some(
    (asset) => getAssetState(asset).state === "no-local",
  );

  return (
    <div>
      <div className="px-2 w-full flex items-start justify-center">
        <Button
          size="icon"
          color="ghost"
          onClick={() => setExpanded((v) => !v)}
          title="Expand"
          aria-label={`${isExpanded ? "Collapse" : "Expand"} ${props.category}`}
        >
          {isExpanded ? <IoChevronDown /> : <IoChevronForward />}
        </Button>
        <div className="self-stretch flex items-center justify-center align-middle">
          <h3>{props.category}</h3>
        </div>
        <div className="grow">{/* spacer */}</div>
        {someNeedDownload && (
          <Button
            size="icon"
            color="ghost"
            title="Download All"
            aria-label={`Download All Media in ${props.category}`}
            onClick={() => {
              for (const asset of props.assets) {
                if (getAssetState(asset).state === "no-media") {
                  continue;
                }
                if (getAssetState(asset).state === "no-local") {
                  doDownload.mutate({
                    id: asset.media!.id,
                    name: asset.media!.name,
                  });
                }
              }
            }}
          >
            <IoDownload size="sm" />
          </Button>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size="icon"
              color="ghost"
              title="Load All"
              aria-label={`Load All Media in ${props.category}`}
            >
              {didLoad ? (
                <IoCheckmarkDone data-testid="Load Success" />
              ) : (
                <IoPush size="sm" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() =>
                doLoad.mutate({
                  rundownID: props.rundown.id,
                  category: props.category,
                  loadType: "list",
                })
              }
            >
              In List
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                doLoad.mutate({
                  rundownID: props.rundown.id,
                  category: props.category,
                  loadType: "direct",
                })
              }
            >
              As separate inputs
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {isExpanded && (
        <Table className="space-y-2">
          <colgroup>
            <col />
            <col style={{ width: "12rem" }} />
          </colgroup>
          <TableBody>
            {props.assets.map((asset) => (
              <SingleAsset
                key={asset.id}
                asset={asset}
                state={getAssetState(asset)}
                rundown={props.rundown}
              />
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}

function RundownAssets(props: {
  rundown: z.infer<typeof CompleteRundownModel>;
}) {
  const assets: Map<string, Asset[]> = useMemo(() => {
    const byCategory = new Map();
    for (const asset of props.rundown.assets) {
      if (!byCategory.has(asset.category)) {
        byCategory.set(asset.category, []);
      }
      byCategory.get(asset.category)!.push(asset);
    }
    return byCategory;
  }, [props.rundown.assets]);

  return (
    <>
      <h2 className="text-xl font-light">Assets</h2>
      {Array.from(assets.entries()).map(([category, assets]) => (
        <AssetCategory
          key={category}
          category={category}
          assets={assets}
          rundown={props.rundown}
        />
      ))}
    </>
  );
}

function Rundown(props: { rundown: z.infer<typeof CompleteRundownModel> }) {
  const queryClient = useQueryClient();
  const { data: downloadStatus } = ipc.media.getDownloadStatus.useQuery(
    undefined,
    {
      refetchInterval: (data) =>
        data?.some((x) => x.status !== "done") ? 1_000 : false,
    },
  );
  const [prevDownloadStatus, setPrevDownloadStatus] = useState(downloadStatus);
  useEffect(() => {
    if (prevDownloadStatus !== downloadStatus) {
      setPrevDownloadStatus(downloadStatus);
      queryClient.invalidateQueries(getQueryKey(ipc.media.getLocalMedia));
    }
  }, [downloadStatus, prevDownloadStatus, queryClient]);

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
    return <div>Please wait, getting vMix connection state...</div>;
  }
  if (connectionState.isError) {
    return (
      <div>
        <h2>Something went wrong inside Badger</h2>
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
