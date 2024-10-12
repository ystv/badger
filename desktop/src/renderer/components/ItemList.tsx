import { AlertDialogFooter } from "@badger/components/alert-dialog";
import { Badge } from "@badger/components/badge";
import Button from "@badger/components/button";
import { Progress } from "@badger/components/progress";
import { TableRow, TableCell } from "@badger/components/table";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogCancel,
  AlertDialogAction,
} from "@radix-ui/react-alert-dialog";
import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";
import { useState, useMemo, useEffect } from "react";
import { ipc, useInvalidateQueryOnIPCEvent } from "../ipc";
import { Media } from "@badger/prisma/types";
import { expectNever } from "ts-expect";

export type ItemLoadState = "not-present" | "loaded" | "unknown";
export interface Item {
  type: "rundownItem" | "continuityItem" | "asset";
  id: number;
  rundownID?: number;
  name: string;
  media: Media | null;
  destinationState: ItemLoadState;
}

export type DoAddResult =
  | { ok: true }
  | { ok: false; warnings: string[]; prompt?: string };

function ItemAddButton({
  item,
  doAdd,
}: {
  item: Item;
  doAdd: (prompt?: string) => Promise<DoAddResult>;
}) {
  const queryClient = useQueryClient();
  const localMedia = ipc.media.getLocalMedia.useQuery();
  const [alert, setAlert] = useState<null | {
    warnings: string[];
    prompt: string;
  }>(null);
  const downloadMedia = ipc.media.downloadMedia.useMutation();
  const downloadStatus = ipc.media.getDownloadStatus.useQuery(void 0, {
    refetchInterval: 1000,
  });
  useInvalidateQueryOnIPCEvent(
    getQueryKey(ipc.media.getLocalMedia),
    "localMediaStateChange",
  );
  const ourDownloadStatus = useMemo(
    () => downloadStatus.data?.find((x) => x.mediaID === item.media?.id),
    [downloadStatus.data, item.media?.id],
  );
  useEffect(() => {
    if (ourDownloadStatus?.status === "done") {
      queryClient.invalidateQueries(getQueryKey(ipc.media.getLocalMedia));
    }
  }, [ourDownloadStatus?.status, queryClient]);

  const state = useMemo(() => {
    if (!item.media) {
      return "no-media";
    }
    // Special-case archived
    if (item.media.state === "Archived") {
      return "archived";
    }
    if (item.media.state !== "Ready") {
      return "media-processing";
    }
    if (!localMedia.data) {
      return "please-wait";
    }
    if (ourDownloadStatus?.status === "downloading") {
      return "downloading";
    }
    if (ourDownloadStatus?.status === "error") {
      return "download-error";
    }
    if (item.destinationState === "unknown") {
      return "unknown";
    }
    if (item.destinationState !== "not-present") {
      if (item.destinationState === "loaded") {
        return "loaded";
      }
      expectNever(item.destinationState);
    }
    if (!localMedia.data.some((x) => x.mediaID === item.media!.id)) {
      return "no-local";
    }
    return "ready";
  }, [
    item.destinationState,
    item.media,
    localMedia.data,
    ourDownloadStatus?.status,
  ]);

  let contents;
  switch (state) {
    case "no-media":
      contents = <Badge variant="dark">No media uploaded</Badge>;
      break;
    case "please-wait":
      contents = <Badge variant="dark">Please wait, checking status...</Badge>;
      break;
    case "archived":
      contents = <Badge variant="dark">Media archived on server</Badge>;
      break;
    case "media-processing":
      contents = <Badge variant="purple">Media processing on server...</Badge>;
      break;
    case "downloading":
      contents = (
        <div>
          <Progress
            value={ourDownloadStatus?.progressPercent}
            className="w-16"
          />
        </div>
      );
      break;
    case "no-local":
      contents = (
        <Button
          color="primary"
          disabled={downloadMedia.isLoading}
          onClick={() =>
            downloadMedia.mutate({ id: item.media!.id, name: item.media!.name })
          }
          className="h-full"
        >
          Download
        </Button>
      );
      break;
    case "download-error":
      contents = (
        <Button
          color="danger"
          disabled={downloadMedia.isLoading}
          onClick={() =>
            downloadMedia.mutate({ id: item.media!.id, name: item.media!.name })
          }
          className="h-full"
        >
          Download
        </Button>
      );
      break;
    case "ready":
      contents = (
        <Button
          color="primary"
          onClick={() => {
            doAdd().then((res) => {
              if (res.ok) {
                return;
              }
              setAlert({
                warnings: res.warnings,
                prompt: res.prompt ?? "OK",
              });
            });
          }}
          className="h-full"
        >
          Load
        </Button>
      );
      break;
    case "loaded":
      contents = <Badge variant="outline">Good to go!</Badge>;
      break;
    case "unknown":
      contents = <Badge variant="outline">Loading...</Badge>;
      break;
    default:
      expectNever(state);
  }
  return (
    <div className="flex justify-center flex-col">
      {contents}
      <AlertDialog
        open={alert !== null}
        onOpenChange={(open) => {
          if (!open) {
            setAlert(null);
          }
        }}
      >
        {alert && (
          <AlertDialogContent>
            {alert.warnings.length > 0 && (
              <ul>
                {alert.warnings.map((warning) => (
                  <li key={warning}>{warning}</li>
                ))}
              </ul>
            )}
            <AlertDialogFooter className="flex items-center">
              <AlertDialogCancel asChild>
                <Button color="light" className="h-full my-0">
                  Cancel
                </Button>
              </AlertDialogCancel>
              <AlertDialogAction asChild>
                <Button
                  color="warning"
                  onClick={async () => {
                    if (alert.prompt === "OK") {
                      setAlert(null);
                      return;
                    }
                    await doAdd(alert.prompt);
                    setAlert(null);
                  }}
                  className="h-full my-0"
                >
                  {alert.prompt}
                </Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        )}
      </AlertDialog>
    </div>
  );
}

export function ItemRow({
  item,
  doAdd,
}: {
  item: Item;
  doAdd: (prompt?: string) => Promise<DoAddResult>;
}) {
  return (
    <TableRow>
      <TableCell className="text-lg font-bold align-middle h-full flex items-center">
        {item.name}
      </TableCell>
      <TableCell>
        <ItemAddButton item={item} doAdd={doAdd} />
      </TableCell>
    </TableRow>
  );
}
