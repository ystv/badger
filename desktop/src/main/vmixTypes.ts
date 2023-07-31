export type VMixInputType =
  | "Mix"
  | "Colour"
  | "VideoList"
  | "Video"
  | "Image"
  | "AudioFile";

export interface BaseInput<T extends VMixInputType = VMixInputType> {
  key: string;
  type: T;
  number: number;
  title: string;
  shortTitle: string;
  state: string;
  position: number;
  duration: number;
  loop: boolean;
}

export interface ListItem {
  source: string;
  selected: boolean;
}

export interface ListInput extends BaseInput<"VideoList"> {
  selectedIndex: number;
  items: ListItem[];
}

export interface ColourInput extends BaseInput<"Colour"> {}

export interface MixInput extends BaseInput<"Mix"> {}

export interface ImageInput extends BaseInput<"Image"> {}

export interface VideoInput extends BaseInput<"Video"> {
  muted: boolean;
  volume: number;
  balance: number;
  solo: boolean;
  audioBusses: unknown;
}

export interface AudioFileInput extends BaseInput<"AudioFile"> {
  muted: boolean;
  volume: number;
  balance: number;
  solo: boolean;
  audioBusses: unknown;
}

export type InputType =
  | ListInput
  | ColourInput
  | MixInput
  | VideoInput
  | ImageInput
  | AudioFileInput;

export interface VMixState {
  version: string;
  edition: string;
  preset: string;
  inputs: InputType[];
}
