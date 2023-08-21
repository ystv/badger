import { ipc } from "../ipc";
import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";
import { Label } from "@bowser/components/label";
import { Input } from "@bowser/components/input";
import { Button } from "@bowser/components/button";
import { Alert } from "@bowser/components/alert";

export function OntimeSettings() {
  const queryClient = useQueryClient();
  const [status] = ipc.ontime.getConnectionStatus.useSuspenseQuery();
  const [settings] = ipc.ontime.getSettings.useSuspenseQuery();
  const connect = ipc.ontime.connect.useMutation({
    async onSettled() {
      await queryClient.invalidateQueries(
        getQueryKey(ipc.ontime.getConnectionStatus),
      );
      await queryClient.invalidateQueries(getQueryKey(ipc.ontime.getSettings));
    },
  });

  return (
    <div>
      <form
        className="space-y-2"
        onSubmit={(e) => {
          e.preventDefault();
          const values = new FormData(e.currentTarget);
          connect.mutate({
            host: values.get("host") as string,
          });
        }}
      >
        <div>
          <Label htmlFor="host">Ontime Host</Label>
          <Input
            id="host"
            name="host"
            type="text"
            defaultValue={settings?.host}
            placeholder="http://localhost:4001"
          />
        </div>
        <Button type="submit" color={status !== null ? "ghost" : "primary"}>
          Connect
        </Button>
        {connect.error && (
          <Alert variant="danger">{connect.error.message}</Alert>
        )}
        {status !== null && (
          <Alert>
            Connected to Ontime at <code>{status.host}</code>
          </Alert>
        )}
      </form>
    </div>
  );
}
