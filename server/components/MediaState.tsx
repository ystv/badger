import {
  ContinuityItem,
  Media,
  MediaProcessingTask,
  MediaProcessingTaskState,
  MediaState,
  RundownItem,
} from "bowser-prisma/client";
import {
  IoAlertCircle,
  IoCheckmarkCircle,
  IoCloseCircle,
  IoEllipse,
} from "react-icons/io5";
import clsx from "clsx";
import Image from "next/image";
import Spinner from "@/app/_assets/spinner.svg";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";
import Button from "@/components/ui/button";
import {
  MediaUploadDialog,
  MediaUploadDialogHandle,
} from "@/components/MediaUpload";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogBody } from "next/dist/client/components/react-dev-overlay/internal/components/Dialog";

export interface CompleteMedia extends Media {
  tasks: MediaProcessingTask[];
}

export interface CompleteRundownItem extends RundownItem {
  media: CompleteMedia | null;
}

export interface CompleteContinuityItem extends ContinuityItem {
  media: CompleteMedia | null;
}

function IconForTaskState({ state }: { state: MediaProcessingTaskState }) {
  const classNames = "inline-block h-4 w-4 mr-1";
  switch (state) {
    case "Complete":
      return (
        <IoCheckmarkCircle className={clsx(classNames, "fill-success-4")} />
      );
    case "Pending":
      return <IoEllipse className={clsx(classNames, "fill-warning-4")} />;
    case "Failed":
      return <IoCloseCircle className={clsx(classNames, "fill-danger-4")} />;
    case "Warning":
      return <IoAlertCircle className={clsx(classNames, "fill-warning-4")} />;
    case "Running":
      return <Image src={Spinner} alt="" className={clsx(classNames)} />;
  }
}

function MediaProcessingState({
  media,
  doReplace,
}: {
  media: CompleteMedia;
  doReplace: () => void;
}) {
  const router = useRouter();
  const intervalRef = useRef<NodeJS.Timer | null>(null);
  useEffect(() => {
    if (
      media.state === MediaState.Pending ||
      media.state === MediaState.Processing
    ) {
      intervalRef.current = setInterval(() => router.refresh(), 2500);
    }
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, [media.state, router]);

  let classNames = "";
  let status = "";
  switch (media.state) {
    case MediaState.Pending:
      classNames = "bg-purple-4 text-light";
      status = "Media pending";
      break;
    case MediaState.Processing:
      classNames = "bg-purple-4 text-light";
      status = "Media processing";
      break;
    case MediaState.Ready:
      classNames = "bg-success-4 text-light";
      status = "Good to go!";
      break;
    case MediaState.ProcessingFailed:
      classNames = "bg-danger-4 text-light";
      status = "Media processing failed";
      break;
    default:
      throw new Error(`Unhandled MediaState ${media.state}`);
  }
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className={classNames} size="small">
          {status}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="absolute shadow-xl ml-4 z-50 m-0">
        <div className="bg-light text-dark p-4 rounded">
          <ul>
            {media.tasks.map((task) => (
              <li key={task.id}>
                <IconForTaskState state={task.state} />
                {task.description}
                {task.additionalInfo.length > 0 && (
                  <>
                    &nbsp;<small>({task.additionalInfo})</small>
                  </>
                )}
              </li>
            ))}
          </ul>
          <Button color="warning" onClick={() => doReplace()}>
            Replace
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export function ItemMediaStateAndUploadDialog({
  item,
  onUploadComplete,
}: {
  item: CompleteContinuityItem | CompleteRundownItem;
  onUploadComplete: (url: string, fileName: string) => Promise<unknown>;
}) {
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const uploadRef = useRef<MediaUploadDialogHandle | null>(null);
  let base;
  if (item.media === null) {
    base = (
      <Button color="danger" onClick={() => setIsUploadOpen(true)}>
        Media Missing
      </Button>
    );
  } else {
    base = (
      <MediaProcessingState
        media={item.media}
        doReplace={() => setIsUploadOpen(true)}
      />
    );
  }
  return (
    <>
      <Dialog
        open={isUploadOpen}
        onOpenChange={(v) => {
          if (uploadRef.current && !v) {
            const progress = uploadRef.current.getProgress();
            if (progress > 0 && progress < 1) {
              if (confirm("Are you sure you want to cancel the upload?")) {
                uploadRef.current.cancel();
                setIsUploadOpen(v);
              }
            } else {
              setIsUploadOpen(v);
            }
          } else {
            setIsUploadOpen(v);
          }
        }}
      >
        <DialogTrigger asChild>{base}</DialogTrigger>
        <DialogContent className="mx-auto max-w-sm rounded bg-light p-8">
          <DialogHeader>
            <DialogTitle>Upload media for {item.name}</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <MediaUploadDialog
              ref={uploadRef}
              title={`Upload '${item.name}'`}
              prompt="Drop video files here, or click to select"
              accept={{ "video/*": [] }}
              onComplete={(url, fileName) =>
                startTransition(async () => {
                  await onUploadComplete(url, fileName);
                  setIsUploadOpen(false);
                })
              }
            />
            {isPending && <em>Processing, please wait...</em>}
          </DialogBody>
        </DialogContent>
      </Dialog>
    </>
  );
}
