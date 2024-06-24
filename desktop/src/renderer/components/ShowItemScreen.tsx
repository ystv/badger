import {
  Asset,
  ContinuityItem,
  Media,
  Rundown,
  RundownItem,
} from "@badger/prisma/types";
import { ipc, useInvalidateQueryOnIPCEvent } from "../ipc";
import { useBulkLoader, useItemLoader } from "../hooks/useItemLoader";
import { DoAddResult, ItemLoadState, ItemRow } from "./ItemList";
import { Table, TableBody } from "@badger/components/table";
import invariant from "../../common/invariant";
import { useCallback, useMemo, useState } from "react";
import { expectNever } from "ts-expect";
import { VMIX_NAMES } from "../../common/constants";
import { ItemLoadingSettings } from "../../main/base/settings";
import { ListInput } from "../../main/vmix/vmixTypes";
import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";
import Button from "@badger/components/button";
import {
  IoCheckmarkDone,
  IoChevronDown,
  IoChevronForward,
  IoDownload,
  IoPush,
} from "react-icons/io5";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@badger/components/dropdown-menu";

type WithMedia<T> = T & { media: Media | null };

export function ShowItemsScreen(props: {
  activeRundown:
    | (Rundown & {
        items: WithMedia<RundownItem>[];
        assets: WithMedia<Asset>[];
      })
    | null;
  continuityItems: WithMedia<ContinuityItem>[];
}) {
  const settings = ipc.core.getItemLoadSettings.useQuery();

  if (settings.isLoading) {
    return <div>Loading...</div>;
  }
  if (settings.error) {
    return <div>Error: {settings.error.message}</div>;
  }

  if (props.activeRundown === null) {
    return (
      <div>
        <h2 className="text-xl font-bold">Continuity Items</h2>
        <Table>
          <TableBody>
            {props.continuityItems.map((item) => (
              <SingleShowItem
                key={item.id}
                item={{ ...item, _type: "continuityItem" }}
              />
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
  return (
    <div>
      <div>
        <h2 className="text-xl font-bold">{props.activeRundown.name}</h2>
        <Table>
          <TableBody>
            {props.activeRundown.items.map((item) => (
              <SingleShowItem
                key={item.id}
                item={{ ...item, _type: "rundownItem" }}
              />
            ))}
          </TableBody>
        </Table>
        <h3 className="text-xl font-bold">Assets</h3>
        <RundownAssets rundown={props.activeRundown} />
      </div>
    </div>
  );
}

type SingleItemType =
  | ({ _type: "continuityItem" } & WithMedia<ContinuityItem>)
  | ({ _type: "rundownItem" } & WithMedia<RundownItem>)
  | ({ _type: "asset" } & WithMedia<Asset>);

function SingleShowItem({ item }: { item: SingleItemType }) {
  const { data: settings } = ipc.core.getItemLoadSettings.useQuery();
  invariant(
    settings,
    "SingleShowItem rendered before getItemLoadSettings completed",
  );

  const obs = ipc.obs.listBadgerScenes.useQuery();
  const vmix = ipc.vmix.getCompleteState.useQuery();
  const local = ipc.media.getLocalMedia.useQuery();

  const { _type: itemType, id: itemId, mediaId: itemMediaId } = item;
  const itemCategory = item._type === "asset" ? item.category : null;

  let target: keyof ItemLoadingSettings;
  switch (itemType) {
    case "rundownItem": {
      target = "rundownItems";
      break;
    }
    case "continuityItem": {
      target = "continuityItems";
      break;
    }
    case "asset": {
      target = "assets";
      break;
    }
    default:
      expectNever(itemType);
  }

  const loadState: ItemLoadState = useMemo(() => {
    if (!obs.data || !vmix.data) {
      return "unknown";
    }
    if (settings[target] === "obs") {
      return obs.data.some((x) => x.type === itemType && x.itemId === itemId)
        ? "loaded"
        : "not-present";
    }
    if (settings[target] === "vmix") {
      if (!local.data) {
        return "unknown";
      }
      const localItem = local.data.find((x) => x.mediaID === itemMediaId);
      if (!localItem) {
        return "not-present";
      }
      // vMix rundown/continuity items are always in lists, but assets can be either lists or loose
      switch (itemType) {
        case "rundownItem":
        case "continuityItem": {
          const listName =
            itemType === "rundownItem"
              ? VMIX_NAMES.VTS_LIST
              : VMIX_NAMES.CONTINUITY_LIST;
          const list = vmix.data.inputs.find(
            (x) => x.type === "VideoList" && x.title === listName,
          );
          if (!listName) {
            return "not-present";
          }
          return (list as ListInput).items.some(
            (x) => x.source === localItem.path,
          )
            ? "loaded"
            : "not-present";
        }
        case "asset": {
          const catList = vmix.data.inputs.find(
            (x) => x.type === "VideoList" && x.title === itemCategory,
          );
          if (catList) {
            return (catList as ListInput).items.some(
              (x) => x.source === localItem.path,
            )
              ? "loaded"
              : "not-present";
          }
          // FIXME: this is wrong - I'm fairly sure shortTitle is the basename, not the full path
          // (though need to confirm that with a copy of vMix to hand)
          return vmix.data.inputs.some((x) => x.shortTitle === localItem.path)
            ? "loaded"
            : "not-present";
        }
      }
    }
    invariant(false, `Unexpected load target ${settings[target]}`);
  }, [
    obs.data,
    vmix.data,
    settings,
    target,
    itemType,
    itemId,
    local.data,
    itemMediaId,
    itemCategory,
  ]);

  const [loadSingle, singleLoading, singleLoadError] = useItemLoader();

  const doLoad: () => Promise<DoAddResult> = useCallback(async () => {
    const loadTarget = settings[target];
    let loadMode: "obs" | "vmix-list" | "vmix-loose";
    switch (loadTarget) {
      case "obs":
        loadMode = "obs";
        break;
      case "vmix":
        // when single-loading an asset, load mode is always "loose"
        loadMode = "vmix-loose";
        break;
      default:
        expectNever(loadTarget);
    }
    const res = await loadSingle(item, loadMode);
    return res;
  }, [item, loadSingle, settings, target]);

  return (
    <ItemRow
      item={{
        ...item,
        type: item._type,
        destinationState: loadState,
      }}
      doAdd={doLoad}
    />
  );
}

function RundownAssets(props: {
  rundown: Rundown & { assets: WithMedia<Asset>[] };
}) {
  const assets: Map<string, WithMedia<Asset>[]> = useMemo(() => {
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

function AssetCategory(props: {
  category: string;
  assets: WithMedia<Asset>[];
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
  const [doBulkLoad] = useBulkLoader();

  const { data: loadSettings } = ipc.core.getItemLoadSettings.useQuery();

  function getAssetState(asset: WithMedia<Asset>): AssetState {
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

  if (!loadSettings) {
    return null; // No "nice" fallback needed - should already be cached in an above component
  }

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
                doBulkLoad(
                  {
                    type: "rundownAssets",
                    rundownID: props.rundown.id,
                    category: props.category,
                  },
                  loadSettings.assets === "vmix"
                    ? "vmix-loose"
                    : loadSettings.assets,
                ).then(() => setDidLoad(true))
              }
            >
              In List
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                doBulkLoad(
                  {
                    type: "rundownAssets",
                    rundownID: props.rundown.id,
                    category: props.category,
                  },
                  loadSettings.assets === "vmix"
                    ? "vmix-loose"
                    : loadSettings.assets,
                ).then(() => setDidLoad(true))
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
              <SingleShowItem
                key={asset.id}
                item={{
                  ...asset,
                  _type: "asset",
                }}
              />
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
