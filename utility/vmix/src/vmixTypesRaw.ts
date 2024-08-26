import { z } from "zod";

/*
 * This file is an implementation detail of VMixConnection.getFullState().
 * Unless you are parsing the vMix XML, you probably want vmixTypes.ts instead.
 */

const InputType = z
  .enum([
    "Mix",
    "Colour",
    "VideoList",
    "Video",
    "Image",
    "AudioFile",
    "Blank",
  ] as const)
  .or(z.string());

/**
 * vMix backslash-escapes its strings, even though backslash is valid in XML. This removes that layer of escaping.
 */
const deEscapedString = z.string().transform((v) => v.replace(/\\\\/g, "\\"));

export const VideoObject = z.object({
  _attributes: z.object({
    key: z.string(),
    number: z.coerce.number(),
    type: z.string(),
    title: z.string(),
    shortTitle: z.string(),
    state: z.string(),
    position: z.coerce.number(),
    duration: z.coerce.number(),
    loop: z.string(),
    muted: z.string(),
    volume: z.coerce.number(),
    balance: z.coerce.number(),
    solo: z.string(),
    audiobusses: z.string(),
    meterF1: z.string(),
    meterF2: z.string(),
  }),
  _text: z.string(),
});
export type VideoObject = z.infer<typeof VideoObject>;

const ListItemObj = z.object({
  _attributes: z.object({ selected: z.string() }).optional(),
  _text: deEscapedString,
});
const ListItemType = z.union([ListItemObj, deEscapedString]);

export const VideoListObject = z.object({
  _attributes: z.object({
    key: z.string(),
    number: z.coerce.number(),
    type: z.literal("VideoList"),
    title: z.string(),
    shortTitle: z.string(),
    state: z.string(),
    position: z.coerce.number(),
    duration: z.coerce.number(),
    loop: z.string(),
    muted: z.string(),
    volume: z.string(),
    balance: z.string(),
    solo: z.string(),
    audiobusses: z.string(),
    meterF1: z.string(),
    meterF2: z.string(),
    gainDb: z.coerce.number(),
    selectedIndex: z.coerce.number(),
  }),
  _text: z.string(),
  list: z.object({
    item: z.array(ListItemObj).or(ListItemObj),
  }),
});
export type VideoListObject = z.infer<typeof VideoListObject>;

export const AudioFileObject = z.object({
  _attributes: z.object({
    key: z.string(),
    number: z.coerce.number(),
    type: z.literal("AudioFile"),
    title: z.string(),
    shortTitle: z.string(),
    state: z.string(),
    position: z.coerce.number(),
    duration: z.coerce.number(),
    loop: z.string(),
    muted: z.string(),
    volume: z.coerce.number(),
    balance: z.coerce.number(),
    solo: z.string(),
    audiobusses: z.string(),
    meterF1: z.string(),
    meterF2: z.string(),
    gainDb: z.coerce.number(),
  }),
  _text: z.string(),
});
export type AudioFileObject = z.infer<typeof AudioFileObject>;

export const BlankObject = z.object({
  _text: z.string(),
  _attributes: z.object({
    key: z.string(),
    number: z.coerce.number(),
    type: z.literal("Blank"),
    title: z.string(),
    shortTitle: z.string(),
    state: z.string(),
    position: z.coerce.number(),
    duration: z.coerce.number(),
    loop: z.string(),
  }),
});
export type BlankObject = z.infer<typeof BlankObject>;

export const VMixRawXMLSchema = z
  .object({
    vmix: z.object({
      version: z.object({ _text: z.string() }),
      edition: z.object({ _text: z.string() }),
      preset: z.object({ _text: deEscapedString }).optional(),
      inputs: z.object({
        input: z.array(
          z.union([
            VideoObject,
            VideoListObject,
            AudioFileObject,
            BlankObject,
            z.object({
              _attributes: z.object({
                key: z.string(),
                number: z.coerce.number(),
                type: InputType.or(z.string()),
                title: z.string(),
                shortTitle: z.string(),
                state: z.string(),
                position: z.coerce.number(),
                duration: z.coerce.number(),
                loop: z.string(),
              }),
              _text: z.string(),
            }),
          ]),
        ),
      }),
      overlays: z.object({
        overlay: z.array(
          z.object({ _attributes: z.object({ number: z.coerce.number() }) }),
        ),
      }),
      preview: z.object({ _text: z.string() }),
      active: z.object({ _text: z.string() }),
      fadeToBlack: z.object({ _text: z.string() }),
      transitions: z.object({
        transition: z.array(
          z.object({
            _attributes: z.object({
              number: z.coerce.number(),
              effect: z.string(),
              duration: z.coerce.number(),
            }),
          }),
        ),
      }),
      recording: z.object({ _text: z.string() }),
      external: z.object({ _text: z.string() }),
      streaming: z.object({ _text: z.string() }),
      playList: z.object({ _text: z.string() }),
      multiCorder: z.object({ _text: z.string() }),
      fullscreen: z.object({ _text: z.string() }),
      mix: z
        .object({
          _attributes: z.object({ number: z.string() }),
          preview: z.object({ _text: z.string() }),
          active: z.object({ _text: z.string() }),
        })
        .optional(),
      audio: z.object({
        master: z.object({
          _attributes: z.object({
            volume: z.string(),
            muted: z.string(),
            meterF1: z.string(),
            meterF2: z.string(),
            headphonesVolume: z.string(),
          }),
        }),
      }),
      dynamic: z
        .object({
          input1: z.object({}),
          input2: z.object({}),
          input3: z.object({}),
          input4: z.object({}),
          value1: z.object({}),
          value2: z.object({}),
          value3: z.object({}),
          value4: z.object({}),
        })
        .optional(),
    }),
  })
  .passthrough();
