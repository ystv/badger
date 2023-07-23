"use client";

import {
  CompleteContinuityItem,
  CompleteRundown,
  RundownOrContinuity,
} from "./types";
import {
  DragDropContext,
  Draggable,
  OnDragEndResponder,
} from "react-beautiful-dnd";
import Spinner from "@/app/_assets/spinner.svg";
import {
  experimental_useOptimistic as useOptimistic,
  forwardRef,
  useCallback,
  useMemo,
  useTransition,
} from "react";
import {
  addItem,
  deleteItem,
  editContinuityItem,
  reorderShowItems,
} from "./actions";
import { Show } from "@prisma/client";
import Button from "@/components/Button";
import { Popover } from "@headlessui/react";
import { TextInput } from "flowbite-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { format } from "date-fns";
import Link from "next/link";
import Form from "@/components/Form";
import { editContinuityItemSchema } from "./schema";
import { Field, HiddenField } from "@/components/FormFields";
import { ItemMediaState } from "@/app/components/MediaState";

// beautiful-dnd is not compatible with SSR
const Droppable = dynamic(
  () => import("react-beautiful-dnd").then((res) => res.Droppable),
  { ssr: false, loading: () => <Image src={Spinner} alt="" /> },
);

function AddItemPopover(props: {
  showID: number;
  type: "rundown" | "continuity_item";
  close?: () => void;
}) {
  const [isPending, startTransition] = useTransition();
  return (
    <form
      action={(data) =>
        startTransition(async () => {
          await addItem(props.showID, props.type, data.get("name") as string);
          props.close?.();
        })
      }
    >
      <label>
        Name
        <TextInput required name="name" />
      </label>
      <Button type="primary" isDisabled={isPending}>
        Create
      </Button>
    </form>
  );
}

function AddItemButtons(props: { showID: number }) {
  return (
    <div className="flex flex-row space-x-2">
      <span>Add:</span>
      <Popover title="New Rundown">
        <Popover.Button className="bg-primary-4 text-light rounded-md py-1 px-2">
          Rundown
        </Popover.Button>
        <Popover.Panel>
          <AddItemPopover showID={props.showID} type="rundown" />
        </Popover.Panel>
      </Popover>
      <Popover title="New Continuity Item">
        <Popover.Button className="bg-purple-4 text-light rounded-md py-1 px-2">
          Continuity
        </Popover.Button>
        <Popover.Panel>
          <AddItemPopover showID={props.showID} type="continuity_item" />
        </Popover.Panel>
      </Popover>
    </div>
  );
}

function DeleteItemPopover(props: {
  showID: number;
  itemType: "rundown" | "continuity_item";
  itemID: number;
}) {
  const [isPending, startTransition] = useTransition();
  return (
    <Popover>
      <Popover.Button className="border-danger border-[1px] text-danger hover:text-light hover:bg-danger-4 px-0.5 py-1 rounded-md">
        Delet
      </Popover.Button>
      <Popover.Overlay className="fixed inset-0 bg-dark/40 z-20" />
      <Popover.Panel className="absolute shadow-lg ml-4 z-50 p-0 m-0">
        <Button
          color="danger"
          inverted
          onClick={() =>
            startTransition(async () => {
              deleteItem(props.showID, props.itemType, props.itemID);
            })
          }
          disabled={isPending}
          className="z-50"
        >
          {isPending && <Image src={Spinner} alt="" />}
          You sure boss?
        </Button>
      </Popover.Panel>
    </Popover>
  );
}

const RundownRow = forwardRef<
  HTMLElement,
  {
    rundown: CompleteRundown;
    draggableProps: any;
    dragHandleProps: any;
    time: Date;
    runningDuration: number;
  }
>(function RundownRow(props, ref) {
  const item = props.rundown;
  return (
    <tr ref={ref} {...props.draggableProps} className="[&>td]:m-2">
      <td {...props.dragHandleProps} className="text-2xl cursor-grab">
        ☰
      </td>
      <td className={"font-bold text-primary"}>Rundown</td>
      <td>{item.name}</td>
      <td>{format(props.time, "HH:mm")}</td>
      <td>{format(new Date(props.runningDuration * 1000), "mm:ss")}</td>
      <td>
        <Link href={`/shows/${item.showId}/rundown/${item.id}`}>
          <Button size="small">Edit</Button>
        </Link>
      </td>
      <td>
        <DeleteItemPopover
          showID={props.rundown.showId}
          itemType="rundown"
          itemID={item.id}
        />
      </td>
    </tr>
  );
});

const ContinuityItemRow = forwardRef<
  HTMLElement,
  {
    item: CompleteContinuityItem;
    draggableProps: any;
    dragHandleProps: any;
    time: Date;
    runningDuration: number;
  }
>(function ContinuityItemRow(props, ref) {
  const item = props.item;
  return (
    <tr ref={ref} {...props.draggableProps} className="[&>td]:m-2 align-top">
      <td {...props.dragHandleProps} className="text-2xl cursor-grab">
        ☰
      </td>
      <td className={"font-bold text-purple"}>Continuity</td>
      <td>
        <div>{item.name}</div>
        <div>
          <ItemMediaState item={item} itemType="continuity_item" />
        </div>
      </td>
      <td>{format(props.time, "HH:mm")}</td>
      <td>{format(new Date(props.runningDuration * 1000), "mm:ss")}</td>
      <td>
        <Popover>
          {({ close }) => (
            <>
              <Popover.Button className="bg-primary-4 text-light rounded-md py-1 px-2">
                Edit
              </Popover.Button>
              <Popover.Overlay className="fixed inset-0 bg-dark/40 z-20" />
              <Popover.Panel className="absolute bg-light shadow-lg rounded-sm ml-4 z-50 p-4 m-0">
                <Form
                  action={editContinuityItem}
                  schema={editContinuityItemSchema}
                  initialValues={item}
                  onSuccess={() => close()}
                  submitLabel="Save"
                >
                  <HiddenField name="itemID" value={item.id.toString(10)} />
                  <Field name="name" label="Name" />
                </Form>
              </Popover.Panel>
            </>
          )}
        </Popover>
      </td>
      <td>
        <DeleteItemPopover
          showID={props.item.showId}
          itemType="continuity_item"
          itemID={item.id}
        />
      </td>
    </tr>
  );
});

export function ShowItemsList(props: {
  show: Show;
  items: RundownOrContinuity[];
}) {
  const [isPending, startTransition] = useTransition();
  const [optimisticItems, doOptimisticMove] = useOptimistic(
    props.items,
    (state, action: { type: string; id: number; newIdx: number }) => {
      const idx = state.findIndex(
        (i) => i._type == action.type && i.id == action.id,
      );
      if (idx === -1) {
        return state;
      }
      const item = state[idx];
      const newState = [...state];
      newState.splice(idx, 1);
      newState.splice(action.newIdx, 0, item);
      return newState;
    },
  );
  const onDragEnd: OnDragEndResponder = useCallback(
    (result) => {
      startTransition(async () => {
        const [type, id] = result.draggableId.split(":");
        doOptimisticMove({
          type,
          id: parseInt(id, 10),
          newIdx: result.destination!.index,
        });
        await reorderShowItems(
          props.show.id,
          type as "rundown" | "continuity_item",
          parseInt(id, 10),
          result.destination!.index,
        );
      });
    },
    [doOptimisticMove, props.show.id],
  );

  const rows = useMemo(() => {
    const rows = [];
    let durationTotal = 0;
    let time = props.show.start;
    for (let i = 0; i < optimisticItems.length; i++) {
      const itemStartTime = time;
      const item = optimisticItems[i];
      let duration: number;
      if (item._type === "rundown") {
        duration =
          item.items
            ?.map((x) => x.durationSeconds)
            .reduce((a, b) => a + b, 0) ?? 0;
      } else {
        duration = item.durationSeconds;
      }
      rows.push(
        <Draggable
          key={item._type + item.id}
          draggableId={item._type + ":" + item.id}
          index={i}
          isDragDisabled={isPending}
        >
          {(provided, snapshot) =>
            item._type === "rundown" ? (
              <RundownRow
                ref={provided.innerRef}
                draggableProps={provided.draggableProps}
                dragHandleProps={provided.dragHandleProps}
                rundown={item}
                time={itemStartTime}
                runningDuration={duration}
              />
            ) : (
              <ContinuityItemRow
                ref={provided.innerRef}
                draggableProps={provided.draggableProps}
                dragHandleProps={provided.dragHandleProps}
                item={item}
                time={itemStartTime}
                runningDuration={duration}
              />
            )
          }
        </Draggable>,
      );
      durationTotal += duration;
      time = new Date(time.getTime() + duration * 1000);
    }
    return rows;
  }, [optimisticItems, isPending, props.show.start]);

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        {isPending && <Image src={Spinner} alt="" />}
        <Droppable droppableId="0" isDropDisabled={isPending}>
          {(provided, snapshot) => (
            <table ref={provided.innerRef} {...provided.droppableProps}>
              <tbody>
                {rows}
                {provided.placeholder}
              </tbody>
            </table>
          )}
        </Droppable>
      </DragDropContext>
      <AddItemButtons showID={props.show.id} />
    </>
  );
}
