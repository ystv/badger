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
import { getSetting } from "@/lib/settings";

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
  console.log(data);
  const show = await db.show.findUniqueOrThrow({
    where: {
      id: data.show_id,
    },
  });

  const token = await getAccessTokenForCurrentUser();

  const oauth = new OAuth2Client({
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  });
  oauth.setCredentials({
    access_token: token,
  });

  const yt = new youtube_v3.Youtube({
    auth: oauth,
  });

  // Create the stream
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
  // Now create the broadcasts
  for (const item of data.items) {
    if (!item.enabled) {
      continue;
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
          enableEmbed: true,
          recordFromStart: true,
        },
      },
    });
    // await yt.thumbnails.set({
    //   videoId: broadcast.data.id!,
    //   media: {
    //     mimeType: "image/jpeg",
    //     body: item.thumbnail, // FIXME
    //   }
    // });
    await yt.liveBroadcasts.bind({
      id: broadcast.data.id!,
      part: ["id"],
      streamId: stream.data.id!,
    });
  }
  // TODO[BOW-12]: Store the broadcast/stream IDs
  return { ok: true };
}
