import { OBSSettings } from "./OBS";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@badger/components/tabs";
import { VMixConnection } from "./vMix";
import { OntimeSettings } from "./Ontime";
import { MediaSettings } from "./MediaSettings";
import { useAppSelector } from "../state";

export function Settings() {
  const integrations = useAppSelector((state) => state.integrations.supported);

  return (
    <Tabs defaultValue="obs">
      <TabsList className="w-full">
        {integrations.includes("obs") && (
          <TabsTrigger value="obs">OBS</TabsTrigger>
        )}
        {integrations.includes("vmix") && (
          <TabsTrigger value="vmix">vMix</TabsTrigger>
        )}
        {integrations.includes("ontime") && (
          <TabsTrigger value="ontime">Ontime</TabsTrigger>
        )}
        <TabsTrigger value="media">Media</TabsTrigger>
        <TabsTrigger value="advanced">Advanced</TabsTrigger>
        {/* {devToolsState.enabled && (
          <TabsTrigger value="obs-devtools">OBS Developer Tools</TabsTrigger>
        )} */}
        <TabsTrigger value="about">About</TabsTrigger>
      </TabsList>
      {integrations.includes("obs") && (
        <TabsContent value="obs">
          <OBSSettings />
        </TabsContent>
      )}
      {integrations.includes("vmix") && (
        <TabsContent value="vmix">
          <VMixConnection />
        </TabsContent>
      )}
      {integrations.includes("ontime") && (
        <TabsContent value="ontime">
          <OntimeSettings />
        </TabsContent>
      )}
      <TabsContent value="media">
        <MediaSettings />
      </TabsContent>
      <TabsContent value="advanced">
        <h2 className="text-xl">Downloads</h2>
        {/* <Label htmlFor="downloader">Downloader</Label>
        <Select
          value={selectedDownloader}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onValueChange={(e) => doSetDownloader.mutate(e as any)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {availableDownloaders.map((d) => (
              <SelectItem key={d} value={d}>
                {d}
              </SelectItem>
            ))}
          </SelectContent>
        </Select> */}

        <h2 className="text-xl">Logging</h2>
        {/* <Label htmlFor="logLevel">Log Level</Label>
        <Select
          value={logLevel}
          onValueChange={(e) => doSetLogLevel.mutate(e as LogLevelNames)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {["error", "warn", "info", "debug", "trace"].map((l) => (
              <SelectItem key={l} value={l}>
                {l}
              </SelectItem>
            ))}
          </SelectContent>
        </Select> */}
      </TabsContent>
      {/* {devToolsState.enabled && (
        <TabsContent value="obs-devtools">
          <div className="max-h-[90vh] overflow-y-scroll">
            <OBSDevToolsScreen />
          </div>
        </TabsContent>
      )} */}
      <TabsContent value="about">
        <h2 className="text-xl">Badger</h2>
        <p>
          Version <code>{global.__APP_VERSION__}</code>, built on{" "}
          {new Date(global.__BUILD_TIME__).toLocaleString()} from{" "}
          <code>{global.__GIT_COMMIT__.slice(0, 7)}</code>
        </p>
        <p>
          Originally created by Marks Polakovs in 2023, maintained by the YSTV
          Computing Team.
        </p>
      </TabsContent>
    </Tabs>
  );
}
