import { ipc } from "./ipc";
import invariant from "../common/invariant";
import { Popover, Tab } from "@headlessui/react";
import { IoDownloadSharp } from "react-icons/io5";
import OBSScreen from "./screens/OBS";
import VMixScreen from "./screens/vMix";
import { usePopper } from "react-popper";
import { useMemo, useState } from "react";

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

export default function MainScreen() {
  const { data: show } = ipc.getSelectedShow.useQuery();
  invariant(show, "no selected show"); // this is safe because MainScreen is rendered inside a ConnectAndSelectShowGate
  const [integrations] = ipc.supportedIntegrations.useSuspenseQuery();

  return (
    <div>
      <nav className="absolute top-0 left-0 w-full h-12 mb-12 px-4 bg-dark text-light flex flex-nowrap items-center justify-between">
        <span className="font-bold">{show.name}</span>
        <div className="ml-auto flex flex-row flex-nowrap">
          <DownloadTrackerPopup />
          {/* <button className="h-full aspect-square flex items-center justify-center">
          <IoCog className="h-8 w-8" size={32} />
        </button> */}
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
            <Tab className="ui-selected:bg-primary ui-selected:color-light px-2 h-full">
              OBS
            </Tab>
          )}
        </Tab.List>
        <Tab.Panels>
          {integrations.includes("vmix") && (
            <Tab.Panel>
              <VMixScreen />
            </Tab.Panel>
          )}
          {integrations.includes("obs") && (
            <Tab.Panel>
              <OBSScreen />
            </Tab.Panel>
          )}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
