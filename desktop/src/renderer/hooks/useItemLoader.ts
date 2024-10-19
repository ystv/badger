import { useCallback } from "react";
import { ipc } from "../ipc";
import type { DoAddResult } from "../components/ItemList";
import {
  Asset,
  ContinuityItem,
  Media,
  RundownItem,
} from "@badger/prisma/types";
import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";

type WithMedia<T> = T & { media: Media | null };
type SingleItemType =
  | ({ _type: "continuityItem" } & WithMedia<ContinuityItem>)
  | ({ _type: "rundownItem" } & WithMedia<RundownItem>)
  | ({ _type: "asset" } & WithMedia<Asset>);

export function useItemLoader() {
  const queryClient = useQueryClient();
  const loadSingleOBS = ipc.obs.addMediaAsScene.useMutation();
  const loadSingleVMix = ipc.vmix.loadSingleItem.useMutation();
  const loadFn: (
    item: SingleItemType,
    target: "obs" | "vmix-list" | "vmix-loose",
  ) => Promise<DoAddResult> = useCallback(
    async function _itemLoader(item, target) {
      switch (target) {
        case "obs": {
          const result = await loadSingleOBS.mutateAsync({
            containerType: item._type,
            containerId: item.id,
            rundownId:
              item._type === "rundownItem" ? item.rundownId : undefined,
          });
          queryClient.invalidateQueries(getQueryKey(ipc.obs.listBadgerScenes));
          if (result.done) {
            return { ok: true };
          }
          return {
            ok: false,
            warnings: result.warnings,
            prompt: result.promptReplace,
          };
        }
        case "vmix-loose":
        case "vmix-list": {
          await loadSingleVMix.mutateAsync({
            type: item._type,
            id: item.id,
            rundownId:
              item._type === "rundownItem" ? item.rundownId : undefined,
            mode: target === "vmix-list" ? "list" : "loose",
          });
          queryClient.invalidateQueries(getQueryKey(ipc.vmix.getCompleteState));
          return { ok: true };
        }
      }
    },
    [loadSingleOBS, loadSingleVMix, queryClient],
  );

  return [
    loadFn,
    loadSingleOBS.isLoading || loadSingleVMix.isLoading,
    loadSingleOBS.error ?? loadSingleVMix.error,
  ] as const;
}

type BulkLoadSource =
  | { type: "rundownItems"; rundownID: number }
  | { type: "continuityItems" }
  | { type: "rundownAssets"; rundownID: number; category: string };

export function useBulkLoader() {
  const loadBulkOBS = ipc.obs.bulkAddMedia.useMutation();
  const loadBulkVMix = ipc.vmix.bulkLoad.useMutation();
  const loadFn: (
    source: BulkLoadSource,
    target: "obs" | "vmix-list" | "vmix-loose",
    force?: boolean,
  ) => Promise<void> = useCallback(
    async function _bulkLoader(source, target, force) {
      switch (target) {
        case "obs":
          await loadBulkOBS.mutateAsync({
            source,
          });
          return;
        case "vmix-list":
        case "vmix-loose":
          await loadBulkVMix.mutateAsync({
            source,
            mode: target === "vmix-list" ? "list" : "loose",
            force,
          });
          return;
      }
    },
    [loadBulkOBS, loadBulkVMix],
  );

  return [
    loadFn,
    loadBulkOBS.isLoading || loadBulkVMix.isLoading,
    loadBulkOBS.error ?? loadBulkVMix.error,
  ] as const;
}
