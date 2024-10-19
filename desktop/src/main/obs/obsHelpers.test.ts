import { vi, describe, test, expect, beforeEach, afterEach } from "vitest";
import { addOrReplaceMediaAsScene, findScenes, MediaType } from "./obsHelpers";
import { MockOBSConnection } from "./__mocks__/obs";

vi.mock("./obs");
vi.mock("../media/mediaManagement", () => ({
  getLocalMedia: () => [
    {
      mediaID: 1,
      path: "TEST_PATH",
    },
  ],
}));
vi.mock("../base/selectedShow", async () => {
  const { BehaviorSubject } = await import("rxjs");
  return {
    selectedShow: new BehaviorSubject({
      id: 1,
      name: "Test",
      start: new Date(),
      rundowns: [],
      continuityItems: [],
      version: 1,
      ytBroadcastID: null,
      ytStreamID: null,
    }),
  };
});

describe("addOrReplaceMediaAsScene", () => {
  const testMedia: MediaType = {
    id: 1,
    name: "Test.mp4",
    state: "Ready",
    path: "",
    durationSeconds: 15,
    rawPath: "",
    containerType: "continuityItem",
    containerId: 1,
    containerName: "Test Continuity",
    order: 1,
  };
  let mobs: MockOBSConnection;
  beforeEach(async () => {
    mobs = (await import("./obs"))
      .obsConnection as unknown as MockOBSConnection;
  });
  afterEach(() => {
    mobs._reset();
  });

  test("add with no scenes", async () => {
    const res = await addOrReplaceMediaAsScene(testMedia, "none");
    expect(res).toEqual({
      done: true,
      warnings: [],
    });
    expect(mobs.scenes).toMatchInlineSnapshot(`
      [
        {
          "name": "1 - Test Continuity [Continuity #1]",
          "sources": [
            {
              "inputKind": "ffmpeg_source",
              "inputName": "Badger Media 1",
              "sceneItemId": 1,
            },
          ],
        },
      ]
    `);
  });

  test("no change", async () => {
    mobs.scenes.push({
      name: "1 - Test Continuity [Continuity #1]",
      sources: [
        {
          inputKind: "ffmpeg_source",
          inputName: "Badger Media 1",
          sceneItemId: 1,
        },
      ],
    });
    const res = await addOrReplaceMediaAsScene(testMedia, "none");
    expect(res).toEqual({
      done: false,
      warnings: [],
    });
    expect(mobs.scenes).toMatchSnapshot();
  });

  test("add to existing empty scene", async () => {
    mobs.scenes.push({
      name: "1 - Test Continuity [Continuity #1]",
      sources: [],
    });
    const res = await addOrReplaceMediaAsScene(testMedia, "none");
    expect(res).toEqual({
      done: true,
      warnings: [],
    });
    expect(mobs.scenes[0].sources).toHaveLength(1);
    expect(mobs.scenes).toMatchSnapshot();
  });

  test("replace in pre-existing scene with new media ID", async () => {
    mobs.scenes.push({
      name: "1 - Test Continuity [Continuity #1]",
      sources: [
        {
          inputKind: "ffmpeg_source",
          inputName: "Badger Media 999",
          sceneItemId: 1,
        },
      ],
    });
    const res = await addOrReplaceMediaAsScene(testMedia, "none");
    expect(res).toMatchInlineSnapshot(`
      {
        "done": false,
        "promptReplace": "replace",
        "warnings": [
          "Scene 1 - Test Continuity [Continuity #1] has a pre-existing Badger source for a different media file.",
        ],
      }
    `);
    expect(mobs.scenes[0].sources[0].inputName).toBe("Badger Media 999");

    const res2 = await addOrReplaceMediaAsScene(testMedia, "replace");
    expect(res2).toEqual({
      done: true,
      warnings: [],
    });
    expect(mobs.scenes).toMatchSnapshot();
    expect(mobs.scenes[0].sources[0].inputName).toBe("Badger Media 1");
  });

  test("non-Badger sources present", async () => {
    mobs.scenes.push({
      name: "1 - Test Continuity [Continuity #1]",
      sources: [
        {
          inputKind: "ffmpeg_source",
          inputName: "Badger Media 999",
          sceneItemId: 1,
        },
        {
          inputKind: "text_ft2_source_v2",
          inputName: "Text",
          sceneItemId: 2,
        },
      ],
    });
    const res = await addOrReplaceMediaAsScene(testMedia, "none");
    expect(res).toMatchInlineSnapshot(`
      {
        "done": false,
        "promptReplace": "force",
        "warnings": [
          "Scene 1 - Test Continuity [Continuity #1] has non-Badger sources in it. Cowardly refusing to overwrite.",
        ],
      }
    `);

    const res2 = await addOrReplaceMediaAsScene(testMedia, "force");
    expect(res2).toEqual({
      done: true,
      warnings: [],
    });
    expect(mobs.scenes).toMatchSnapshot();
    expect(mobs.scenes[0].sources).toHaveLength(1);
    expect(mobs.sourceSettings).toMatchSnapshot();
  });
});

describe("findContinuityScenes", () => {
  let mobs: MockOBSConnection;
  beforeEach(async () => {
    mobs = (await import("./obs"))
      .obsConnection as unknown as MockOBSConnection;
  });
  afterEach(() => {
    mobs._reset();
  });
  test("empty", async () => {
    expect(await findScenes()).toHaveLength(0);
  });
  test("one with no media", async () => {
    mobs.scenes.push({
      name: "1 - Test [#1]",
      sources: [],
    });
    const res = await findScenes();
    expect(res).toHaveLength(1);
    expect(res).toMatchInlineSnapshot(`
      [
        {
          "itemId": 1,
          "sceneName": "1 - Test [#1]",
          "sources": [],
          "type": "rundownItem",
        },
      ]
    `);
  });
  test("one with media", async () => {
    mobs.scenes.push({
      name: "1 - Test [#1]",
      sources: [
        {
          inputName: "media",
          inputKind: "ffmpeg_source",
          sceneItemId: 1,
        },
      ],
    });
    const res = await findScenes();
    expect(res).toHaveLength(1);
    expect(res[0].sources).toHaveLength(1);
    expect(res[0].sources[0]).toMatchInlineSnapshot(`
      {
        "inputKind": "ffmpeg_source",
        "isGroup": null,
        "sceneItemBlendMode": "OBS_BLEND_NORMAL",
        "sceneItemEnabled": true,
        "sceneItemId": 1,
        "sceneItemIndex": 0,
        "sceneItemLocked": false,
        "sceneItemTransform": null,
        "sourceName": "media",
        "sourceType": "input",
      }
    `);
  });
});
