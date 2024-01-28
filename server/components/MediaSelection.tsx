import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@bowser/components/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@bowser/components/select";
import { Media } from "@bowser/prisma/types";
import { DialogBody } from "next/dist/client/components/react-dev-overlay/internal/components/Dialog";
import {
  Fragment,
  Suspense,
  use,
  useMemo,
  useRef,
  useState,
  useTransition,
} from "react";
import { MediaUploader, MediaUploaderHandle } from "./MediaUpload";
import Button from "@bowser/components/button";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@bowser/components/table";

export type PastShowsMedia = Array<{
  id: number;
  name: string;
  start: Date;
  rundowns: Array<{
    id: number;
    name: string;
    items: Array<{
      id: number;
      name: string;
      media: Media | null;
    }>;
    assets: Array<{
      media: Media | null;
    }>;
  }>;
  continuityItems: Array<{
    id: number;
    name: string;
    media: Media | null;
  }>;
}>;

function PastShowMediaSelection(props: {
  // We pass a promise in here, not the original data, because this component
  // might never be rendered, and we don't want to waste time fetching data
  pastShowsPromise: Promise<PastShowsMedia>;
  onMediaSelect: (id: number) => unknown;
  containerType: "rundownItem" | "continuityItem" | "asset";
}) {
  const data = use(props.pastShowsPromise);
  const showCandidates = useMemo(() => {
    switch (props.containerType) {
      case "rundownItem":
        return data.filter((x) => x.rundowns.some((r) => r.items.length > 0));
      case "continuityItem":
        return data.filter((x) => x.continuityItems.length > 0);
      case "asset":
        return data.filter((x) => x.rundowns.some((r) => r.assets.length > 0));
    }
  }, [props.containerType, data]);
  const [selectedShowID, setSelectedShowID] = useState(-1);
  const selectedShow =
    selectedShowID > -1
      ? showCandidates.find((x) => x.id === selectedShowID)
      : null;
  const [selectedRundownID, setSelectedRundownID] = useState(-1);
  const selectedRundown =
    selectedShow && selectedRundownID > -1
      ? selectedShow.rundowns.find((x) => x.id === selectedRundownID)
      : null;

  return (
    <div>
      <Select
        value={selectedShowID.toString(10)}
        onValueChange={(v) => setSelectedShowID(parseInt(v, 10))}
        data-testid="PastShowMediaSelection.selectShow"
      >
        <SelectTrigger>
          <SelectValue>{selectedShow?.name ?? "Select show"}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          {showCandidates.map((show) => (
            <SelectItem key={show.id} value={show.id.toString(10)}>
              {show.name} ({format(show.start, "dd MMM yyyy, hh:mm a")})
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {selectedShow && (
        <div>
          {props.containerType !== "continuityItem" && (
            <Select
              value={selectedRundownID.toString(10)}
              onValueChange={(v) => setSelectedRundownID(parseInt(v, 10))}
            >
              <SelectTrigger>
                <SelectValue>
                  {selectedRundown?.name ?? "Select rundown"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {selectedShow.rundowns.map((rundown) => (
                  <SelectItem key={rundown.id} value={rundown.id.toString(10)}>
                    {rundown.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          {selectedRundown && (
            <>
              {props.containerType === "rundownItem" && (
                <Table>
                  <TableBody>
                    {selectedRundown.items
                      .filter((x) => x.media)
                      .map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>{item.name}</TableCell>
                          <TableCell>
                            <Button
                              key={item.id}
                              color="default"
                              onClick={() =>
                                props.onMediaSelect(item.media!.id)
                              }
                            >
                              Use
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              )}
              {props.containerType === "asset" && (
                <Table>
                  <TableBody>
                    {selectedRundown.assets
                      .filter((x) => x.media)
                      .map((item) => (
                        <TableRow key={item.media!.id}>
                          <TableCell>{item.media!.name}</TableCell>
                          <TableCell>
                            <Button
                              key={item.media!.id}
                              color="default"
                              onClick={() =>
                                props.onMediaSelect(item.media!.id)
                              }
                            >
                              Use
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              )}
            </>
          )}
          {props.containerType === "continuityItem" &&
            selectedShow.continuityItems.filter((x) => x.media).length > 0 && (
              <>
                <h4>Continuity</h4>
                <Table>
                  <TableBody>
                    {selectedShow.continuityItems
                      .filter((x) => x.media)
                      .map((item) => (
                        <TableRow key={item.media!.id}>
                          <TableCell>{item.media!.name}</TableCell>
                          <TableCell>
                            <Button
                              key={item.id}
                              color="default"
                              onClick={() =>
                                props.onMediaSelect(item.media!.id)
                              }
                            >
                              Use
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </>
            )}
        </div>
      )}
    </div>
  );
}

export function MediaSelectOrUploadDialog(props: {
  isOpen: boolean;
  setOpen: (v: boolean) => void;
  title: string;
  onUploadComplete: (url: string, fileName: string) => Promise<unknown>;
  onExistingSelected: (id: number) => Promise<unknown>;
  containerType: "rundownItem" | "continuityItem" | "asset";
  pastShowsPromise: Promise<PastShowsMedia>;
  acceptMedia: Record<string, string[]>;
}) {
  const [mode, setMode] = useState<"existing" | "new" | null>(null);
  const [isPending, startTransition] = useTransition();
  const uploadRef = useRef<MediaUploaderHandle | null>(null);

  return (
    <Dialog
      open={props.isOpen}
      onOpenChange={(v) => {
        if (uploadRef.current && !v) {
          const progress = uploadRef.current.getProgress();
          if (progress > 0 && progress < 1) {
            if (confirm("Are you sure you want to cancel the upload?")) {
              uploadRef.current.cancel();
              props.setOpen(v);
            }
          } else {
            props.setOpen(v);
          }
        } else {
          props.setOpen(v);
        }
      }}
    >
      <DialogContent className="mx-auto max-w-sm rounded bg-light p-8">
        <DialogHeader>
          <DialogTitle>{props.title}</DialogTitle>
        </DialogHeader>
        <DialogBody>
          {mode === null && (
            <div className="flex flex-col">
              <Button color="default" onClick={() => setMode("existing")}>
                Use media from previous show
              </Button>
              <span>or</span>
              <Button color="purple" onClick={() => setMode("new")}>
                Upload file
              </Button>
            </div>
          )}
          {mode !== null && (
            <Button size="small" color="ghost" onClick={() => setMode(null)}>
              Back
            </Button>
          )}
          {mode === "existing" && (
            <Suspense fallback={<em>Loading...</em>}>
              <PastShowMediaSelection
                pastShowsPromise={props.pastShowsPromise}
                containerType={props.containerType}
                onMediaSelect={(v) =>
                  startTransition(async () => {
                    await props.onExistingSelected(v);
                    props.setOpen(false);
                  })
                }
              />
            </Suspense>
          )}
          {mode === "new" && (
            <MediaUploader
              ref={uploadRef}
              title={props.title}
              prompt="Drop files here, or click to select"
              accept={props.acceptMedia}
              onComplete={(url, fileName) =>
                startTransition(async () => {
                  await props.onUploadComplete(url, fileName);
                  props.setOpen(false);
                })
              }
            />
          )}
          {isPending && <em>Processing, please wait...</em>}
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
}
