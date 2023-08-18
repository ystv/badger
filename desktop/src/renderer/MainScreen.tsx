import { ipc, useInvalidateQueryOnIPCEvent } from "./ipc";
import invariant from "../common/invariant";
import { Dialog, Popover, Switch, Tab } from "@headlessui/react";
import { IoCog, IoDownloadSharp } from "react-icons/io5";
import OBSScreen from "./screens/OBS";
import VMixScreen from "./screens/vMix";
import { usePopper } from "react-popper";
import { useMemo, useState } from "react";
import { getQueryKey } from "@trpc/react-query";
import OBSDevToolsScreen from "./screens/OBSDevTools";
import { useQueryClient } from "@tanstack/react-query";
import Button from "./components/Button";

function DownloadTrackerPopup() {
  const downloadStatus = ipc.media.getDownloadStatus.useQuery(void 0, {
    refetchInterval: 1000,
  });

  const [refEl, setRefEl] = useState<HTMLElement | null>(null);
  const [popoverEl, setPopoverEl] = useState<HTMLElement | null>(null);
  const { styles, attributes } = usePopper(refEl, popoverEl, {
    placement: "bottom-end",
  });

  const downloads = useMemo(
    () => downloadStatus.data?.filter((x) => x.status !== "done"),
    [downloadStatus.data],
  );

  if (!downloads?.length) {
    return null;
  }

  return (
    <Popover>
      <Popover.Button ref={setRefEl}>
        <IoDownloadSharp className="h-8 w-8" size={32} />
      </Popover.Button>
      <Popover.Panel
        ref={setPopoverEl}
        style={styles.popper}
        {...attributes.popper}
        className="bg-light text-dark px-2 py-4 shadow-lg"
      >
        {downloads.map((download) => (
          <div key={download.mediaID}>
            <strong>{download.name}</strong>: {download.status},{" "}
            {download.progressPercent?.toFixed(1)}%
          </div>
        ))}
      </Popover.Panel>
    </Popover>
  );
}

function Settings() {
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
    <div>
      <h2 className="text-xl">Developer Tools</h2>
      <p>
        Do not enable unless you know what you are doing, these open you up to
        (theoretical) security vulnerabilities.
      </p>
      {devToolsState.data && (
        <Switch
          checked={devToolsState.data.enabled}
          onChange={() =>
            setDevToolsState.mutate({ enabled: !devToolsState.data.enabled })
          }
          className={`${
            devToolsState.data.enabled ? "bg-danger-4" : "bg-danger"
          }
          relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
        >
          <span className="sr-only">Use setting</span>
          <span
            aria-hidden="true"
            className={`${
              devToolsState.data.enabled ? "translate-x-9" : "translate-x-0"
            }
            pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
          />
        </Switch>
      )}
    </div>
  );
}

export default function MainScreen() {
  const { data: show } = ipc.getSelectedShow.useQuery();
  invariant(show, "no selected show"); // this is safe because MainScreen is rendered inside a ConnectAndSelectShowGate
  const [integrations] = ipc.supportedIntegrations.useSuspenseQuery();
  const devToolsState = ipc.devtools.getSettings.useQuery();
  useInvalidateQueryOnIPCEvent(
    getQueryKey(ipc.devtools.getSettings),
    "devToolsSettingsChange",
  );
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <div>
      <nav className="absolute top-0 left-0 w-full h-12 mb-12 px-4 bg-dark text-light flex flex-nowrap items-center justify-between">
        <span className="font-bold">{show.name}</span>
        <div className="ml-auto flex flex-row flex-nowrap">
          <DownloadTrackerPopup />
          <button
            className="h-full aspect-square flex items-center justify-center"
            onClick={() => setIsSettingsOpen(true)}
          >
            <IoCog className="h-8 w-8" size={32} />
          </button>
        </div>
      </nav>
      <div className="relative mb-12" />
      <Tab.Group>
        <Tab.List className="h-10 bg-mid-dark text-light space-x-2 px-2">
          {integrations.includes("vmix") && (
            <Tab
              className={
                "ui-selected:bg-primary ui-selected:color-light px-2 h-full"
              }
            >
              vMix
            </Tab>
          )}
          {integrations.includes("obs") && (
            <>
              <Tab className="ui-selected:bg-primary ui-selected:color-light px-2 h-full">
                OBS
              </Tab>
              {devToolsState.data?.enabled && (
                <Tab className="ui-selected:bg-primary ui-selected:color-light px-2 h-full">
                  OBS Dev Tools
                </Tab>
              )}
            </>
          )}
        </Tab.List>
        <Tab.Panels>
          {integrations.includes("vmix") && (
            <Tab.Panel>
              <VMixScreen />
            </Tab.Panel>
          )}
          {integrations.includes("obs") && (
            <>
              <Tab.Panel>
                <OBSScreen />
              </Tab.Panel>
              {devToolsState.data?.enabled && (
                <Tab.Panel>
                  <OBSDevToolsScreen />
                </Tab.Panel>
              )}
            </>
          )}
        </Tab.Panels>
      </Tab.Group>
      <Dialog open={isSettingsOpen} onClose={() => setIsSettingsOpen(false)}>
        <Dialog.Panel className="fixed inset-0 overflow-y-auto bg-light p-8">
          <Dialog.Title className="text-3xl">Settings</Dialog.Title>
          <Button
            size="small"
            color="dark"
            onClick={() => setIsSettingsOpen(false)}
          >
            Close
          </Button>
          {isSettingsOpen && <Settings />}
        </Dialog.Panel>
      </Dialog>
    </div>
  );
}
