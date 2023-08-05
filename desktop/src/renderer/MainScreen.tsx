import { ipc } from "./ipc";
import invariant from "../common/invariant";
import { Popover, Tab } from "@headlessui/react";
import { IoCog, IoDownloadSharp } from "react-icons/io5";
import OBSScreen from "./screens/OBS";
import { DownloadTracker } from "./DownloadTracker";
import VMixScreen from "./screens/vMix";

export default function MainScreen() {
  const { data: show } = ipc.getSelectedShow.useQuery();
  invariant(show, "no selected show"); // this is safe because MainScreen is rendered inside a ConnectAndSelectShowGate
  const [integrations] = ipc.supportedIntegrations.useSuspenseQuery();
  return (
    <div>
      <nav className="absolute top-0 left-0 w-full h-12 mb-12 px-4 bg-dark text-light flex flex-nowrap items-center justify-between">
        <span className="font-bold">{show.name}</span>
        <Popover>
          <Popover.Button>
            <IoDownloadSharp />
          </Popover.Button>
          <Popover.Panel>
            <DownloadTracker />
          </Popover.Panel>
        </Popover>
        <button className="h-full aspect-square flex items-center justify-center">
          <IoCog className="h-8 w-8" size={32} />
        </button>
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
