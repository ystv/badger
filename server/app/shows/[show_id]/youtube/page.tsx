import { db } from "@/lib/db";
import { enableYoutube } from "@bowser/feature-flags";
import { notFound, redirect } from "next/navigation";
import CreateYTStreamsForm from "./form";
import { getSetting } from "@/lib/settingsValues";
import { ConnectionTarget } from "@bowser/prisma/client";
import { checkSession, requirePermission } from "@/lib/auth";
import { getPresignedURL } from "@/lib/s3";
import invariant from "@/lib/invariant";

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

  const [titleFieldID, descFieldID, thumbFieldID] = await Promise.all([
    getSetting("TitleMetadataID"),
    getSetting("DescriptionMetadataID"),
    getSetting("ThumbnailMetadataID"),
  ]);

  const thumbs = {
    continuityItems: {} as Record<number, string>,
    rundowns: {} as Record<number, string>,
  };

  if (typeof thumbFieldID === "number" && thumbFieldID > 0) {
    const thumbMetas = await db.metadata.findMany({
      where: {
        fieldId: thumbFieldID,
        OR: [
          {
            rundownId: {
              in: show.rundowns.map((x) => x.id),
            },
          },
          {
            showId: show.id,
          },
        ],
      },
      include: {
        media: true,
      },
    });
    for (const meta of thumbMetas) {
      invariant(meta.media, "no media");
      if (meta.media.state !== "Ready") {
        continue;
      }
      invariant(meta.media.path, "no path for processed media");
      const url = await getPresignedURL(meta.media.path);
      if (meta.rundownId) {
        thumbs.rundowns[meta.rundownId] = url;
      } else if (meta.showId === show.id) {
        thumbs.continuityItems[meta.showId] = url;
      }
    }
  }

  return (
    <div>
      <h1>Create YouTube Streams for {show.name}</h1>
      <CreateYTStreamsForm
        show={show}
        titleFieldID={titleFieldID}
        descFieldID={descFieldID}
        thumbnailURLs={thumbs}
      />
    </div>
  );
}
