import { ipc } from "../ipc";
import { useForm } from "react-hook-form";
import Button from "../components/Button";
import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";
import { useCallback, useEffect, useMemo, useState } from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";

import { CompleteContinuityItemModel } from "@bowser/prisma/utilityTypes";
import { z } from "zod";
import invariant from "../../common/invariant";

function OBSConnection() {
  const queryClient = useQueryClient();
  const connect = ipc.obs.connect.useMutation();
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
      <h2>Connect to OBS</h2>
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
        <label className="block">
          OBS Host
          <input
            type="text"
            {...register("host")}
            className="border-2 mx-4 my-2 p-1"
          />
        </label>
        <label className="block">
          OBS WebSocket Port
          <input
            type="number"
            {...register("port")}
            className="border-2 mx-4 my-2 p-1"
          />
        </label>
        <label className="block">
          OBS WebSocket Password
          <input
            type="text"
            {...register("password", { required: true })}
            className="border-2 mx-4 my-2 p-1"
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

function AddToOBS({
  item,
}: {
  item: z.infer<typeof CompleteContinuityItemModel>;
}) {
  invariant(item.media, "AddToOBS rendered with no media");
  const queryClient = useQueryClient();
  const addToOBS = ipc.obs.addMediaAsScene.useMutation();
  const localMedia = ipc.media.getLocalMedia.useQuery(void 0);
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
      contents = <em>Media missing</em>;
      break;
    case "loading":
      contents = <em>Please wait just one sec...</em>;
      break;
    case "media-processing":
      contents = <em className="text-purple-4">Media processing...</em>;
      break;
    case "downloading":
      contents = (
        <div>
          <em>Downloading...</em>
          <progress value={ourDownloadStatus?.progressPercent ?? 0} max={100} />
        </div>
      );
      break;
    case "needs-download":
      contents = (
        <Button
          disabled={downloadMedia.isLoading}
          onClick={() => downloadMedia.mutate({ id: item.media!.id })}
        >
          Download
        </Button>
      );
      break;
    case "needs-add":
      contents = <Button onClick={() => doAdd()}>Add to OBS</Button>;
      break;
    case "needs-replace-download":
      contents = (
        <>
          <em className="text-warning-4 mr-1">Changed, needs replacement</em>
          <Button
            disabled={downloadMedia.isLoading}
            onClick={() => downloadMedia.mutate({ id: item.media!.id })}
          >
            Download
          </Button>
        </>
      );
      break;
    case "needs-replace":
      contents = (
        <>
          <em className="text-warning-4 mr-1">Changed, needs replacement</em>
          <Button onClick={() => doAdd("replace")}>Replace</Button>
        </>
      );
      break;
    case "needs-force":
      contents = (
        <>
          <em className="text-warning-4 mr-1">Manual OBS changes detected</em>
          <Button
            onClick={() =>
              setAlert({
                warnings: [
                  "Manual changes to the OBS scene detected. If you continue, these changes will be lost.",
                ],
                prompt: "force",
              })
            }
          >
            Override
          </Button>
        </>
      );
      break;
    case "ok":
      contents = <em className="text-success-4 mr-1">Good to go!</em>;
      break;
    default:
      invariant(false, "Unhandled state: " + state);
  }
  return (
    <>
      {contents}
      <AlertDialog.Root
        open={alert !== null}
        onOpenChange={(open) => {
          if (!open) {
            setAlert(null);
          }
        }}
      >
        <AlertDialog.Portal>
          <AlertDialog.Overlay className="fixed w-full h-full top-0 left-0 bg-dark/60" />
          <AlertDialog.Content className="absolute bg-light mx-auto p-8 rounded-md">
            {alert && (
              <>
                <AlertDialog.Content className="my-2">
                  {alert.warnings.length > 0 && (
                    <ul>
                      {alert.warnings.map((warning) => (
                        <li key={warning}>{warning}</li>
                      ))}
                    </ul>
                  )}
                </AlertDialog.Content>
                <AlertDialog.Cancel asChild>
                  <Button color="light">Cancel</Button>
                </AlertDialog.Cancel>
                {alert.prompt === "ok" ? (
                  <AlertDialog.Action asChild>
                    <Button>Confirm</Button>
                  </AlertDialog.Action>
                ) : (
                  <AlertDialog.Action asChild>
                    <Button
                      color={alert.prompt === "force" ? "danger" : "warning"}
                      onClick={async () => {
                        await doAdd(alert.prompt as "replace" | "force");
                        setAlert(null);
                      }}
                    >
                      {alert.prompt === "force" ? "Force Replace" : "Replace"}
                    </Button>
                  </AlertDialog.Action>
                )}
              </>
            )}
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </>
  );
}

function ContinuityItem({
  item,
}: {
  item: z.infer<typeof CompleteContinuityItemModel>;
}) {
  return (
    <div className="flex flex-row flex-wrap">
      <span className="text-lg font-bold">{item.name}</span>
      <div className="ml-auto">
        <AddToOBS item={item} />
      </div>
    </div>
  );
}

export default function OBSScreen() {
  const show = ipc.getSelectedShow.useQuery(undefined).data!;
  const connectionState = ipc.obs.getConnectionState.useQuery();

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
      <div>
        <OBSConnection />
        {connectionState.data.error && (
          <div className="bg-danger-4 text-light">
            {connectionState.data.error}
          </div>
        )}
      </div>
    );
  }
  return (
    <div>
      <h1 className="text-3xl">Continuity</h1>
      <div className="space-y-2">
        {show.continuityItems.map((item) => (
          <ContinuityItem item={item} key={item.id} />
        ))}
      </div>
      <small className="absolute bottom-0">
        Connected to OBS version {connectionState.data.version}
      </small>
    </div>
  );
}
