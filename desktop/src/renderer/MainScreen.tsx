import { ipc } from "./ipc";
import invariant from "../common/invariant";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@bowser/components/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@bowser/components/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@bowser/components/dropdown-menu";
import { Button } from "@bowser/components/button";
import {
  IoAlertSharp,
  IoCaretDownOutline,
  IoCheckmarkSharp,
  IoCog,
  IoDownloadSharp,
  IoEllipsisVertical,
} from "react-icons/io5";
import { usePopper } from "react-popper";
import { useMemo, useState } from "react";
import OBSScreen from "./screens/OBS";
import VMixScreen from "./screens/vMix";
import { Settings } from "./Settings";
import { SelectShowForm } from "./ConnectAndSelectShowGate";

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
      <PopoverTrigger ref={setRefEl}>
        <IoDownloadSharp className="h-8 w-8" size={32} />
      </PopoverTrigger>
      <PopoverContent
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
      </PopoverContent>
    </Popover>
  );
}

export default function MainScreen() {
  const { data: show } = ipc.getSelectedShow.useQuery();
  invariant(show, "no selected show"); // this is safe because MainScreen is rendered inside a ConnectAndSelectShowGate
  const [integrations] = ipc.supportedIntegrations.useSuspenseQuery();

  const downloadAll = ipc.media.downloadAllMediaForSelectedShow.useMutation();

  const [isChangeShowOpen, setIsChangeShowOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const [selectedRundown, setSelectedRundown] = useState<"continuity" | number>(
    "continuity",
  );
  const selectedName =
    selectedRundown === "continuity"
      ? "Continuity"
      : show.rundowns.find((rd) => rd.id === selectedRundown)?.name;
  invariant(selectedName, "selected non-existent rundown");

  return (
    <div>
      <nav className="relative top-0 left-0 w-full h-12 px-4 bg-dark text-light flex flex-nowrap items-center justify-between">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button color="ghost" className="font-bold">
              {show.name}
              <IoEllipsisVertical
                className="h-4 w-4 inline-block ml-1"
                size={24}
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => downloadAll.mutate()}>
              {downloadAll.status === "success" && (
                <IoCheckmarkSharp className="h-4 w-4 inline-block" size={24} />
              )}
              {downloadAll.status === "error" && (
                <IoAlertSharp className="h-4 w-4 inline-block" size={24} />
              )}
              Download all media
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setIsChangeShowOpen(true)}>
              Change selected show
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Dialog open={isChangeShowOpen} onOpenChange={setIsChangeShowOpen}>
          <DialogContent>
            <DialogHeader className="text-3xl">Change Show</DialogHeader>
            <SelectShowForm onSelect={() => setIsChangeShowOpen(false)} />
          </DialogContent>
        </Dialog>
        <div className="ml-auto flex flex-row flex-nowrap">
          <DownloadTrackerPopup />
          <Dialog
            open={isSettingsOpen}
            onOpenChange={(v) => setIsSettingsOpen(v)}
          >
            <DialogTrigger>
              <IoCog className="h-6 w-6" size={24} />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader className="text-3xl">Settings</DialogHeader>
              {isSettingsOpen && <Settings />}
            </DialogContent>
          </Dialog>
        </div>
      </nav>
      <nav className="relative left-0 w-full h-12 mb-2 px-4 bg-mid-dark text-light flex flex-nowrap items-center justify-between">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button color="ghost" className="font-bold">
              {selectedName}
              <IoCaretDownOutline
                className="h-4 w-4 inline-block ml-1"
                size={32}
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {integrations.includes("obs") ? (
              <DropdownMenuItem
                onClick={() => setSelectedRundown("continuity")}
              >
                Continuity
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem disabled>OBS not available</DropdownMenuItem>
            )}
            {integrations.includes("vmix") ? (
              show.rundowns.map((rd) => (
                <DropdownMenuItem
                  key={rd.id}
                  onClick={() => setSelectedRundown(rd.id)}
                >
                  {rd.name}
                </DropdownMenuItem>
              ))
            ) : (
              <DropdownMenuItem disabled>vMix not available</DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
      <div className="relative mb-12 px-2">
        {selectedRundown === "continuity" ? (
          <OBSScreen />
        ) : (
          <VMixScreen
            rundown={show.rundowns.find((rd) => rd.id === selectedRundown)!}
          />
        )}
      </div>
    </div>
  );
}
