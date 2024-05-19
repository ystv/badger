"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "@badger/components/dropdown-menu";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@badger/components/table";
import { BaseJob } from "@badger/prisma/client";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { format } from "date-fns";
import { Button } from "@badger/components/button";
import { LuMoreHorizontal } from "react-icons/lu";
import { doResetJob } from "./actions";

const ch = createColumnHelper<BaseJob>();
const columns = [
  ch.accessor("id", {
    header: "Base Job ID",
  }),
  ch.accessor("state", {
    header: "State",
  }),
  ch.accessor("createdAt", {
    header: "Created At",
    cell: ({ getValue }) => format(new Date(getValue()), "yyyy-MM-dd HH:mm:ss"),
  }),
  ch.accessor("startedAt", {
    header: "Started At",
    cell: ({ getValue }) => {
      const v = getValue();
      if (v) {
        return format(new Date(v), "yyyy-MM-dd HH:mm:ss");
      }
      return "Never";
    },
  }),
  ch.accessor("completedAt", {
    header: "Completed At",
    cell: ({ getValue }) => {
      const v = getValue();
      if (v) {
        return format(new Date(v), "yyyy-MM-dd HH:mm:ss");
      }
      return "Never";
    },
  }),
  ch.accessor("workerId", {
    header: "Worker",
  }),
  ch.accessor(
    (row) => {
      if (row.externalJobProvider) {
        if (row.externalJobID) {
          return `${row.externalJobProvider} (${row.externalJobID})`;
        }
        return row.externalJobProvider;
      }
      return "";
    },
    {
      id: "executor",
      header: "Executor",
    },
  ),
  ch.accessor("jobType", {
    id: "type",
    header: "Job Type",
  }),
  ch.display({
    id: "actions",
    cell: ({ row }) => {
      const job = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button color="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <LuMoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={async () => {
                if (
                  confirm(
                    `Are you sure you want to reset job ${job.id}? Note that this will not stop any Jobrunner that may be running it.`,
                  )
                ) {
                  await doResetJob(job.id);
                }
              }}
            >
              Reset
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  }),
];

export function JobsDataTable(props: { data: BaseJob[] }) {
  const table = useReactTable({
    columns,
    data: props.data,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md border mx-[-50%] mt-8">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
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
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
