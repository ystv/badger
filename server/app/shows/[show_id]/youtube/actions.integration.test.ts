import { db } from "@/lib/db";
import { test, vi, beforeEach, expect, it } from "vitest";
import { doCreateStreams } from "./actions";
import { integrate } from "@bowser/testing";
import { youtube_v3 } from "googleapis";
import { Show } from "@bowser/prisma/client";

vi.mock("server-only", () => ({}));
vi.mock("next/cache", () => ({ revalidatePath: () => {} }));
vi.mock("@/lib/auth", () => ({
  checkSession: () => Promise.resolve({}),
}));
vi.mock("@/lib/connections", async () => {
  const actual =
    await vi.importActual<typeof import("@/lib/connections")>(
      "@/lib/connections",
    );
  return {
    ...actual,
    getConnectionAccessToken: () => "GOOGLE_ACCESS_TOKEN",
  };
});
vi.mock("googleapis", async () => {
  const Youtube = vi.fn();

  let streamID = 0;
  let broadcastID = 0;

  Youtube.prototype.liveStreams = {
    insert: vi.fn(() => ({
      data: {
        id: "test-stream-" + streamID++,
      },
    })),
  };
  Youtube.prototype.liveBroadcasts = {
    insert: vi.fn(() => ({
      data: {
        id: "test-broadcast-" + broadcastID++,
      },
    })),
    bind: vi.fn(),
  };

  return { youtube_v3: { Youtube } };
});

const TEST_TIME = new Date("2023-07-21T16:46:35.036Z");

integrate("youtube/doCreateStreams", async () => {
  let testShow: Show;
  beforeEach(async () => {
    await Promise.all(
      ["shows", "metadata"].map((table) =>
        db.$executeRawUnsafe(`DELETE FROM ${table}`),
      ),
    );
    testShow = await db.show.create({
      data: {
        name: "Test Show",
        start: TEST_TIME,
        rundowns: {
          createMany: {
            data: [
              {
                name: "Test 1",
                order: 0,
              },
            ],
          },
        },
        continuityItems: {
          createMany: {
            data: [
              {
                name: "Test 2",
                durationSeconds: 0,
                order: 1,
              },
            ],
          },
        },
      },
    });
  });

  it("works", async () => {
    await doCreateStreams({
      show_id: testShow.id,
      resolution: "1080p",
      frameRate: "30fps",
      ingestionType: "rtmp",
      items: [
        {
          title: "Test Show",
          description: "",
          start: TEST_TIME,
          end: TEST_TIME,
          enabled: true,
          visibility: "public",
          isShowBroadcast: true,
        },
        {
          title: "Test 1",
          description: "",
          start: TEST_TIME,
          end: TEST_TIME,
          enabled: true,
          visibility: "public",
          rundownID: 1,
        },
        {
          title: "Test 2",
          description: "",
          start: TEST_TIME,
          end: TEST_TIME,
          enabled: false,
          visibility: "public",
          continuityItemID: 1,
        },
      ],
    });
    const yt = vi.mocked(youtube_v3.Youtube).mock.instances[0];
    expect(yt.liveStreams.insert).toHaveBeenCalled();
    expect(
      vi.mocked(yt.liveStreams.insert).mock.lastCall![0],
    ).toMatchSnapshot();

    expect(yt.liveBroadcasts.insert).toHaveBeenCalledTimes(2);
    expect(
      vi.mocked(yt.liveBroadcasts.insert).mock.calls[0][0],
    ).toMatchSnapshot();
    expect(
      vi.mocked(yt.liveBroadcasts.bind).mock.calls[0][0],
    ).toMatchSnapshot();
    expect(
      vi.mocked(yt.liveBroadcasts.insert).mock.calls[1][0],
    ).toMatchSnapshot();
    expect(
      vi.mocked(yt.liveBroadcasts.bind).mock.calls[1][0],
    ).toMatchSnapshot();

    const dbShow = await db.show.findFirstOrThrow({
      where: { id: 1 },
      include: { rundowns: true, continuityItems: true },
    });
    expect(dbShow.ytStreamID).toEqual("test-stream-0");
    expect(dbShow.ytBroadcastID).toEqual("test-broadcast-0");
    expect(dbShow.rundowns[0].ytBroadcastID).toEqual("test-broadcast-1");
    expect(dbShow.continuityItems[0].ytBroadcastID).toBeNull();
  });
});
