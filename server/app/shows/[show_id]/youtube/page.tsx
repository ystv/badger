import { db } from "@/lib/db";
import { enableYoutube } from "@badger/feature-flags";
import { notFound, redirect } from "next/navigation";
import CreateYTStreamsForm from "./form";
import { getSetting } from "@/lib/settingsValues";
import { ConnectionTarget } from "@badger/prisma/client";
import { checkSession, requirePermission } from "@/lib/auth";

export default async function ShowYouTubePage(props: {
  params: { show_id: string };
}) {
  if (!enableYoutube) {
    notFound();
  }
  requirePermission("ManageYouTubeStreams");

  const me = await checkSession();

  const conn = await db.connection.findFirst({
    where: {
      target: ConnectionTarget.google,
      userId: me?.id,
    },
  });
  if (!conn) {
    redirect("/connect/google");
  }

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

  const [titleFieldID, descFieldID] = await Promise.all([
    getSetting("TitleMetadataID"),
    getSetting("DescriptionMetadataID"),
  ]);

  return (
    <div>
      <h1>Create YouTube Streams for {show.name}</h1>
      <CreateYTStreamsForm
        show={show}
        titleFieldID={titleFieldID}
        descFieldID={descFieldID}
      />
    </div>
  );
}
