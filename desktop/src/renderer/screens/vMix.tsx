import { ipc, useInvalidateQueryOnIPCEvent } from "../ipc";
import { Button } from "@badger/components/button";
import { useEffect, useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";
import {
  CompleteAssetSchema,
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@badger/components/alert-dialog";
import { ItemRow } from "../components/ItemList";
import logging from "loglevel";

const logger = logging.getLogger("vMix");

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
  const doBulkLoad = ipc.vmix.bulkLoad.useMutation({
    onSuccess() {
      queryClient.invalidateQueries(getQueryKey(ipc.vmix.getCompleteState));
    },
  });
  const doLoadSingle = ipc.vmix.loadSingleItem.useMutation({
    onSuccess() {
      queryClient.invalidateQueries(getQueryKey(ipc.vmix.getCompleteState));
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

  return (
    <>
      <h2 className="text-xl font-light">VTs</h2>
      {doBulkLoad.error && <Alert>{doBulkLoad.error.message}</Alert>}
      <Table>
        <colgroup>
          <col />
          <col style={{ width: "12rem" }} />
        </colgroup>
        <TableBody>
          {props.rundown.items
            .filter((item) => item.type !== "Segment")
            .sort((a, b) => a.order - b.order)
            .map((item) => {
              const localMediaResource = localMedia.data?.find(
                (x) => x.mediaID === item.media?.id,
              );
              const present = vtsListState?.items?.some(
                (x) => x.source === localMediaResource?.path,
              );
              return (
                <ItemRow
                  key={item.id}
                  item={{
                    ...item,
                    type: "rundownItem",
                    destinationState: present ? "loaded" : "not-present",
                  }}
                  doAdd={async (prompt) => {
                    if (!prompt) {
                      return {
                        ok: false,
                        warnings: [
                          `Are you sure you want to load ${item.name}?
                          This may load it in the wrong order.
                          To load all the VTs in the correct order, click "Load All" instead.`.replace(
                            /\n\s+/g,
                            " ",
                          ),
                        ],
                        prompt: "force",
                      };
                    }
                    await doLoadSingle.mutateAsync({
                      rundownId: props.rundown.id,
                      type: "rundownItem",
                      id: item.id,
                      mode: "list",
                    });
                    return { ok: true };
                  }}
                />
              );
            })}
          <TableRow>
            <TableCell />
            <TableCell>
              <Button
                disabled={doBulkLoad.isLoading}
                onClick={() =>
                  doBulkLoad.mutate({
                    source: {
                      type: "rundownItems",
                      rundownID: props.rundown.id,
                    },
                    mode: "list",
                  })
                }
                className="w-full"
                color={
                  downloadState.data?.some((x) => x.status !== "done")
                    ? "ghost"
                    : "primary"
                }
              >
                Load All <span className="sr-only">VTs</span>
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <AlertDialog
        open={
          doBulkLoad.data?.ok === false && doBulkLoad.data.reason === "playing"
        }
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>VTs Currently Playing</AlertDialogTitle>
            <AlertDialogDescription>
              VTs are currently playing. Loading them may interrupt playback.
              Are you sure?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                doBulkLoad.mutate({
                  source: {
                    type: "rundownItems",
                    rundownID: props.rundown.id,
                  },
                  mode: "list",
                  force: true,
                });
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

function ContinuityItems() {
  const { data: show } = ipc.shows.getSelectedShow.useQuery();
  invariant(show, "no selected show"); // this is safe because MainScreen is rendered inside a ConnectAndSelectShowGate
  const items = show.continuityItems.sort((a, b) => a.order - b.order);

  const qc = useQueryClient();
  const connState = ipc.vmix.getConnectionState.useQuery();
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
  const loadSingle = ipc.vmix.loadSingleItem.useMutation();
  const bulkLoad = ipc.vmix.bulkLoad.useMutation({
    onSuccess() {
      qc.invalidateQueries(getQueryKey(ipc.vmix.getCompleteState));
    },
  });

  if (
    connState.isLoading ||
    vmixState.isLoading ||
    downloadState.isLoading ||
    localMedia.isLoading
  ) {
    return <div>Loading...</div>;
  }
  invariant(
    connState.data && vmixState.data && downloadState.data && localMedia.data,
    "some query data is missing",
  );

  return (
    <>
      <h2 className="text-xl font-light">Continuity</h2>
      <Table>
        <TableBody>
          {items.map((item) => {
            const path = localMedia.data?.find(
              (x) => x.mediaID === item.media?.id,
            )?.path;
            let isLoaded;
            switch (connState.data.loadContinuityItems) {
              case "list": {
                const list = vmixState.data.inputs.find(
                  (x) => x.title === VMIX_NAMES.CONTINUITY_LIST,
                );
                if (list) {
                  if (list.type !== "VideoList") {
                    logger.warn(`Continuity list is not a VideoList`, list);
                    isLoaded = false;
                    break;
                  }
                  isLoaded =
                    list?.items.some((x) => x.source === path) ?? false;
                  break;
                }
                isLoaded = false;
                break;
              }
              case "loose":
                isLoaded = vmixState.data.inputs.some(
                  (x) =>
                    x.type === "Video" &&
                    path?.endsWith(x.title /* FIXME: not sure this is right */),
                );
                break;
              case false:
                invariant(
                  false,
                  "loadContinuityItems is false inside <ContinuityItems>",
                );
            }
            return (
              <ItemRow
                item={{
                  ...item,
                  type: "continuityItem",
                  destinationState: isLoaded ? "loaded" : "not-present",
                }}
                doAdd={async () => {
                  await loadSingle.mutateAsync({
                    type: "continuityItem",
                    id: item.id,
                    mode: "list",
                  });
                  return { ok: true };
                }}
              />
            );
          })}
          <TableRow>
            <TableCell />
            <TableCell>
              <Button
                disabled={bulkLoad.isLoading}
                onClick={() =>
                  bulkLoad.mutate({
                    source: {
                      type: "continuityItems",
                    },
                    mode: "list",
                  })
                }
                className="w-full"
                color={
                  downloadState.data?.some((x) => x.status !== "done")
                    ? "ghost"
                    : "primary"
                }
              >
                Load All <span className="sr-only">Continuity Items</span>
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <AlertDialog
        open={bulkLoad.data?.ok === false && bulkLoad.data.reason === "playing"}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Continuity Currently Playing</AlertDialogTitle>
            <AlertDialogDescription>
              Continuity is currently playing. Loading them may interrupt
              playback. Are you sure?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                bulkLoad.mutate({
                  source: {
                    type: "continuityItems",
                  },
                  mode: "list",
                  force: true,
                });
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
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
  const doLoadSingle = ipc.vmix.loadSingleItem.useMutation({
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
              doLoadSingle.mutate({
                type: "asset",
                id: asset.id,
                mode: "loose",
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
  const doBulkLoad = ipc.vmix.bulkLoad.useMutation({
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
                doBulkLoad.mutate({
                  source: {
                    type: "rundownAssets",
                    rundownID: props.rundown.id,
                    category: props.category,
                  },
                  mode: "list",
                })
              }
            >
              In List
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                doBulkLoad.mutate({
                  source: {
                    type: "rundownAssets",
                    rundownID: props.rundown.id,
                    category: props.category,
                  },
                  mode: "loose",
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

function InnerScreen(props: { rundown: z.infer<typeof CompleteRundownModel> }) {
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

  const connectionState = ipc.vmix.getConnectionState.useQuery();

  return (
    <div className="space-y-4">
      <h1 className="text-2xl">{props.rundown.name}</h1>
      {connectionState.data?.loadRundownItems && (
        <RundownVTs rundown={props.rundown} />
      )}
      {connectionState.data?.loadAssets && (
        <RundownAssets rundown={props.rundown} />
      )}
      {connectionState.data?.loadContinuityItems && <ContinuityItems />}
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
  return <InnerScreen rundown={props.rundown} />;
}
