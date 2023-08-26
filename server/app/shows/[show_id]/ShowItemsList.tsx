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
import React, {
  experimental_useOptimistic as useOptimistic,
  forwardRef,
  useCallback,
  useMemo,
  useState,
  useTransition,
  useRef,
} from "react";
import {
  addItem,
  deleteItem,
  editContinuityItem,
  processUploadForContinuityItem,
  reorderShowItems,
} from "./actions";
import { Show } from "@bowser/prisma/client";
import Button from "@bowser/components/button";
import dynamic from "next/dynamic";
import Image from "next/image";
import { add, format } from "date-fns";
import Link from "next/link";
import Form from "@/components/Form";
import { editContinuityItemSchema } from "./schema";
import { Field, HiddenField } from "@/components/FormFields";
import { ItemMediaStateAndUploadDialog } from "@/components/MediaState";
import { Input } from "@bowser/components/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@bowser/components/popover";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@bowser/components/table";
import { formatDurationMS } from "@/lib/time";

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
  const nameRef = useRef<HTMLInputElement>(null);
  return (
    <form
      action={(data) =>
        startTransition(async () => {
          await addItem(props.showID, props.type, data.get("name") as string);
          props.close?.();
          if (nameRef.current) {
            nameRef.current.value = "";
            nameRef.current.focus();
          }
        })
      }
    >
      <label className="my-1">
        Name
        <Input
          required
          name="name"
          data-testid={"name-" + props.type}
          ref={nameRef}
        />
      </label>
      <Button
        color="primary"
        data-testid={"create-" + props.type}
        disabled={isPending}
      >
        Create
      </Button>
    </form>
  );
}

function AddItemButtons(props: { showID: number }) {
  return (
    <div className="flex flex-row space-x-2">
      <span>Add:</span>
      <Popover>
        <PopoverTrigger asChild>
          <Button color="primary">
            <span className="sr-only">New</span> Rundown
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <AddItemPopover showID={props.showID} type="rundown" />
        </PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger asChild>
          <Button color="purple">
            <span className="sr-only">New</span> Continuity{" "}
            <span className="sr-only">Item</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <AddItemPopover showID={props.showID} type="continuity_item" />
        </PopoverContent>
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
      <PopoverTrigger asChild>
        <Button color="danger">Delet</Button>
      </PopoverTrigger>
      <PopoverContent>
        <Button
          color="danger"
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
      </PopoverContent>
    </Popover>
  );
}

const RundownRow = forwardRef<
  HTMLTableRowElement,
  {
    rundown: CompleteRundown;
    draggableProps: React.ComponentPropsWithoutRef<"tr">;
    dragHandleProps: React.ComponentPropsWithoutRef<"td">;
    time: Date;
    runningDuration: number;
  }
>(function RundownRow(props, ref) {
  const item = props.rundown;
  return (
    <TableRow ref={ref} {...props.draggableProps} className="[&>td]:m-2">
      <TableCell
        {...props.dragHandleProps}
        className="text-2xl cursor-grab"
        data-testid="dragHandle"
      >
        ☰
      </TableCell>
      <TableCell className="font-bold text-primary">Rundown</TableCell>
      <TableCell className="font-bold" data-testid="RundownRow.name">
        {item.name}
      </TableCell>
      <TableCell />
      <TableCell data-testid="RundownRow.time">
        {format(props.time, "HH:mm")}
      </TableCell>
      <TableCell data-testid="RundownRow.duration">
        {formatDurationMS(props.runningDuration * 1000)}
      </TableCell>
      <TableCell>
        <Button size="small" asChild>
          <Link href={`/shows/${item.showId}/rundown/${item.id}`}>Edit</Link>
        </Button>
      </TableCell>
      <TableCell>
        <DeleteItemPopover
          showID={props.rundown.showId}
          itemType="rundown"
          itemID={item.id}
        />
      </TableCell>
    </TableRow>
  );
});

const ContinuityItemRow = forwardRef<
  HTMLTableRowElement,
  {
    item: CompleteContinuityItem;
    draggableProps: React.ComponentPropsWithoutRef<"tr">;
    dragHandleProps: React.ComponentPropsWithoutRef<"td">;
    time: Date;
    runningDuration: number;
  }
>(function ContinuityItemRow(props, ref) {
  const item = props.item;
  const [isEditing, setIsEditing] = useState(false);
  return (
    <TableRow
      ref={ref}
      {...props.draggableProps}
      className="[&>td]:m-2 align-top"
    >
      <TableCell
        {...props.dragHandleProps}
        className="text-2xl cursor-grab"
        data-testid="dragHandle"
      >
        ☰
      </TableCell>
      <TableCell className="font-bold text-purple">Continuity</TableCell>
      <TableCell className="font-bold" data-testid="ContinuityItemRow.name">
        {item.name}
      </TableCell>
      <TableCell>
        <ItemMediaStateAndUploadDialog
          item={item}
          onUploadComplete={async (url, fileName) =>
            processUploadForContinuityItem(item.id, fileName, url)
          }
        />
      </TableCell>
      <TableCell data-testid="ContinuityItemRow.time">
        {format(props.time, "HH:mm")}
      </TableCell>
      <TableCell data-testid="ContinuityItemRow.duration">
        {formatDurationMS(props.runningDuration * 1000)}
      </TableCell>
      <TableCell>
        <Popover open={isEditing} onOpenChange={setIsEditing}>
          <PopoverTrigger asChild>
            <Button color="primary">Edit</Button>
          </PopoverTrigger>
          <PopoverContent>
            <Form
              action={editContinuityItem}
              schema={editContinuityItemSchema}
              initialValues={item}
              onSuccess={() => setIsEditing(false)}
              submitLabel="Save"
            >
              <HiddenField name="itemID" value={item.id.toString(10)} />
              <Field name="name" label="Name" />
            </Form>
          </PopoverContent>
        </Popover>
      </TableCell>
      <TableCell>
        <DeleteItemPopover
          showID={props.item.showId}
          itemType="continuity_item"
          itemID={item.id}
        />
      </TableCell>
    </TableRow>
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
        if (!result.destination) {
          return;
        }
        const [type, id] = result.draggableId.split(":");
        doOptimisticMove({
          type,
          id: parseInt(id, 10),
          newIdx: result.destination.index,
        });
        await reorderShowItems(
          props.show.id,
          type as "rundown" | "continuity_item",
          parseInt(id, 10),
          result.destination.index,
        );
      });
    },
    [doOptimisticMove, props.show.id],
  );

  const [rows, durationTotalSeconds] = useMemo(() => {
    const rows = [];
    let time = props.show.start;
    let durationTotalSeconds = 0;
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
                dragHandleProps={provided.dragHandleProps!}
                rundown={item}
                time={itemStartTime}
                runningDuration={duration}
              />
            ) : (
              <ContinuityItemRow
                ref={provided.innerRef}
                draggableProps={provided.draggableProps}
                dragHandleProps={provided.dragHandleProps!}
                item={item}
                time={itemStartTime}
                runningDuration={duration}
              />
            )
          }
        </Draggable>,
      );
      durationTotalSeconds += duration;
      time = new Date(time.getTime() + duration * 1000);
    }
    return [rows, durationTotalSeconds];
  }, [optimisticItems, isPending, props.show.start]);

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        {isPending && (
          <Image src={Spinner} alt="" data-testid="reorderPending" />
        )}
        <Droppable droppableId="0" isDropDisabled={isPending}>
          {(provided, snapshot) => (
            <Table ref={provided.innerRef} {...provided.droppableProps}>
              <TableHeader>
                <TableRow>
                  <TableHead />
                  <TableHead>Type</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead />
                  <TableHead>Start Time</TableHead>
                  <TableHead>Duration</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody data-testid="ShowItemsList.itemsTable">
                {rows}
                {provided.placeholder}
              </TableBody>
              <TableCaption data-testid="ShowItemsList.runtime">
                <strong>Total runtime: </strong>
                {formatDurationMS(durationTotalSeconds * 1000)};{" "}
                <strong>expected finish </strong>
                {format(
                  add(props.show.start, { seconds: durationTotalSeconds }),
                  "HH:mm",
                )}
              </TableCaption>
            </Table>
          )}
        </Droppable>
      </DragDropContext>
      <AddItemButtons showID={props.show.id} />
    </>
  );
}
