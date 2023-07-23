"use client";

import {
  Media,
  MediaProcessingTask,
  MediaState,
  Rundown,
  RundownItem,
} from "@prisma/client";
import {
  DragDropContext,
  Draggable,
  OnDragEndResponder,
} from "react-beautiful-dnd";
import dynamic from "next/dynamic";
import Image from "next/image";
import Spinner from "@/app/_assets/spinner.svg";
import { Dialog, Popover } from "@headlessui/react";
import Form from "@/components/Form";
import { addItem, deleteItem, editItem, reorder } from "./actions";
import { AddItemSchema, EditItemSchema, ItemTypeSchema } from "./schema";
import { Field, HiddenField, SelectField } from "@/components/FormFields";
import { identity } from "lodash";
import { useDropzone } from "react-dropzone";
import * as tus from "tus-js-client";
import {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  experimental_useOptimistic as useOptimistic,
  useRef,
  useState,
  useTransition,
} from "react";
import { format } from "date-fns";
import clsx from "clsx";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";

// beautiful-dnd is not compatible with SSR
const Droppable = dynamic(
  () => import("react-beautiful-dnd").then((res) => res.Droppable),
  { ssr: false, loading: () => <Image src={Spinner} alt="" /> }
);

export interface MediaWithTasks extends Media {
  tasks: MediaProcessingTask[];
}

export interface ItemWithMedia extends RundownItem {
  media: MediaWithTasks[];
}

export interface CompleteRundown extends Rundown {
  items: ItemWithMedia[];
}

function formatDuration(duration: number): string {
  const mins = Math.floor(duration / 60);
  const secs = duration % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

function AddSegment(props: { rundown: CompleteRundown }) {
  return (
    <Popover>
      {({ close }) => (
        <>
          <Popover.Button className="bg-dark text-light rounded-md py-1 px-2">
            Add Segment
          </Popover.Button>
          <Popover.Overlay className="fixed inset-0 bg-dark/40 z-20" />
          <Popover.Panel className="absolute shadow-lg bg-light p-4 ml-4 z-50 m-0">
            <Form
              action={addItem}
              schema={AddItemSchema}
              onSuccess={() => close()}
            >
              <HiddenField
                name="showID"
                value={props.rundown.showId.toString(10)}
              />
              <HiddenField
                name="rundownID"
                value={props.rundown.id.toString(10)}
              />
              <Field name="name" label="Name" />
              <SelectField
                name="type"
                label="type"
                options={Object.keys(ItemTypeSchema.enum)}
                renderOption={identity}
                getOptionValue={identity}
                filter={false}
              />
              <Field name="durationSeconds" label="Duration (seconds)" />
            </Form>
          </Popover.Panel>
        </>
      )}
    </Popover>
  );
}

function EditItem(props: {
  showID: number;
  rundownID: number;
  item: RundownItem;
  done: () => void;
}) {
  return (
    <Form
      action={editItem}
      schema={EditItemSchema}
      initialValues={props.item}
      onSuccess={props.done}
      submitLabel="Save"
    >
      <HiddenField name="showID" value={props.showID.toString(10)} />
      <HiddenField name="rundownID" value={props.rundownID.toString(10)} />
      <HiddenField name="itemID" value={props.item.id.toString(10)} />
      <Field name="name" label="Name" />
      <SelectField
        name="type"
        label="type"
        options={Object.keys(ItemTypeSchema.enum)}
        renderOption={identity}
        getOptionValue={identity}
        filter={false}
      />
      <Field name="durationSeconds" label="Duration (seconds)" />
    </Form>
  );
}

function UploadDialog(props: {
  rundown: CompleteRundown;
  itemID: number;
  close?: () => void;
}) {
  const item = useMemo(
    () => props.rundown.items.find((i) => i.id === props.itemID),
    [props.rundown.items, props.itemID]
  );
  if (!item) {
    throw new Error("Item not found");
  }
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    disabled: isUploading,
    onDrop(files) {
      const upload = new tus.Upload(files[0], {
        endpoint: process.env.NEXT_PUBLIC_TUS_ENDPOINT,
        metadata: {
          filename: files[0].name,
          filetype: files[0].type,
          rundownItemID: item.id.toString(10),
        },
        onError: function (error) {
          setIsUploading(false);
          setError(error.message);
        },
        onProgress: function (bytesUploaded, bytesTotal) {
          var percentage = (bytesUploaded / bytesTotal) * 100;
          setUploadProgress(percentage);
        },
        onSuccess: function () {
          setIsUploading(false);
          router.refresh();
          props.close?.();
        },
      });
      // Check if there are any previous uploads to continue.
      upload.findPreviousUploads().then(function (previousUploads) {
        // Found previous uploads so we select the first one.
        if (previousUploads.length) {
          // TODO: if this is already completely finished, Tus won't fire the pre-finish hook,
          // so the backend won't know to run the jobs.
          upload.resumeFromPreviousUpload(previousUploads[0]);
        }

        // Start the upload
        upload.start();
        setUploadProgress(0);
        setIsUploading(true);
      });
    },
    accept: {
      "video/*": [],
    },
    maxFiles: 1,
  });
  return (
    <>
      <div className="fixed inset-0 bg-dark/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-sm rounded bg-light p-8 relative">
          <Dialog.Title className="text-xl font-bold">
            Add media for {item.name}
          </Dialog.Title>
          <div
            {...getRootProps()}
            className="p-8 m-1 rounded-md bg-mid-light text-dark w-64 h-24"
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the file here...</p>
            ) : (
              <p>Drop video files here, or click to select</p>
            )}
          </div>
          {isUploading && (
            <div
              className="absolute bottom-0 w-full h-2 left-0 bg-primary"
              style={{
                width: `${uploadProgress}%`,
              }}
            />
          )}
        </Dialog.Panel>
      </div>
    </>
  );
}

function ItemsTable(props: { rundown: CompleteRundown }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const [optimisticItems, doOptimisticMove] = useOptimistic(
    props.rundown.items,
    (oldItems, act: { id: number; newOrder: number }) => {
      const items = [...oldItems];
      const item = items.find((i) => i.id === act.id);
      if (!item) {
        return items;
      }
      const oldOrder = item.order;
      if (oldOrder > act.newOrder) {
        for (let i = act.newOrder; i < oldOrder; i++) {
          items[i].order++;
        }
      } else {
        for (let i = oldOrder + 1; i <= act.newOrder; i++) {
          items[i].order--;
        }
      }
      item.order = act.newOrder;
      items.sort((a, b) => a.order - b.order);
      return items;
    }
  );

  const doMove: OnDragEndResponder = useCallback(
    (ev) => {
      if (!ev.destination) {
        return;
      }
      doOptimisticMove({
        id: parseInt(ev.draggableId, 10),
        newOrder: ev.destination!.index,
      });
      startTransition(async () => {
        await reorder(
          props.rundown.id,
          parseInt(ev.draggableId, 10),
          ev.destination!.index
        );
      });
    },
    [props.rundown.id, doOptimisticMove]
  );

  // Periodically refresh if any items are pending
  const intervalRef = useRef<NodeJS.Timer | null>(null);
  useEffect(() => {
    const anyPending = props.rundown.items.some((x) =>
      x.media.some(
        (y) =>
          y.state === MediaState.Pending || y.state === MediaState.Processing
      )
    );
    if (!anyPending) {
      return;
    }
    intervalRef.current = setInterval(() => {
      router.refresh();
    }, 2500);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [props.rundown.items, router]);

  const [showUploadForItemID, setShowUploadForItemID] = useState<number | null>(
    null
  );

  const [items, runtime] = useMemo(() => {
    const items = [];
    let runningDuration = 0;
    for (let idx = 0; idx < optimisticItems.length; idx++) {
      const item = optimisticItems[idx];
      runningDuration += item.durationSeconds;
      // Ensure the render prop closes over the current value of runningDuration
      const dur = runningDuration;

      let classNames = "";
      let mediaStatus = "";
      let popoverContents;
      if (item.type === "VT") {
        if (item.media.length === 0) {
          classNames += "bg-danger-4 text-light";
          mediaStatus = "Missing media";
        } else if (item.media[0].state === MediaState.Pending) {
          classNames += "bg-purple-4 text-light";
          mediaStatus = "Media processing...";
        } else {
          if (item.media[0].state === MediaState.Processing) {
            classNames += "bg-purple-4 text-light";
            mediaStatus = "Media processing...";
          } else if (item.media[0].state === MediaState.Ready) {
            classNames += "bg-success-4 text-light";
            mediaStatus = "Good to go!";
          }
          popoverContents = (
            <div>
              <ul>
                {item.media[0].tasks.map((task) => (
                  <li key={task.id}>
                    {task.description} - {task.state}
                    {task.additionalInfo.length > 0 && (
                      <>
                        &nbsp;<small>({task.additionalInfo})</small>
                      </>
                    )}
                  </li>
                ))}
              </ul>
              <Button
                color="warning"
                inverted
                onClick={() => setShowUploadForItemID(item.id)}
              >
                Replace
              </Button>
            </div>
          );
        }
      }

      let button: ReactNode;
      if (popoverContents) {
        button = (
          <Popover>
            <Popover.Button>{mediaStatus}</Popover.Button>
            <Popover.Panel className="absolute shadow-lg bg-light text-dark p-4 ml-4 z-50 m-0">
              {popoverContents}
            </Popover.Panel>
          </Popover>
        );
      } else {
        button = (
          <Button
            color="light"
            inverted
            onClick={() => setShowUploadForItemID(item.id)}
          >
            {mediaStatus}
          </Button>
        );
      }

      items.push(
        <Draggable
          key={item.id}
          draggableId={item.id.toString()}
          index={idx}
          isDragDisabled={isPending}
        >
          {(provided) => (
            <tr
              {...provided.draggableProps}
              ref={provided.innerRef}
              className={classNames}
            >
              <td {...provided.dragHandleProps} className="text-2xl px-4">
                ☰
              </td>
              <td className="py-2 px-4">
                <div>
                  <span className="block">{item.name}</span>

                  {button}
                </div>
              </td>
              <td>{formatDuration(item.durationSeconds)}</td>
              <td>{formatDuration(dur)}</td>
              <td>
                <Popover>
                  {({ close }) => (
                    <>
                      <Popover.Button className="border-[1px] border-light rounded-md px-2 py-1">
                        Edit
                      </Popover.Button>
                      <Popover.Overlay className="fixed inset-0 bg-dark/40 z-20" />
                      <Popover.Panel className="absolute shadow-lg bg-light text-dark p-4 ml-4 z-50 m-0">
                        <EditItem
                          showID={props.rundown.showId}
                          rundownID={props.rundown.id}
                          item={item}
                          done={close}
                        />
                      </Popover.Panel>{" "}
                    </>
                  )}
                </Popover>
              </td>
              <td className="pr-4">
                <Popover>
                  <Popover.Button className="border-[1px] border-danger-2 rounded-md px-2 py-1">
                    Delet
                  </Popover.Button>
                  <Popover.Overlay className="fixed inset-0 bg-dark/40 z-20" />
                  <Popover.Panel className="absolute shadow-lg bg-light text-dark p-4 ml-4 z-50 m-0">
                    <Button
                      color="danger"
                      onClick={() => {
                        startTransition(async () => {
                          await deleteItem(props.rundown.id, item.id);
                        });
                      }}
                    >
                      You sure boss?
                    </Button>
                  </Popover.Panel>
                </Popover>
              </td>
            </tr>
          )}
        </Draggable>
      );
    }
    return [items, runningDuration];
  }, [optimisticItems, isPending, props.rundown.id, props.rundown.showId]);

  return (
    <>
      <div>
        <strong>Total runtime:</strong> {formatDuration(runtime)}
      </div>
      <DragDropContext onDragEnd={doMove}>
        <Droppable droppableId="0">
          {(provided) => (
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th className="px-2">Name</th>
                  <th className="px-2">Duration</th>
                  <th className="px-2">Running Total</th>
                </tr>
              </thead>
              <tbody {...provided.droppableProps} ref={provided.innerRef}>
                {items}
                {provided.placeholder}
              </tbody>
            </table>
          )}
        </Droppable>
      </DragDropContext>
      <Dialog
        open={showUploadForItemID !== null}
        onClose={() => setShowUploadForItemID(null)}
      >
        {showUploadForItemID !== null && (
          <UploadDialog
            rundown={props.rundown}
            itemID={showUploadForItemID}
            close={() => setShowUploadForItemID(null)}
          />
        )}
      </Dialog>
    </>
  );
}

export function RundownItems(props: { rundown: CompleteRundown }) {
  return (
    <div>
      <ItemsTable rundown={props.rundown} />
      <AddSegment rundown={props.rundown} />
    </div>
  );
}
