import { z } from "zod";

/*
 * This file is an implementation detail of VMixConnection.getFullState().
 * Unless you are parsing the vMix XML, you probably want vmixTypes.ts instead.
 */

const InputType = z
  .enum(["Mix", "Colour", "VideoList", "Video", "Image", "AudioFile"] as const)
  .or(z.string());

export const VideoObject = z
  .object({
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
    "@_muted": z.string(),
    "@_volume": z.coerce.number(),
    "@_balance": z.coerce.number(),
    "@_solo": z.string(),
    "@_audiobusses": z.string(),
    "@_meterF1": z.string(),
    "@_meterF2": z.string(),
  })
  .passthrough();
export type VideoObject = z.infer<typeof VideoObject>;

const ListItemObj = z.object({ "#text": z.string(), "@_selected": z.string() });
const ListItemType = z.union([ListItemObj, z.string()]);

export const VideoListObject = z
  .object({
    list: z.object({
      item: ListItemObj.or(z.array(ListItemType)),
    }),
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
  })
  .passthrough();
export type VideoListObject = z.infer<typeof VideoListObject>;

export const AudioFileObject = z
  .object({
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
    "@_muted": z.string(),
    "@_volume": z.coerce.number(),
    "@_balance": z.coerce.number(),
    "@_solo": z.string(),
    "@_audiobusses": z.string(),
    "@_meterF1": z.string(),
    "@_meterF2": z.string(),
    "@_gainDb": z.coerce.number(),
  })
  .passthrough();
export type AudioFileObject = z.infer<typeof AudioFileObject>;

export const VMixRawXMLSchema = z
  .object({
    vmix: z.object({
      version: z.string(),
      edition: z.string(),
      preset: z.string(),
      inputs: z
        .object({
          input: z.array(
            z.union([
              z
                .object({
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
                })
                .passthrough(),
              VideoObject,
              VideoListObject,
              AudioFileObject,
            ]),
          ),
        })
        .passthrough(),
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
      mix: z.object({
        preview: z.number(),
        active: z.number(),
        "@_number": z.coerce.number(),
      }),
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
