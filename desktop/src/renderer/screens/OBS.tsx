import { ipc } from "../ipc";
import { useForm } from "react-hook-form";
import Button from "../components/Button";
import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";
import { useEffect, useMemo, useState } from "react";
import { CompleteContinuityItemModel } from "@/lib/db/utilityTypes";
import { z } from "zod";

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
          <input type="text" {...register("host")} />
        </label>
        <label className="block">
          OBS WebSocket Port
          <input type="number" {...register("port")} />
        </label>
        <label className="block">
          OBS WebSocket Password
          <input type="text" {...register("password", { required: true })} />
        </label>
        <Button type="submit" color="primary">
          Connect
        </Button>
        {error && <div className="bg-danger-4 text-light">{error}</div>}
      </form>
    </div>
  );
}

function ContinuityItem({
  item,
}: {
  item: z.infer<typeof CompleteContinuityItemModel>;
}) {
  const queryClient = useQueryClient();
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
  const localMedia = ipc.media.getLocalMedia.useQuery(void 0);
  const ourLocalStatus = useMemo(() => {
    if (!localMedia.data || !item.media) {
      return null;
    }
    return localMedia.data.find((x) => x.mediaID === item.media!.id);
  }, [item, localMedia.data]);
  const addToOBS = ipc.obs.addMediaAsScene.useMutation();
  return (
    <div className="flex flex-row flex-wrap">
      <span className="text-lg font-bold">{item.name}</span>
      <div className="ml-auto">
        {item.media ? (
          ourLocalStatus ? (
            <Button onClick={() => addToOBS.mutate({ id: item.media!.id })}>
              {/* TODO: is it already present? */}
              Add to OBS
            </Button>
          ) : ourDownloadStatus ? (
            <span className="text-lg">
              {ourDownloadStatus.progressPercent?.toFixed(1)}%
            </span>
          ) : (
            <Button
              color="primary"
              onClick={() => downloadMedia.mutate({ id: item.media!.id })}
            >
              Download
            </Button>
          )
        ) : (
          <span className="h-full p-4 rounded bg-danger-4 text-light">
            No media
          </span>
        )}
      </div>
    </div>
  );
}

export default function OBSScreen() {
  const show = ipc.getSelectedShow.useQuery().data!;
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
