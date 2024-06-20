import { ipc } from "../ipc";
import { Button } from "@badger/components/button";
import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";
import { Alert } from "@badger/components/alert";
import { Label } from "@badger/components/label";
import { Input } from "@badger/components/input";
import logging from "loglevel";

const logger = logging.getLogger("vMix");

export function VMixConnection() {
  const [state] = ipc.vmix.getConnectionState.useSuspenseQuery();
  const tryConnect = ipc.vmix.tryConnect.useMutation({
    async onSettled() {
      await queryClient.invalidateQueries(
        getQueryKey(ipc.vmix.getConnectionState),
      );
    },
  });
  const queryClient = useQueryClient();

  return (
    <div>
      <form
        className="space-y-2"
        onSubmit={(e) => {
          e.preventDefault();
          const values = new FormData(e.currentTarget);
          tryConnect.mutate({
            host: values.get("host") as string,
            port: parseInt(values.get("port") as string, 10),
          });
        }}
      >
        <div>
          <Label htmlFor="host">vMix Host</Label>
          <Input id="host" name="host" type="text" defaultValue={state.host} />
        </div>
        <div>
          <Label htmlFor="port">vMix Port</Label>
          <Input
            id="port"
            name="port"
            type="number"
            defaultValue={state.port}
          />
        </div>
        <Button type="submit" color={state.connected ? "ghost" : "primary"}>
          Connect
        </Button>
        {tryConnect.error && (
          <div className="bg-danger-4 text-light">
            {tryConnect.error.message}
          </div>
        )}
        {state.connected && (
          <Alert>
            Connected to vMix {state.edition} v{state.version}
          </Alert>
        )}
      </form>
    </div>
  );
}
