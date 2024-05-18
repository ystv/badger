import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@badger/components/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@badger/components/select";
import { Media } from "@badger/prisma/types";
import "@badger/prisma/jsonTypes";
import { DialogBody } from "next/dist/client/components/react-dev-overlay/internal/components/Dialog";
import {
  Suspense,
  use,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
  useTransition,
} from "react";
import { MediaUploader, MediaUploaderHandle } from "./MediaUpload";
import Button from "@badger/components/button";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@badger/components/table";
import {
  MetadataField,
  MetadataTargetType,
  Rundown,
  Show,
} from "@badger/prisma/client";
import invariant from "@/lib/invariant";
import { expectNever } from "ts-expect";
import { UploadSourceType } from "./Uploader";

export type PastShowsMedia = Array<{
  id: number;
  name: string;
  start: Date;
  metadata: Array<{
    value: PrismaJson.MetadataValue | null;
    field: MetadataField;
    media: Media | null;
  }>;
  rundowns: Array<
    Rundown & {
      items: Array<{
        id: number;
        name: string;
        media: Media | null;
      }>;
      assets: Array<{
        media: Media | null;
      }>;
      metadata: Array<{
        value: PrismaJson.MetadataValue | null;
        field: MetadataField;
      }>;
    }
  >;
  continuityItems: Array<{
    id: number;
    name: string;
    media: Media | null;
  }>;
}>;

interface MediaContainerPickState {
  // input
  showCandidates: PastShowsMedia;
  metaField?: MetadataField;
  containerType: "rundownItem" | "continuityItem" | "asset" | "metadata";

  // output
  complete: boolean;
  show: PastShowsMedia[0] | null;
  rundown: Rundown | null;
  shouldSelectRundown?: boolean;
  media?: Media[] | null;
}

function mediaContainerPickReducer(
  state: MediaContainerPickState,
  action:
    | {
        type: "chooseShow";
        showID: number;
      }
    | {
        type: "chooseRundown";
        rundownID: number;
      },
): MediaContainerPickState {
  switch (action.type) {
    case "chooseShow": {
      const show = state.showCandidates.find((x) => x.id === action.showID);
      invariant(show, "invalid showID passed to mediaContainerPickReducer");
      let shouldSelectRundown = true;
      switch (state.containerType) {
        case "continuityItem":
          shouldSelectRundown = false;
          break;
        case "metadata":
          shouldSelectRundown =
            state.metaField!.target === "Rundown" ||
            state.metaField!.target === "ShowOrRundown";
          break;
      }
      let media: Media[] | null = null;
      if (!shouldSelectRundown) {
        // we're done, just need to find the list of media
        switch (state.containerType) {
          case "continuityItem":
            media = show.continuityItems
              .flatMap((x) => x.media)
              .filter(Boolean) as Media[];
            break;
          case "metadata":
            invariant(
              state.metaField!.target === "Show",
              "invalid metadata target",
            );
            media = show.metadata
              .filter((m) => m.field.type === "Media" && m.value !== null)
              .map((m) => m.media)
              .filter(Boolean) as Media[];
            break;
          default:
            invariant(
              false,
              `invalid state: not showSelectRundown for a container ${state.containerType}`,
            );
        }
      }
      invariant(
        shouldSelectRundown || media,
        "invalid state: not shouldSelectRundown but no media",
      );
      return {
        ...state,
        show,
        shouldSelectRundown,
        complete: !shouldSelectRundown,
        media,
      };
    }
    case "chooseRundown": {
      const rundown = state.show!.rundowns.find(
        (x) => x.id === action.rundownID,
      );
      invariant(
        rundown,
        "invalid rundownID passed to mediaContainerPickReducer",
      );
      const media = rundown.items
        .map((i) => i.media)
        .filter(Boolean) as Media[];
      return {
        ...state,
        rundown,
        media,
        complete: true,
      };
    }
    default:
      return state;
  }
}

function SelectMediaContainer(props: {
  pastShowsPromise: Promise<PastShowsMedia>;
  containerType: "rundownItem" | "continuityItem" | "asset" | "metadata";
  metaField?: MetadataField;
  onSelect: (mediaCandidates: Media[]) => unknown;
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
      case "metadata":
        invariant(
          props.metaField,
          "SelectMediaContainer: containerType is metadata but no metaField passed",
        );
        let targets;
        switch (props.metaField.target) {
          case "Show":
          case "ShowOrRundown":
            targets = data;
            break;
          case "Rundown":
            targets = [] as PastShowsMedia;
            break;
          default:
            expectNever(props.metaField.target);
        }
        return targets.filter((x) =>
          x.metadata.some(
            (m) =>
              m.field.id === props.metaField!.id &&
              m.value !== null &&
              m.field.type === "Media",
          ),
        );
    }
  }, [props.containerType, props.metaField, data]);
  const [{ show, rundown, shouldSelectRundown, complete, media }, dispatch] =
    useReducer(mediaContainerPickReducer, {
      complete: false,
      show: null,
      rundown: null,
      showCandidates: showCandidates,
      metaField: props.metaField,
      containerType: props.containerType,
      shouldSelectRundown: false,
    } satisfies MediaContainerPickState);

  useEffect(() => {
    if (complete) {
      props.onSelect(media!);
    }
  });

  invariant(
    !shouldSelectRundown || show,
    "shouldSelectRundown true but no show",
  );
  return (
    <>
      <Select
        value={show?.id?.toString(10)}
        onValueChange={(v) =>
          dispatch({ type: "chooseShow", showID: parseInt(v, 10) })
        }
        data-testid="PastShowMediaSelection.selectShow"
      >
        <SelectTrigger>
          <SelectValue>{show?.name ?? "Select show"}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          {showCandidates.map((show) => (
            <SelectItem key={show.id} value={show.id.toString(10)}>
              {show.name} ({format(show.start, "dd MMM yyyy, hh:mm a")})
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {shouldSelectRundown && (
        <Select
          value={rundown?.id?.toString(10)}
          onValueChange={(v) =>
            dispatch({ type: "chooseRundown", rundownID: parseInt(v, 10) })
          }
        >
          <SelectTrigger>
            <SelectValue>{rundown?.name ?? "Select rundown"}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            {show!.rundowns.map((rundown) => (
              <SelectItem key={rundown.id} value={rundown.id.toString(10)}>
                {rundown.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </>
  );
}

function PastShowMediaSelection(props: {
  // We pass a promise in here, not the original data, because this component
  // might never be rendered, and we don't want to waste time fetching data
  pastShowsPromise: Promise<PastShowsMedia>;
  onMediaSelect: (id: number) => unknown;
  containerType: "rundownItem" | "continuityItem" | "asset" | "metadata";
  metaField?: MetadataField;
}) {
  invariant(
    props.containerType !== "metadata" || props.metaField,
    "PastShowMediaSelection: containerType is metadata but no metaField passed",
  );

  const [media, setMedia] = useState<Media[] | null>(null);

  return (
    <div>
      <SelectMediaContainer
        containerType={props.containerType}
        metaField={props.metaField}
        pastShowsPromise={props.pastShowsPromise}
        onSelect={setMedia}
      />
      {media !== null && (
        <Table>
          <TableBody>
            {media.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>
                  <Button
                    key={item.id}
                    color="default"
                    onClick={() => props.onMediaSelect(item.id)}
                  >
                    Use
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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
  containerType: UploadSourceType;
  containerId: string;
  metaFieldContainer?: MetadataField;
  pastShowsPromise: Promise<PastShowsMedia>;
  acceptMedia: Record<string, string[]>;
}) {
  const [mode, setMode] = useState<"existing" | "new" | null>(null);
  const [isPending, startTransition] = useTransition();

  return (
    <Dialog
      open={props.isOpen}
      onOpenChange={(v) => {
        if (!isPending) {
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
                metaField={props.metaFieldContainer}
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
              title={props.title}
              prompt="Drop files here, or click to select"
              sourceType={props.containerType}
              sourceId={props.containerId}
              accept={props.acceptMedia}
              onSelection={() => {
                props.setOpen(false);
              }}
              onComplete={(url, fileName) =>
                startTransition(async () => {
                  await props.onUploadComplete(url, fileName);
                  props.setOpen(false);
                })
              }
            />
          )}
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
}
