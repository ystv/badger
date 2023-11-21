"use server";

import { db } from "@/lib/db";
import { youtube_v3 } from "googleapis";
import { z } from "zod";
import { createStreamsPayloadSchema } from "./schema";
import { FormResponse } from "@/components/Form";
import { checkSession } from "@/lib/auth";
import { cookies } from "next/headers";
import { OAuth2Client } from "google-auth-library";
import { ConnectionTarget } from "@bowser/prisma/client";
import { redirect } from "next/navigation";
import invariant from "@/lib/invariant";
import {
  getConnectionAccessToken,
  makeGoogleOauthClient,
} from "@/lib/connections";

async function getAccessTokenForCurrentUser() {
  // If we already have an access token in cookies, use that
  const cookie = await cookies().get("google_access_token");
  if (cookie?.value) {
    return cookie.value;
  }
  // Now check if we already have a refresh token, and if so, use that to get an access token.
  const user = await checkSession();
  const connection = await db.connection.findFirst({
    where: {
      target: ConnectionTarget.google,
      userId: user!.id,
    },
  });
  if (!connection) {
    // Damn and blast.
    redirect("/connect/google");
  }

  const client = new OAuth2Client({
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    redirectUri: process.env.GOOGLE_CONNECT_REDIRECT_URI!,
    credentials: {
      refresh_token: connection.refreshToken,
    },
  });
  const accessToken = await client.getAccessToken();
  invariant(accessToken.token, "failed to refresh token");
  await cookies().set("google_access_token", accessToken.token, {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    expires: new Date(Date.now() + 60 * 60 * 1000),
    sameSite: "strict",
  });
  return accessToken.token;
}

export async function doCreateStreams(
  dataRaw: z.infer<typeof createStreamsPayloadSchema>,
): Promise<FormResponse> {
  const data = createStreamsPayloadSchema.parse(dataRaw);
  const me = await checkSession();
  invariant(me, "no current user");

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

    const token = await getConnectionAccessToken(
      ConnectionTarget.google,
      me.id,
    );
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
    console.log(yt);

    // Create the stream
    let streamID;
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
    // Now create the broadcasts
    for (const item of data.items) {
      if (!item.enabled) {
        continue;
      }
      if (item.rundownID) {
        const rd = show.rundowns.find((x) => x.id === item.rundownID);
        if (rd?.ytBroadcastID?.length) {
          console.log("Skipping broadcast creation for rundown", rd.id);
          continue;
        }
      } else if (item.continuityItemID) {
        const ci = show.continuityItems.find(
          (x) => x.id === item.continuityItemID,
        );
        if (ci?.ytBroadcastID?.length) {
          console.log("Skipping broadcast creation for continuity item", ci.id);
          continue;
        }
      } else if (item.isShowBroadcast) {
        if (show.ytBroadcastID?.length) {
          console.log("Skipping broadcast creation for show", show.id);
          continue;
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
      // TODO[BOW-132]: Set thumbnail
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
        await $db.rundown.update({
          where: {
            id: item.rundownID,
          },
          data: {
            ytBroadcastID: broadcast.data.id!,
          },
        });
      } else if (item.continuityItemID) {
        await $db.continuityItem.update({
          where: {
            id: item.continuityItemID,
          },
          data: {
            ytBroadcastID: broadcast.data.id!,
          },
        });
      } else if (item.isShowBroadcast) {
        await $db.show.update({
          where: {
            id: show.id,
          },
          data: {
            ytBroadcastID: broadcast.data.id!,
          },
        });
      }
    }
  });

  return { ok: true };
}
