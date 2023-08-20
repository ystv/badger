import { useQueryClient } from "@tanstack/react-query";
import { ipc } from "./ipc";
import { getQueryKey } from "@trpc/react-query";
import { OBSSettings } from "./screens/OBS";
import OBSDevToolsScreen from "./screens/OBSDevTools";
import { Switch } from "@bowser/components/switch";
import { Label } from "@bowser/components/label";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@bowser/components/tabs";

export function Settings() {
  const queryClient = useQueryClient();
  const devToolsState = ipc.devtools.getSettings.useQuery();
  const setDevToolsState = ipc.devtools.setSettings.useMutation({
    // https://tanstack.com/query/latest/docs/react/guides/optimistic-updates
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
    async onError(err, newSettings, context) {
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
    <Tabs defaultValue="obs">
      <TabsList className="w-full">
        <TabsTrigger value="obs">OBS</TabsTrigger>
        <TabsTrigger value="advanced">Advanced</TabsTrigger>
        {devToolsState.data?.enabled && (
          <TabsTrigger value="devtools">Developer Tools</TabsTrigger>
        )}
      </TabsList>
      <TabsContent value="obs">
        <OBSSettings />
      </TabsContent>
      <TabsContent value="advanced">
        <h2 className="text-xl">Developer Tools</h2>
        <p>
          Do not enable unless you know what you are doing, these open you up to
          (theoretical) security vulnerabilities.
        </p>
        {devToolsState.data && (
          <div className="flex items-center space-x-2">
            <Switch
              id="enable-devmode"
              checked={devToolsState.data.enabled}
              onCheckedChange={(v) => setDevToolsState.mutate({ enabled: v })}
            />
            <Label htmlFor="enable-devmode">Enable Developer Mode</Label>
          </div>
        )}
      </TabsContent>
      {devToolsState.data?.enabled && (
        <TabsContent value="devtools">
          <div className="max-h-[90vh] overflow-y-scroll">
            <OBSDevToolsScreen />
          </div>
        </TabsContent>
      )}
    </Tabs>
  );
}
