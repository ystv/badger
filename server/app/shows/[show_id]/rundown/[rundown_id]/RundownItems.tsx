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
import {
  addItem,
  deleteItem,
  editItem,
  processUploadForRundownItem,
  reorder,
} from "./actions";
import { AddItemSchema, EditItemSchema, ItemTypeSchema } from "./schema";
import { Field, HiddenField, SelectField } from "@/components/FormFields";
import { identity } from "lodash";
import {
  useCallback,
  useEffect,
  useMemo,
  experimental_useOptimistic as useOptimistic,
  useRef,
  useState,
  useTransition,
} from "react";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { MediaUploadDialog } from "@/components/MediaUpload";
import { ItemMediaState } from "@/components/MediaState";

// beautiful-dnd is not compatible with SSR
const Droppable = dynamic(
  () => import("react-beautiful-dnd").then((res) => res.Droppable),
  { ssr: false, loading: () => <Image src={Spinner} alt="" /> },
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
    },
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
          ev.destination!.index,
        );
      });
    },
    [props.rundown.id, doOptimisticMove],
  );

  // Periodically refresh if any items are pending
  const intervalRef = useRef<NodeJS.Timer | null>(null);
  useEffect(() => {
    const anyPending = props.rundown.items.some((x) =>
      x.media.some(
        (y) =>
          y.state === MediaState.Pending || y.state === MediaState.Processing,
      ),
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

  const [items, runtime] = useMemo(() => {
    const items = [];
    let runningDuration = 0;
    for (let idx = 0; idx < optimisticItems.length; idx++) {
      const item = optimisticItems[idx];
      runningDuration += item.durationSeconds;
      // Ensure the render prop closes over the current value of runningDuration
      const dur = runningDuration;

      items.push(
        <Draggable
          key={item.id}
          draggableId={item.id.toString()}
          index={idx}
          isDragDisabled={isPending}
        >
          {(provided) => (
            <tr {...provided.draggableProps} ref={provided.innerRef}>
              <td {...provided.dragHandleProps} className="text-2xl px-4">
                ☰
              </td>
              <td className="py-2 px-4">
                <div>
                  <span className="block">{item.name}</span>
                  {item.type === "VT" && (
                    <ItemMediaState
                      item={item}
                      onUploadComplete={async (url, fileName) =>
                        processUploadForRundownItem(item.id, fileName, url)
                      }
                    />
                  )}
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
        </Draggable>,
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
