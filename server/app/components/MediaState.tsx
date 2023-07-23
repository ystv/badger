import {
  ContinuityItem,
  Media,
  MediaProcessingTask,
  MediaProcessingTaskState,
  MediaState,
  Rundown,
  RundownItem,
} from "@prisma/client";
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
import { Dialog, Popover } from "@headlessui/react";
import Button from "@/components/Button";
import { MediaUploadDialog } from "@/components/MediaUpload";

export interface CompleteMedia extends Media {
  tasks: MediaProcessingTask[];
}

export interface CompleteRundownItem extends RundownItem {
  media: CompleteMedia[];
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
      <Popover.Button className={clsx("rounded-md py-1 px-2", classNames)}>
        {status}
      </Popover.Button>
      <Popover.Overlay className="fixed inset-0 bg-dark/20 z-20" />
      <Popover.Panel className="absolute shadow-xl ml-4 z-50 m-0">
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
          <Button color="warning" inverted onClick={() => doReplace()}>
            Replace
          </Button>
        </div>
      </Popover.Panel>
    </Popover>
  );
}

export function ItemMediaState({
  item,
  itemType,
}: {
  item: CompleteContinuityItem | CompleteRundownItem;
  itemType: "rundown_item" | "continuity_item";
}) {
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  let base;
  const media = Array.isArray(item.media)
    ? item.media.length > 0
      ? item.media[0]
      : null
    : item.media;
  if (media === null) {
    base = (
      <Button color="danger" onClick={() => setIsUploadOpen(true)}>
        Media Missing
      </Button>
    );
  } else {
    base = (
      <MediaProcessingState
        media={media} // TODO handle multiple media for rundown items
        doReplace={() => setIsUploadOpen(true)}
      />
    );
  }
  return (
    <>
      {base}
      <Dialog open={isUploadOpen} onClose={() => setIsUploadOpen(false)}>
        <MediaUploadDialog
          parentType={itemType}
          parentID={item.id}
          title={`Upload '${item.name}'`}
          close={() => setIsUploadOpen(false)}
        />
      </Dialog>
    </>
  );
}
