import { db } from "@/lib/db";
import { Permission, type Prisma } from "@badger/prisma/client";
import { Pagination } from "@/components/Pagination";
import Link from "next/link";
import Button from "@badger/components/button";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@badger/components/table";
import { DateTime } from "@/components/DateTIme";
import { PermissionGate } from "@/components/PermissionGate";

const PAGE_SIZE = 25;

export default async function ShowsPage(props: {
  searchParams: { page?: string; includePast?: string };
}) {
  const page = props.searchParams.page
    ? parseInt(props.searchParams.page) - 1
    : 0;
  const conditions: Prisma.ShowWithDurationWhereInput = {};
  if (props.searchParams.includePast !== "true") {
    conditions["end"] = {
      gt: new Date(),
    };
  }

  const [shows, total] = await db.$transaction([
    db.showWithDuration.findMany({
      where: conditions,
      take: PAGE_SIZE,
      skip: PAGE_SIZE * page,
      orderBy: {
        // We still need a sort here, even though we sort in the client.
        // This is because the client-side sort is only for the current page.
        start: "desc",
      },
    }),
    db.showWithDuration.count({
      where: conditions,
    }),
  ]);

  return (
    <div>
      <h1 className="text-4xl">Shows</h1>
      <PermissionGate permission={Permission.ManageShows}>
        <Link href="/shows/create">
          <Button color="primary">New Show</Button>
        </Link>
      </PermissionGate>
      {props.searchParams.includePast !== "true" ? (
        <Button color="ghost" asChild>
          <Link href="/?includePast=true">Include shows in the past</Link>
        </Button>
      ) : (
        <Button color="ghost" asChild>
          <Link href="/">Hide shows in the past</Link>
        </Button>
      )}
      <Table>
        <TableBody>
          {shows
            .sort((a, b) => {
              // For shows in the past, we want to sort them in reverse order.
              // For future shows, we want to sort them in the normal order.
              // Essentially, we need to sort them by the (signed)
              // difference between the current date and the show's start date.
              const aDiff = new Date().getTime() - a.end.getTime();
              const bDiff = new Date().getTime() - b.end.getTime();
              return aDiff - bDiff;
            })
            .map((show) => (
              <TableRow key={show.id}>
                <TableCell className="font-bold">{show.name}</TableCell>
                <TableCell>
                  <DateTime val={show.start.toUTCString()} />
                </TableCell>
                <TableCell>
                  <Link href={`/shows/${show.id}`}>
                    <Button color="light">View/Edit</Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <Pagination current={page + 1} total={total} pageSize={PAGE_SIZE} />
    </div>
  );
}
