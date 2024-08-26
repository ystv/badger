import type { Draft } from "immer";
import {
  AudioFileObject,
  VideoListObject,
  VideoObject,
  VMixRawXMLSchema,
} from "./vmixTypesRaw";
import {
  AudioFileInput,
  BaseInput,
  InputObject,
  InputType,
  ListInput,
  VideoInput,
  VMixState as VMixStateCleanedType,
} from "./vmixTypes";
import { z } from "zod";
import { js2xml, xml2js } from "xml-js";

type RawType = z.infer<typeof VMixRawXMLSchema>;

export class VMixState {
  protected _raw: RawType;
  protected _cleaned: VMixStateCleanedType | null = null;

  constructor(
    data: RawType | string,
    failOnTypeMismatch = process.env.NODE_ENV === "test",
  ) {
    const rawParseRes = VMixRawXMLSchema.safeParse(data);
    let raw: z.infer<typeof VMixRawXMLSchema>;
    if (rawParseRes.success) {
      raw = rawParseRes.data;
    } else if (failOnTypeMismatch) {
      // In tests we want this to fail immediately so that we notice the changes
      throw rawParseRes.error;
    } else {
      // But in production we want to keep trying if we can, as it's possible the
      // changes are minor enough to allow this to continue working.
      console.warn(
        "Parsing raw vMix schema failed. Possibly the vMix is a version we don't know. Will try to proceed, but things may break!",
      );
      console.trace("Raw data:", JSON.stringify(data));
      // DIRTY HACK - assume that the data matches the schema to extract what we can
      raw = data as z.infer<typeof VMixRawXMLSchema>;
    }
    this._raw = raw;
  }

  static fromXML(
    xml: string,
    failOnTypeMismatch = process.env.NODE_ENV === "test",
  ) {
    return new this(
      xml2js(xml, { compact: true }) as RawType,
      failOnTypeMismatch,
    );
  }

  get raw() {
    return this._raw;
  }

  get state(): VMixStateCleanedType {
    if (this._cleaned !== null) {
      return this._cleaned;
    }
    const raw = this._raw;
    const res: VMixStateCleanedType = {
      version: raw.vmix.version._text,
      edition: raw.vmix.edition._text,
      preset: raw.vmix.preset?._text,
      inputs: [],
    };
    for (const input of raw.vmix.inputs.input) {
      // eslint is wrong
      // eslint-disable-next-line prefer-const
      let v: BaseInput = {
        key: input._attributes.key,
        number: input._attributes.number,
        type: input._attributes.type as InputType,
        title: input._attributes.title,
        shortTitle: input._attributes.shortTitle,
        loop: input._attributes.loop === "True",
        state: input._attributes.state,
        duration: input._attributes.duration,
        position: input._attributes.position,
      };
      switch (input._attributes.type) {
        case "Colour":
        case "Mix":
        case "Image":
        case "Blank":
          break;
        case "Video":
        case "AudioFile": {
          const r = input as VideoObject | AudioFileObject;
          (v as unknown as VideoInput | AudioFileInput) = {
            ...v,
            type: r._attributes.type as "Video" | "AudioFile",
            volume: r._attributes.volume,
            balance: r._attributes.balance,
            solo: r._attributes.solo === "True",
            muted: r._attributes.muted === "True",
            audioBusses: r._attributes.audiobusses,
          };
          break;
        }
        case "VideoList": {
          const r = input as VideoListObject;
          (v as unknown as ListInput) = {
            ...v,
            type: r._attributes.type,
            selectedIndex: r._attributes.selectedIndex - 1 /* 1-based index */,
            items: [],
          };
          if (Array.isArray(r.list?.item)) {
            (v as ListInput).items = r.list!.item.map((item) => {
              if (typeof item === "string") {
                return {
                  source: item,
                  selected: false,
                };
              }
              return {
                source: item._text,
                selected: item._attributes?.selected === "true",
              };
            });
          } else if (r.list) {
            (v as ListInput).items.push({
              source: r.list.item._text,
              selected: r.list.item._attributes?.selected === "true",
            });
          }
          break;
        }
        default:
          console.warn(`Unrecognised input type '${input._attributes.type}'`);
          if (process.env.NODE_ENV === "test") {
            console.debug(input);
            throw new Error(
              `Unrecognised input type ${input._attributes.type}`,
            );
          }
          continue;
      }
      res.inputs.push(v as InputObject);
    }
    this._cleaned = res;
    return res;
  }
}

export class MutableVMixState extends VMixState {
  async update(fn: (draft: Draft<RawType>) => void) {
    const { produce } = await import("immer");
    const resultRaw = produce(this._raw, fn);
    // Run the new value through the Zod validation to ensure
    // it's still valid
    const result = VMixRawXMLSchema.parse(resultRaw);
    this._raw = result;
    this._cleaned = null; // invalidate cache
  }

  get xml() {
    return js2xml(this._raw, {
      compact: true,
    });
  }
}
