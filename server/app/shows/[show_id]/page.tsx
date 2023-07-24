import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import dayjs from "dayjs";
import { RundownOrContinuity } from "./types";
import { ShowItemsList } from "./ShowItemsList";
import { TusEndpointProvider } from "@/components/MediaUpload";
import { getTusEndpoint } from "@/lib/tus";

export default async function ShowPage(props: { params: { show_id: string } }) {
  const show = await db.show.findFirst({
    where: {
      id: parseInt(props.params.show_id, 10),
    },
    include: {
      rundowns: {
        include: {
          items: true,
        },
      },
      continuityItems: {
        include: {
          media: {
            include: {
              tasks: true,
            },
          },
        },
      },
    },
  });
  if (!show) {
    notFound();
  }
  const items: RundownOrContinuity[] = (
    show.rundowns.map((r) => ({
      ...r,
      _type: "rundown",
    })) as RundownOrContinuity[]
  )
    .concat(
      show.continuityItems.map((c) => ({ ...c, _type: "continuity_item" })),
    )
    .sort((a, b) => a.order - b.order);
  return (
    <>
      <p>Start: {dayjs(show.start).format("YYYY-MM-DD HH:mm")}</p>
      <TusEndpointProvider value={getTusEndpoint()}>
        <ShowItemsList show={show} items={items} />
      </TusEndpointProvider>
    </>
  );
}
