"use server";

import { db } from "@/lib/db";
import { youtube_v3 } from "googleapis";
import { z } from "zod";
import { createStreamsPayloadSchema } from "./schema";
import { FormResponse } from "@/components/Form";
import { checkSession, requirePermission } from "@/lib/auth";
import { ConnectionTarget } from "@badger/prisma/client";
import { redirect } from "next/navigation";
import invariant from "@/lib/invariant";
import {
  getConnectionAccessToken,
  makeGoogleOauthClient,
} from "@/lib/connections";
import { revalidatePath } from "next/cache";

export async function doCreateStreams(
  dataRaw: z.infer<typeof createStreamsPayloadSchema>,
): Promise<FormResponse> {
  requirePermission("ManageYouTubeStreams");
  const data = createStreamsPayloadSchema.parse(dataRaw);
  const me = await checkSession();
  invariant(me, "no current user");

  const token = await getConnectionAccessToken(ConnectionTarget.google, me.id);
  if (!token) {
    redirect("/connect/google");
  }
  const client = makeGoogleOauthClient();
  client.setCredentials({
    access_token: token,
  });

  const yt = new youtube_v3.Youtube({
    auth: client,
  });

  let streamID: string;
  await db.$transaction(async ($db) => {
    // Lock the row for the duration of this transaction
    await $db.$queryRaw`SELECT id FROM shows WHERE id = ${data.show_id} FOR UPDATE`;
    const show = await $db.show.findUniqueOrThrow({
      where: {
        id: data.show_id,
      },
      include: {
        rundowns: true,
        continuityItems: true,
      },
    });

    // Create the stream
    if (show.ytStreamID) {
      console.log("Using existing stream", show.ytStreamID);
      streamID = show.ytStreamID;
    } else {
      const stream = await yt.liveStreams.insert({
        part: ["id", "snippet", "cdn"],
        requestBody: {
          snippet: {
            title: show.name,
          },
          cdn: {
            ingestionType: data.ingestionType,
            resolution: data.resolution,
            frameRate: data.frameRate,
          },
        },
      });
      await $db.show.update({
        where: {
          id: show.id,
        },
        data: {
          ytStreamID: stream.data.id!,
        },
      });
      streamID = stream.data.id!;
    }

    return show;
  });

  // Now create the broadcasts
  // NB: we wrap each one in an individual transaction.
  // This is because it's possible that one YouTube operation succeeds but another
  // fails, and we want to ensure that the broadcast/stream IDs get set even
  // if a later operation fails.
  for (const item of data.items) {
    if (!item.enabled) {
      continue;
    }
    await db.$transaction(async ($db) => {
      // await $db.$queryRaw`SELECT id FROM shows WHERE id = ${data.show_id} FOR UPDATE`;
      const show = await $db.show.findUniqueOrThrow({
        where: {
          id: data.show_id,
        },
        include: {
          rundowns: true,
          continuityItems: true,
        },
      });
      if (item.rundownID) {
        const rd = show.rundowns.find((x) => x.id === item.rundownID);
        if (rd?.ytBroadcastID?.length) {
          console.log("Skipping broadcast creation for rundown", rd.id);
          return;
        }
      } else if (item.continuityItemID) {
        const ci = show.continuityItems.find(
          (x) => x.id === item.continuityItemID,
        );
        if (ci?.ytBroadcastID?.length) {
          console.log("Skipping broadcast creation for continuity item", ci.id);
          return;
        }
      } else if (item.isShowBroadcast) {
        if (show.ytBroadcastID?.length) {
          console.log("Skipping broadcast creation for show", show.id);
          return;
        }
      }

      const broadcast = await yt.liveBroadcasts.insert({
        part: ["id", "snippet", "status", "contentDetails"],
        requestBody: {
          snippet: {
            title: item.title,
            description: item.description,
            scheduledStartTime: item.start.toISOString(),
            scheduledEndTime: item.end.toISOString(),
          },
          status: {
            privacyStatus: item.visibility,
            selfDeclaredMadeForKids: false,
          },
          contentDetails: {
            enableAutoStart: false,
            enableAutoStop: false,
            enableClosedCaptions: true,
            enableDvr: true,
            enableEmbed: data.enableEmbed,
            recordFromStart: true,
          },
        },
      });
      // TODO[BDGR-132]: Set thumbnail
      // await yt.thumbnails.set({
      //   videoId: broadcast.data.id!,
      //   media: {
      //     mimeType: "image/jpeg",
      //     body: item.thumbnail,
      //   }
      // });
      await yt.liveBroadcasts.bind({
        id: broadcast.data.id!,
        part: ["id"],
        streamId: streamID,
      });
      if (item.rundownID) {
        await db.rundown.update({
          where: {
            id: item.rundownID,
          },
          data: {
            ytBroadcastID: broadcast.data.id!,
          },
        });
      } else if (item.continuityItemID) {
        await db.continuityItem.update({
          where: {
            id: item.continuityItemID,
          },
          data: {
            ytBroadcastID: broadcast.data.id!,
          },
        });
      } else if (item.isShowBroadcast) {
        await db.show.update({
          where: {
            id: show.id,
          },
          data: {
            ytBroadcastID: broadcast.data.id!,
          },
        });
      }
    });
  }

  revalidatePath(`/shows/${data.show_id}/youtube`);
  return { ok: true };
}
