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
  "#text": z.string(),
  "@_key": z.string(),
  "@_number": z.coerce.number(),
  "@_type": z.literal("Video"),
  "@_title": z.string(),
  "@_shortTitle": z.string(),
  "@_state": z.string(),
  "@_position": z.coerce.number(),
  "@_duration": z.coerce.number(),
  "@_loop": z.string(),
  "@_muted": z.string(),
  "@_volume": z.coerce.number(),
  "@_balance": z.coerce.number(),
  "@_solo": z.string(),
  "@_audiobusses": z.string(),
  "@_meterF1": z.string(),
  "@_meterF2": z.string(),
});
export type VideoObject = z.infer<typeof VideoObject>;

const ListItemObj = z.object({
  "#text": deEscapedString,
  "@_selected": z.string(),
});
const ListItemType = z.union([ListItemObj, deEscapedString]);

export const VideoListObject = z.object({
  list: z
    .object({
      item: ListItemObj.or(z.array(ListItemType)),
    })
    .optional(),
  "#text": z.string(),
  "@_key": z.string(),
  "@_number": z.coerce.number(),
  "@_type": z.literal("VideoList"),
  "@_title": z.string(),
  "@_shortTitle": z.string(),
  "@_state": z.string(),
  "@_position": z.coerce.number(),
  "@_duration": z.coerce.number(),
  "@_loop": z.string(),
  "@_muted": z.string(),
  "@_volume": z.string(),
  "@_balance": z.string(),
  "@_solo": z.string(),
  "@_audiobusses": z.string(),
  "@_meterF1": z.string(),
  "@_meterF2": z.string(),
  "@_gainDb": z.coerce.number(),
  "@_selectedIndex": z.coerce.number(),
});
export type VideoListObject = z.infer<typeof VideoListObject>;

export const AudioFileObject = z.object({
  "#text": z.string(),
  "@_key": z.string(),
  "@_number": z.coerce.number(),
  "@_type": z.literal("AudioFile"),
  "@_title": z.string(),
  "@_shortTitle": z.string(),
  "@_state": z.string(),
  "@_position": z.coerce.number(),
  "@_duration": z.coerce.number(),
  "@_loop": z.string(),
  "@_muted": z.string(),
  "@_volume": z.coerce.number(),
  "@_balance": z.coerce.number(),
  "@_solo": z.string(),
  "@_audiobusses": z.string(),
  "@_meterF1": z.string(),
  "@_meterF2": z.string(),
  "@_gainDb": z.coerce.number(),
});
export type AudioFileObject = z.infer<typeof AudioFileObject>;

export const BlankObject = z.object({
  "#text": z.string(),
  "@_key": z.string(),
  "@_number": z.coerce.number(),
  "@_type": z.literal("Blank"),
  "@_title": z.string(),
  "@_shortTitle": z.string(),
  "@_state": z.string(),
  "@_position": z.coerce.number(),
  "@_duration": z.coerce.number(),
  "@_loop": z.string(),
});
export type BlankObject = z.infer<typeof BlankObject>;

export const VMixRawXMLSchema = z
  .object({
    vmix: z.object({
      version: z.string(),
      edition: z.string(),
      preset: deEscapedString.optional(),
      inputs: z.object({
        input: z.array(
          z.union([
            VideoObject,
            VideoListObject,
            AudioFileObject,
            BlankObject,
            // This one needs to be last, so that the more specific types match first (based on the z.literal on the @_type)
            z.object({
              "#text": z.string(),
              "@_key": z.string(),
              "@_number": z.coerce.number(),
              "@_type": InputType,
              "@_title": z.string(),
              "@_shortTitle": z.string(),
              "@_state": z.string(),
              "@_position": z.coerce.number(),
              "@_duration": z.coerce.number(),
              "@_loop": z.string(),
            }),
          ]),
        ),
      }),
      overlays: z.object({
        overlay: z.array(z.object({ "@_number": z.coerce.number() })),
      }),
      preview: z.number(),
      active: z.number(),
      fadeToBlack: z.string(),
      transitions: z.object({
        transition: z.array(
          z.object({
            "@_number": z.coerce.number(),
            "@_effect": z.string(),
            "@_duration": z.coerce.number(),
          }),
        ),
      }),
      recording: z.string(),
      external: z.string(),
      streaming: z.string(),
      playList: z.string(),
      multiCorder: z.string(),
      fullscreen: z.string(),
      mix: z
        .object({
          preview: z.number(),
          active: z.number(),
          "@_number": z.coerce.number(),
        })
        .optional(),
      audio: z.object({
        master: z.object({
          "@_volume": z.string(),
          "@_muted": z.string(),
          "@_meterF1": z.string(),
          "@_meterF2": z.string(),
          "@_headphonesVolume": z.string(),
        }),
      }),
      dynamic: z.object({
        input1: z.string(),
        input2: z.string(),
        input3: z.string(),
        input4: z.string(),
        value1: z.string(),
        value2: z.string(),
        value3: z.string(),
        value4: z.string(),
      }),
    }),
  })
  .passthrough();
