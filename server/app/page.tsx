import { db } from "@/lib/db";
import { Pagination } from "@/components/Pagination";
import Link from "next/link";
import { Fragment } from "react";
import dayjs from "dayjs";
import Button from "@bowser/components/button";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@bowser/components/table";

const PAGE_SIZE = 25;

export default async function ShowsPage(props: {
  searchParams: { page?: string };
}) {
  const page = props.searchParams.page
    ? parseInt(props.searchParams.page) - 1
    : 0;
  const conditions = {
    start: {
      gt: new Date(),
    },
  };
  const [shows, total] = await db.$transaction([
    db.show.findMany({
      where: conditions,
      take: PAGE_SIZE,
      skip: PAGE_SIZE * page,
    }),
    db.show.count({
      where: conditions,
    }),
  ]);

  return (
    <div>
      <h1 className="text-4xl">Shows</h1>
      <Link href="/shows/create">
        <Button color="primary">New Show</Button>
      </Link>
      <Table>
        <TableBody>
          {shows.map((show) => (
            <TableRow key={show.id}>
              <TableCell className="font-bold">{show.name}</TableCell>
              <TableCell>
                {dayjs(show.start).format("YYYY-MM-DD HH:mm")}
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
