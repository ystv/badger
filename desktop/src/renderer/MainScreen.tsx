import invariant from "../common/invariant";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@badger/components/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@badger/components/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@badger/components/dropdown-menu";
import { Button } from "@badger/components/button";
import { IoCaretDownOutline, IoCog, IoDownloadSharp } from "react-icons/io5";
import { Suspense, useState } from "react";
import OBSScreen from "./screens/OBS";
import VMixScreen from "./screens/vMix";
import { Settings } from "./screens/Settings";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@badger/components/table";
import { useAppSelector } from "./store";

function DownloadTrackerPopup() {
  const downloads = useAppSelector((state) =>
    (state.localMedia.currentDownload
      ? [state.localMedia.currentDownload]
      : []
    ).concat(state.localMedia.downloadQueue),
  );

  if (!downloads.length) {
    return null;
  }

  return (
    <Popover>
      <PopoverTrigger>
        <IoDownloadSharp
          className="h-8 w-8"
          size={32}
          data-testid="DownloadTrackerPopup.icon"
        />
      </PopoverTrigger>
      <PopoverContent className="bg-light text-dark px-2 py-4 shadow-lg min-w-[400px]">
        <Table>
          <TableBody>
            {downloads.map((download) => (
              <TableRow key={download.mediaID}>
                <TableCell>{download.name}</TableCell>
                <TableCell>
                  {download.status[0].toUpperCase() + download.status.slice(1)}
                  {download.progressPercent &&
                    `, ${download.progressPercent.toFixed(1)}%`}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </PopoverContent>
    </Popover>
  );
}

export default function MainScreen() {
  const show = useAppSelector((state) => state.selectedShow.show);
  invariant(show, "no selected show"); // this is safe because MainScreen is rendered inside a ConnectAndSelectShowGate
  const integrations = useAppSelector((state) => state.integrations.supported);

  const [isChangeShowOpen, setIsChangeShowOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const [selectedRundown, setSelectedRundown] = useState<"continuity" | number>(
    integrations.includes("obs") ? "continuity" : show.rundowns[0].id,
  );
  const selectedName =
    selectedRundown === "continuity"
      ? "Continuity"
      : show.rundowns.find((rd) => rd.id === selectedRundown)?.name;
  invariant(selectedName, "selected non-existent rundown");

  // const ontimeState = ipc.ontime.getConnectionStatus.useQuery();
  // const [ontimePushOpen, setOntimePushOpen] = useState(false);

  return (
    <div>
      <nav className="relative top-0 left-0 w-full h-12 px-4 bg-dark text-light flex flex-nowrap items-center justify-between">
        {/* <Button onClick={() => downloadAll.mutate()} color="ghost">
          {downloadAll.status === "success" && (
            <IoCheckmarkSharp className="h-4 w-4 inline-block" size={24} />
          )}
          {downloadAll.status === "error" && (
            <IoAlertSharp className="h-4 w-4 inline-block" size={24} />
          )}
          Download all media
        </Button> */}
        <Button onClick={() => setIsChangeShowOpen(true)} color="ghost">
          Change selected show
        </Button>
        {/* <Button
          onClick={() => setOntimePushOpen(true)}
          disabled={!ontimeState.isSuccess || ontimeState.data === null}
          color="ghost"
        >
          Push to Ontime
        </Button> */}
        <Dialog open={isChangeShowOpen} onOpenChange={setIsChangeShowOpen}>
          <DialogContent>
            <DialogHeader className="text-3xl">Change Show</DialogHeader>
            {/* <SelectShowForm onSelect={() => setIsChangeShowOpen(false)} /> */}
          </DialogContent>
        </Dialog>
        <div className="ml-auto flex flex-row flex-nowrap">
          <DownloadTrackerPopup />
          <Dialog
            open={isSettingsOpen}
            onOpenChange={(v) => setIsSettingsOpen(v)}
          >
            <DialogTrigger aria-label="Settings">
              <IoCog className="h-6 w-6" size={24} />
            </DialogTrigger>
            <DialogContent className="min-w-[600px] max-h-[100vh] overflow-y-scroll py-8">
              <DialogHeader className="text-3xl">Settings</DialogHeader>
              <Suspense fallback={<b>Please wait, loading settings...</b>}>
                <Settings />
              </Suspense>
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
              show.rundowns
                .sort((a, b) => a.order - b.order)
                .map((rd) => (
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
      <div className="relative mb-12 px-2 max-h-[100vh] overflow-y-scroll">
        {selectedRundown === "continuity" ? (
          <OBSScreen />
        ) : (
          <VMixScreen
            rundown={show.rundowns.find((rd) => rd.id === selectedRundown)!}
          />
        )}
      </div>
      {/* <OntimePush
        show={show}
        dialogOpen={ontimePushOpen}
        setDialogOpen={setOntimePushOpen}
      /> */}
    </div>
  );
}
