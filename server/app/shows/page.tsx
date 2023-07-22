import { db } from "@/lib/db";
import { Pagination } from "@/components/Pagination";
import Link from "next/link";
import { Fragment } from "react";
import dayjs from "dayjs";

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
      <h1>Shows</h1>
      <Link href="/shows/create">New Show</Link>
      <div className="grid grid-cols-3">
        {shows.map((show) => (
          <Fragment key={show.id}>
            <span>{show.name}</span>
            <span>{dayjs(show.start).format("YYYY-MM-DD HH:mm")}</span>
            <Link href={`/shows/${show.id}`}>Edit</Link>
          </Fragment>
        ))}
      </div>
      <Pagination current={page + 1} total={total} pageSize={PAGE_SIZE} />
    </div>
  );
}
