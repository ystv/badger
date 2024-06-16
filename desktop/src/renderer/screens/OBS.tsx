import { ipc } from "../ipc";
import { useForm } from "react-hook-form";
import { Button } from "@badger/components/button";
import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";
import { useState } from "react";
import { Alert } from "@badger/components/alert";
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@badger/components/table";

import { Label } from "@badger/components/label";
import { Input } from "@badger/components/input";
import { ItemRow } from "../components/ItemList";
import invariant from "../../common/invariant";

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

function OBSContinuityItems() {
  const queryClient = useQueryClient();
  const show = ipc.getSelectedShow.useQuery(undefined).data!;
  const current = ipc.obs.listBadgerScenes.useQuery();
  const items = current.data?.filter((x) => x.type === "continuityItem") ?? [];

  const addToOBS = ipc.obs.addMediaAsScene.useMutation();
  const addAll = ipc.obs.addAllSelectedShowMedia.useMutation({
    async onSuccess() {
      await queryClient.invalidateQueries(
        getQueryKey(ipc.obs.listBadgerScenes),
      );
    },
  });

  return (
    <Table>
      <colgroup>
        <col />
        <col style={{ width: "12rem" }} />
      </colgroup>
      <TableBody>
        {show.continuityItems
          .sort((a, b) => a.order - b.order)
          .map((item) => {
            const existing = items.find((curr) => curr.itemId === item.id);
            return (
              <ItemRow
                key={item.id}
                item={{
                  ...item,
                  type: "continuityItem",
                  destinationState: existing ? "loaded" : "not-present",
                }}
                doAdd={async (prompt) => {
                  invariant(
                    item.media,
                    "AddToOBS doAdd callback with no media",
                  );
                  const result = await addToOBS.mutateAsync({
                    containerType: "continuityItem",
                    containerId: item.id,
                    replaceMode: prompt as "replace" | "force" | undefined,
                  });
                  if (result.warnings.length === 0 && result.done) {
                    await queryClient.invalidateQueries(
                      getQueryKey(ipc.obs.listBadgerScenes),
                    );
                    return { ok: true };
                  }
                  return {
                    ok: false,
                    warnings: result.warnings,
                    prompt: result.promptReplace,
                  };
                }}
              />
            );
          })}
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
  );
}

export default function OBSScreen() {
  const connectionState = ipc.obs.getConnectionState.useQuery();

  if (connectionState.isLoading) {
    return <div>Please wait, getting OBS connection state...</div>;
  }
  if (connectionState.error) {
    return (
      <div>
        <h2>Something went wrong inside Badger</h2>
        <pre>{JSON.stringify(connectionState.error, null, 2)}</pre>
      </div>
    );
  }
  if (!connectionState.data.connected) {
    return (
      <Alert variant="warning">
        Not connected to OBS. Please ensure that OBS is open and check the
        Badger settings.
      </Alert>
    );
  }
  return (
    <div>
      {connectionState.data?.loadContinuityItems && <OBSContinuityItems />}
    </div>
  );
}
