import {
  ContinuityItem,
  Media,
  MediaProcessingTask,
  MediaProcessingTaskState,
  MediaState,
  RundownItem,
} from "@bowser/prisma/client";
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
import { useEffect, useRef, useState } from "react";
import Button from "@bowser/components/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@bowser/components/popover";
import { MediaSelectOrUploadDialog, PastShowsMedia } from "./MediaSelection";

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

  let color;
  let status = "";
  switch (media.state) {
    case MediaState.Pending:
      color = "purple" as const;
      status = "Media pending";
      break;
    case MediaState.Processing:
      color = "purple" as const;
      status = "Media processing";
      break;
    case MediaState.Ready:
      color = "success" as const;
      status = "Good to go!";
      break;
    case MediaState.ProcessingFailed:
      color = "danger" as const;
      status = "Media processing failed";
      break;
    default:
      throw new Error(`Unhandled MediaState ${media.state}`);
  }
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button color={color} className="py-6" size="small">
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
  onExistingSelected,
  pastShowsPromise,
}: {
  item: CompleteContinuityItem | CompleteRundownItem;
  onUploadComplete: (url: string, fileName: string) => Promise<unknown>;
  onExistingSelected: (id: number) => Promise<unknown>;
  pastShowsPromise: Promise<PastShowsMedia>;
}) {
  let base;
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  if (item.media === null) {
    base = (
      <Button
        color="danger"
        className="py-6"
        onClick={() => setIsUploadOpen(true)}
      >
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
      {base}
      <MediaSelectOrUploadDialog
        containerType={"type" in item ? "rundownItem" : "continuityItem"}
        isOpen={isUploadOpen}
        setOpen={setIsUploadOpen}
        onUploadComplete={onUploadComplete}
        onExistingSelected={onExistingSelected}
        pastShowsPromise={pastShowsPromise}
        title={`Select media for ${item.name}`}
        acceptMedia={{ "video/*": [] }}
      />
    </>
  );
}
