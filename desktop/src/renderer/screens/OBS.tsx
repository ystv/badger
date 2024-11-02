import { useForm } from "react-hook-form";
import { Button } from "@badger/components/button";
import { useCallback, useMemo, useState } from "react";
import { Alert } from "@badger/components/alert";
import { Progress } from "@badger/components/progress";
import { Badge } from "@badger/components/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
} from "@badger/components/alert-dialog";
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@badger/components/table";

import { CompleteContinuityItemModel } from "@badger/prisma/utilityTypes";
import { z } from "zod";
import invariant from "../../common/invariant";
import { Label } from "@badger/components/label";
import { Input } from "@badger/components/input";
import { dispatch, useAppSelector } from "../store";

export function OBSSettings() {
  const { connecting, connected, version, platform } = useAppSelector(
    (state) => state.obs.connection,
  );

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
          dispatch.obsConnect({
            host: data.host,
            port: data.port,
            password: data.password,
          });
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
        <Button type="submit" color="primary" disabled={connecting}>
          Connect
        </Button>
        {connected && (
          <Alert data-testid="OBSSettings.success">
            Successfully connected to OBS version {version} on {platform}
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
  const itemMediaID = item.media?.id;

  const existing = useAppSelector((state) =>
    state.obs.continuityScenes.find((x) => x.continuityItemID === item.id),
  );
  const currentItemMedia = useAppSelector((state) =>
    state.localMedia.media.find((x) => x.mediaID === itemMediaID),
  );
  const currentItemDownloadStatus = useAppSelector((state) =>
    state.localMedia.currentDownload?.mediaID === itemMediaID
      ? state.localMedia.currentDownload
      : state.localMedia.downloadQueue.find((x) => x.mediaID === itemMediaID),
  );

  const [alert, setAlert] = useState<null | {
    warnings: string[];
    prompt: "replace" | "force" | "ok";
  }>(null);

  const doAdd = useCallback(
    async (replaceMode?: "replace" | "force") => {
      invariant(item.media, "AddToOBS doAdd callback with no media");
      const result = await dispatch
        .addContinuityItemAsScene({
          continuityItemID: item.id,
          replaceMode,
        })
        .unwrap();
      if (result.warnings.length === 0 && result.done) {
        return;
      }
      setAlert({
        warnings: result.warnings,
        prompt: result.promptReplace ?? "ok",
      });
    },
    [item.id, item.media],
  );

  // TODO[BDGR-170]: When this is refactored, all this logic should move to the main process.
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
    if (currentItemDownloadStatus?.status === "downloading") {
      return "downloading";
    }

    if (existing) {
      // check if we need to replace
      if (existing.sources.length !== 1) {
        return "needs-force";
      }
      const source = existing.sources[0];
      if (source.mediaID !== item.media.id) {
        if (currentItemMedia?.mediaID !== item.media.id) {
          return "needs-replace-download";
        }
        return "needs-replace";
      }
      return "ok";
    }
    if (!currentItemMedia) {
      return "needs-download";
    }
    return "needs-add";
  }, [currentItemDownloadStatus, currentItemMedia, existing, item.media]);

  let contents;
  switch (state) {
    case "no-media":
      contents = <Badge variant="dark">No media uploaded</Badge>;
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
            value={currentItemDownloadStatus?.progressPercent}
            className="w-16"
          />
        </div>
      );
      break;
    case "needs-download":
      contents = (
        <Button
          color="primary"
          onClick={() =>
            dispatch.queueMediaDownload({ mediaID: item.media!.id })
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
            onClick={() =>
              dispatch.queueMediaDownload({ mediaID: item.media!.id })
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
  const show = useAppSelector((state) => state.selectedShow.show);
  invariant(show, "Rendered OBSScreen with no show selected");
  const connectionState = useAppSelector(
    (state) => state.obs.connection.connected,
  );

  if (!connectionState) {
    return (
      <Alert variant="warning">
        Not connected to OBS. Please ensure that OBS is open and check the
        Badger settings.
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
          {show.continuityItems
            .sort((a, b) => a.order - b.order)
            .map((item) => (
              <ContinuityItem item={item} key={item.id} />
            ))}
          <TableRow>
            <TableCell />
            <TableCell>
              <Button
                className="w-full"
                color="light"
                // onClick={() => addAll.mutate()}
                disabled //FIXME
              >
                Add All
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      {/* <AlertDialog
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
      </AlertDialog> */}
    </div>
  );
}
