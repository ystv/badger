import { useQueryClient } from "@tanstack/react-query";
// import { getQueryKey } from "@trpc/react-query";
import { Switch } from "@badger/components/switch";
import { Label } from "@badger/components/label";
import Button from "@badger/components/button";

export function DevToolsSettings({ devToolsState, integrations }) {
  const queryClient = useQueryClient();

  const doMainError = ipc.devtools.throwException.useMutation();
  const doMainCrash = ipc.devtools.crash.useMutation();
  const doSetIntegrations = ipc.devtools.setEnabledIntegrations.useMutation({
    onSettled() {
      queryClient.invalidateQueries(getQueryKey(ipc.supportedIntegrations));
    },
  });

  const setDevToolsState = ipc.devtools.setSettings.useMutation({
    async onMutate(newSettings) {
      await queryClient.cancelQueries(getQueryKey(ipc.devtools.getSettings));
      const oldSettings = queryClient.getQueryData(
        getQueryKey(ipc.devtools.getSettings),
      );
      queryClient.setQueryData(
        getQueryKey(ipc.devtools.getSettings),
        newSettings,
      );
      return { oldSettings };
    },
    async onError(_err, _newSettings, context) {
      if (context) {
        queryClient.setQueryData(
          getQueryKey(ipc.devtools.getSettings),
          context.oldSettings,
        );
      }
    },
    async onSettled() {
      await queryClient.invalidateQueries(
        getQueryKey(ipc.devtools.getSettings),
      );
    },
  });

  return (
    <div>
      <h2 className="text-xl">Developer Tools</h2>
      <p>
        Do not enable unless you know what you are doing, these open you up to
        (theoretical) security vulnerabilities.
      </p>
      <div className="flex items-center space-x-2">
        <Switch
          id="enable-devmode"
          checked={devToolsState.enabled}
          onCheckedChange={(v: boolean) =>
            setDevToolsState.mutate({ enabled: v })
          }
        />
        <Label htmlFor="enable-devmode">Enable Developer Mode</Label>
      </div>
      {devToolsState.enabled && (
        <div className="flex flex-col items-start space-y-2">
          <h3>Enabled integrations</h3>
          {(["obs", "vmix", "ontime"] as const).map((int) => (
            <div key={int}>
              <Switch
                id={"enable-" + int}
                checked={integrations.includes(int)}
                onCheckedChange={(v) => {
                  const newIntegrations = [...integrations];
                  if (v) {
                    newIntegrations.push(int);
                  } else {
                    newIntegrations.splice(newIntegrations.indexOf(int), 1);
                  }
                  doSetIntegrations.mutate(newIntegrations);
                }}
              />
              <Label htmlFor={"enable-" + int}>{int}</Label>
            </div>
          ))}
          <Button
            color="warning"
            onClick={() => {
              throw new Error("Test Renderer Exception");
            }}
          >
            Throw unhandled exception
          </Button>
          <Button
            color="danger"
            onClick={() => {
              doMainError.mutate();
            }}
          >
            Throw error in main process
          </Button>
          <Button
            color="danger"
            onClick={() => {
              doMainCrash.mutate();
            }}
          >
            Crash main process
          </Button>
        </div>
      )}
    </div>
  );
}
