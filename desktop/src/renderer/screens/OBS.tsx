import { ipc } from "../ipc";
import { useForm } from "react-hook-form";
import { Button } from "@badger/components/button";
import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";
import { useState } from "react";
import { Alert } from "@badger/components/alert";

import { Label } from "@badger/components/label";
import { Input } from "@badger/components/input";

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
