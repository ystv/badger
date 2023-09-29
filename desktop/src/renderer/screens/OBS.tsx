import { ipc } from "../ipc";
import { useForm } from "react-hook-form";
import { Button } from "@bowser/components/button";
import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Alert } from "@bowser/components/alert";
import { Progress } from "@bowser/components/progress";
import { Badge } from "@bowser/components/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
} from "@bowser/components/alert-dialog";
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@bowser/components/table";

import { CompleteContinuityItemModel } from "@bowser/prisma/utilityTypes";
import { z } from "zod";
import invariant from "../../common/invariant";
import { Label } from "@bowser/components/label";
import { Input } from "@bowser/components/input";

export function OBSSettings() {
  const queryClient = useQueryClient();
  const state = ipc.obs.getConnectionState.useQuery();
  const connect = ipc.obs.connect.useMutation({
    async onSettled() {
      await queryClient.invalidateQueries(
        getQueryKey(ipc.obs.getConnectionState),
      );
    },
  });
  const { register, handleSubmit } = useForm({
    defaultValues: {
      host: "localhost",
      port: 4455,
      password: "",
    },
  });
  const [error, setError] = useState<string | null>(null);
  return (
    <div>
      <form
        className="space-y-2"
        onSubmit={handleSubmit(async (data) => {
          try {
            await connect.mutateAsync(data);
            await queryClient.invalidateQueries(
              getQueryKey(ipc.obs.getConnectionState),
            );
          } catch (e) {
            setError(String(e));
          }
        })}
      >
        <div>
          <Label htmlFor="obsHost">OBS Host</Label>
          <Input
            id="obsHost"
            type="text"
            {...register("host")}
            className="border-2 mx-4 my-2 p-1"
          />
        </div>
        <div>
          <Label htmlFor="obsPort">OBS WebSocket Port</Label>
          <input
            id="obsPort"
            type="number"
            {...register("port")}
            className="border-2 mx-4 my-2 p-1"
          />
        </div>
        <div>
          <Label htmlFor="obsPassword">OBS WebSocket Password</Label>
          <input
            id="obsPassword"
            type="text"
            {...register("password", { required: true })}
            className="border-2 mx-4 my-2 p-1"
          />
        </div>
        <Button type="submit" color="primary" disabled={connect.isLoading}>
          Connect
        </Button>
        {state.data?.connected && (
          <Alert data-testid="OBSSettings.success">
            Successfully connected to OBS version {state.data.version} on{" "}
            {state.data.platform}
          </Alert>
        )}
        {error && (
          <Alert variant="danger" data-testid="OBSSettings.error">
            {error}
          </Alert>
        )}
      </form>
    </div>
  );
}

function AddToOBS({
  item,
}: {
  item: z.infer<typeof CompleteContinuityItemModel>;
}) {
  const queryClient = useQueryClient();
  const addToOBS = ipc.obs.addMediaAsScene.useMutation();
  const localMedia = ipc.media.getLocalMedia.useQuery();
  const existing = ipc.obs.listContinuityItemScenes.useQuery();
  const [alert, setAlert] = useState<null | {
    warnings: string[];
    prompt: "replace" | "force" | "ok";
  }>(null);
  const downloadMedia = ipc.media.downloadMedia.useMutation();
  const downloadStatus = ipc.media.getDownloadStatus.useQuery(void 0, {
    refetchInterval: 1000,
  });
  const ourDownloadStatus = useMemo(
    () => downloadStatus.data?.find((x) => x.mediaID === item.media?.id),
    [downloadStatus.data, item.media?.id],
  );
  useEffect(() => {
    if (ourDownloadStatus?.status === "done") {
      queryClient.invalidateQueries(getQueryKey(ipc.media.getLocalMedia));
    }
  }, [ourDownloadStatus?.status, queryClient]);
  const doAdd = useCallback(
    async (replaceMode?: "replace" | "force") => {
      invariant(item.media, "AddToOBS doAdd callback with no media");
      const result = await addToOBS.mutateAsync({
        id: item.media.id,
        replaceMode,
      });
      if (result.warnings.length === 0 && result.done) {
        await queryClient.invalidateQueries(
          getQueryKey(ipc.obs.listContinuityItemScenes),
        );
        return;
      }
      setAlert({
        warnings: result.warnings,
        prompt: result.promptReplace ?? "ok",
      });
    },
    [item.media, addToOBS, queryClient],
  );
  const state = useMemo(() => {
    if (!item.media) {
      return "no-media";
    }
    if (item.media.state !== "Ready") {
      return "media-processing";
    }
    if (!localMedia.data || !existing.data) {
      return "loading";
    }
    if (ourDownloadStatus?.status === "downloading") {
      return "downloading";
    }
    const alreadyPresent = existing.data.find(
      (x) => x.continuityItemID === item.id,
    );
    if (alreadyPresent) {
      // check if we need to replace
      if (alreadyPresent.sources.length !== 1) {
        return "needs-force";
      }
      const source = alreadyPresent.sources[0];
      if (source.mediaID !== item.media.id) {
        if (!localMedia.data.some((x) => x.mediaID === item.media!.id)) {
          return "needs-replace-download";
        }
        return "needs-replace";
      }
      return "ok";
    }
    if (!localMedia.data.some((x) => x.mediaID === item.media!.id)) {
      return "needs-download";
    }
    return "needs-add";
  }, [
    existing.data,
    item.id,
    item.media,
    localMedia.data,
    ourDownloadStatus?.status,
  ]);

  let contents;
  switch (state) {
    case "no-media":
      contents = <Badge variant="dark">No media uploaded</Badge>;
      break;
    case "loading":
      contents = <Badge variant="dark">Please wait, checking status...</Badge>;
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
    case "needs-download":
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
    case "needs-add":
      contents = (
        <Button color="primary" onClick={() => doAdd()} className="h-full">
          Add to OBS
        </Button>
      );
      break;
    case "needs-replace-download":
      contents = (
        <>
          <Badge variant="warning">Needs replacement</Badge>
          <Button
            color="primary"
            disabled={downloadMedia.isLoading}
            onClick={() =>
              downloadMedia.mutate({
                id: item.media!.id,
                name: item.media!.name,
              })
            }
            className="h-full"
          >
            Download
          </Button>
        </>
      );
      break;
    case "needs-replace":
      contents = (
        <>
          <Badge variant="warning">Needs replacement</Badge>
          <Button onClick={() => doAdd("replace")} className="h-full">
            Replace
          </Button>
        </>
      );
      break;
    case "needs-force":
      contents = (
        <>
          <Button
            onClick={() =>
              setAlert({
                warnings: [
                  "Manual changes to the OBS scene detected. If you continue, these changes will be lost.",
                ],
                prompt: "force",
              })
            }
            color="danger"
          >
            Override manual OBS changes
          </Button>
        </>
      );
      break;
    case "ok":
      contents = <Badge variant="outline">Good to go!</Badge>;
      break;
    default:
      invariant(false, "Unhandled state: " + state);
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
              {alert.prompt === "ok" ? (
                <AlertDialogAction asChild>
                  <Button className="h-full my-0">Confirm</Button>
                </AlertDialogAction>
              ) : (
                <AlertDialogAction asChild>
                  <Button
                    color={alert.prompt === "force" ? "danger" : "warning"}
                    onClick={async () => {
                      await doAdd(alert.prompt as "replace" | "force");
                      setAlert(null);
                    }}
                    className="h-full my-0"
                  >
                    {alert.prompt === "force" ? "Force Replace" : "Replace"}
                  </Button>
                </AlertDialogAction>
              )}
            </AlertDialogFooter>
          </AlertDialogContent>
        )}
      </AlertDialog>
    </div>
  );
}

function ContinuityItem({
  item,
}: {
  item: z.infer<typeof CompleteContinuityItemModel>;
}) {
  return (
    <TableRow>
      <TableCell className="text-lg font-bold align-middle h-full flex items-center">
        {item.name}
      </TableCell>
      <TableCell>
        <AddToOBS item={item} />
      </TableCell>
    </TableRow>
  );
}

export default function OBSScreen() {
  const queryClient = useQueryClient();
  const show = ipc.getSelectedShow.useQuery(undefined).data!;
  const connectionState = ipc.obs.getConnectionState.useQuery();

  const addAll = ipc.obs.addAllSelectedShowMedia.useMutation({
    async onSuccess() {
      await queryClient.invalidateQueries(
        getQueryKey(ipc.obs.listContinuityItemScenes),
      );
    },
  });

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
    return (
      <Alert variant="warning">
        Not connected to OBS. Please ensure that OBS is open and check the
        Bowser settings.
      </Alert>
    );
  }
  return (
    <div>
      <Table>
        <colgroup>
          <col />
          <col style={{ width: "12rem" }} />
        </colgroup>
        <TableBody>
          {show.continuityItems.sort((a, b) => a.order - b.order).map((item) => (
            <ContinuityItem item={item} key={item.id} />
          ))}
          <TableRow>
            <TableCell />
            <TableCell>
              <Button
                className="w-full"
                color="light"
                onClick={() => addAll.mutate()}
              >
                Add All
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <AlertDialog
        open={addAll.isSuccess || addAll.isError}
        onOpenChange={() => addAll.reset()}
      >
        <AlertDialogContent>
          {addAll.error ? (
            <p>{addAll.error.message}</p>
          ) : addAll.data ? (
            <>
              <p>
                Added {addAll.data.done}{" "}
                {addAll.data.done === 1 ? "item" : "items"} to OBS
              </p>
              {addAll.data.warnings.length > 0 && (
                <ul>
                  {addAll.data.warnings.map((warning) => (
                    <li key={warning}>{warning}</li>
                  ))}
                </ul>
              )}
            </>
          ) : null}
          <AlertDialogFooter>
            <AlertDialogAction asChild>
              <Button>Ok</Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
