"use client";

import {
  useReactTable,
  createColumnHelper,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import {
  Asset,
  ContinuityItem,
  Media,
  Rundown,
  RundownItem,
  Show,
} from "@bowser/prisma/types";
import { isAfter } from "date-fns";
import { DateTime } from "@/components/DateTIme";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@bowser/components/table";
import { Checkbox } from "@bowser/components/checkbox";
import Button from "@bowser/components/button";
import { useState, useTransition } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@bowser/components/alert-dialog";
import { archiveMedia, deletMedia } from "./actions";

interface ExtendedRundownItem extends RundownItem {
  rundown: Rundown & {
    show: Show;
  };
}

interface ExtendedAsset extends Asset {
  rundown: Rundown & {
    show: Show;
  };
}

interface ExtendedContinuityItem extends ContinuityItem {
  show: Show;
}

export interface ExtendedMedia extends Media {
  rundownItems: ExtendedRundownItem[];
  continuityItems: ExtendedContinuityItem[];
  assets: ExtendedAsset[];
  rawSize?: number;
  processedSize?: number;
}

const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

const columnHelper = createColumnHelper<ExtendedMedia>();

const columns = [
  columnHelper.display({
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllRowsSelected()}
        onCheckedChange={(v) => table.toggleAllRowsSelected(!!v)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(v) => row.toggleSelected(!!v)}
        aria-label="Select"
      />
    ),
  }),
  columnHelper.accessor("name", {
    header: "Name",
  }),
  columnHelper.accessor("state", {
    header: "State",
  }),
  columnHelper.accessor("rawSize", {
    header: "Raw Size",
    cell: (info) => (info.getValue() ? formatBytes(info.getValue()!) : "n/a"),
  }),
  columnHelper.accessor("processedSize", {
    header: "Processed Size",
    cell: (info) => (info.getValue() ? formatBytes(info.getValue()!) : "n/a"),
  }),
  columnHelper.accessor(
    (row) => [row.rundownItems, row.continuityItems, row.assets].flat().length,
    {
      header: "Uses",
    },
  ),
  columnHelper.accessor(
    (row) =>
      [
        ...row.rundownItems.map((x) => x.rundown.show),
        ...row.assets.map((x) => x.rundown.show),
        ...row.continuityItems.map((x) => x.show),
      ]
        .map((x) => x.start)
        .reduce((a, b) => (isAfter(a, b) ? a : b), new Date(0)),
    {
      header: "Last used",
      cell: (info) => (
        <DateTime val={info.getValue().toUTCString()} format="date" />
      ),
    },
  ),
];

export function MediaTable(props: { data: ExtendedMedia[] }) {
  const [isPending, startTransition] = useTransition();
  const table = useReactTable({
    data: props.data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    enableRowSelection: true,
  });
  const [isArchiveOpen, setArchiveOpen] = useState(false);
  const [isDeletOpen, setDeletOpen] = useState(false);
  return (
    <>
      <div>
        <Button
          color="warning"
          disabled={
            !isPending &&
            !table.getIsSomeRowsSelected() &&
            !table.getIsAllRowsSelected()
          }
          onClick={() => setArchiveOpen(true)}
        >
          Archive Selected
        </Button>
        <Button
          color="danger"
          disabled={
            !isPending &&
            !table.getIsSomeRowsSelected() &&
            !table.getIsAllRowsSelected()
          }
          onClick={() => setDeletOpen(true)}
        >
          Delet Selected
        </Button>
      </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((hg) => (
            <TableRow key={hg.id}>
              {hg.headers.map((hd) => (
                <TableHead key={hd.id}>
                  {hd.isPlaceholder
                    ? null
                    : flexRender(hd.column.columnDef.header, hd.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No media
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <AlertDialog open={isArchiveOpen} onOpenChange={setArchiveOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Archive {table.getSelectedRowModel().rows.length} media?
            </AlertDialogTitle>
            <AlertDialogDescription className="space-y-2">
              <p>
                This will delete the processed media files, while keeping the
                raw version. They can be reprocessed later.
              </p>
              <p>The following files will be archived:</p>
              <ul>
                {table.getSelectedRowModel().rows.map((x) => (
                  <li key={x.original.id}>{x.original.name}</li>
                ))}
              </ul>
              {table
                .getSelectedRowModel()
                .rows.some(
                  (x) =>
                    x.original.assets.length > 0 &&
                    x.original.rundownItems.length === 0 &&
                    x.original.continuityItems.length === 0,
                ) && (
                <p>
                  <strong>Some of the media are used only by assets.</strong>{" "}
                  These currently cannot be reprocessed. You will need to
                  reupload them.
                </p>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() =>
                startTransition(async () => {
                  await archiveMedia(
                    table.getSelectedRowModel().rows.map((x) => x.original.id),
                  );
                })
              }
              disabled={isPending}
            >
              Archive
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog open={isDeletOpen} onOpenChange={setDeletOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>You sure boss?</AlertDialogTitle>
            <AlertDialogDescription className="space-y-2">
              <p>
                This will delet the media files.{" "}
                <strong>This cannot be undone.</strong>
              </p>
              <p>The following files will be delet:</p>
              <ul>
                {table.getSelectedRowModel().rows.map((x) => (
                  <li key={x.original.id}>{x.original.name}</li>
                ))}
              </ul>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() =>
                startTransition(async () => {
                  await deletMedia(
                    table.getSelectedRowModel().rows.map((x) => x.original.id),
                  );
                })
              }
              disabled={isPending}
            >
              Delet
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
