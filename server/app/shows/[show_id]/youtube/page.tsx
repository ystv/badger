import { db } from "@/lib/db";
import { enableYoutube } from "@bowser/feature-flags";
import { notFound } from "next/navigation";
import CreateYTStreamsForm from "./form";

export default async function ShowYouTubePage(props: {
  params: { show_id: string };
}) {
  if (!enableYoutube) {
    notFound();
  }
  // FIXME: Check for a connection
  const show = await db.show.findFirst({
    where: {
      id: parseInt(props.params.show_id, 10),
    },
    include: {
      rundowns: {
        include: {
          items: true,
          metadata: {
            include: {
              field: true,
            },
          },
        },
      },
      continuityItems: true,
      metadata: {
        include: {
          field: true,
        },
        orderBy: {
          fieldId: "asc",
        },
      },
    },
  });
  if (!show) {
    notFound();
  }

  return (
    <div>
      <h1>Create YouTube Streams for {show.name}</h1>
      <CreateYTStreamsForm show={show} />
    </div>
  );
}
