import {
  Rundown,
  ContinuityItem,
  Media,
  RundownItem,
  MediaProcessingTask,
} from "@prisma/client";

export interface CompleteMedia extends Media {
  tasks: MediaProcessingTask[];
}

export interface CompleteRundownItem extends RundownItem {
  media: CompleteMedia[];
}

export interface CompleteRundown extends Rundown {
  items: Media[]; // we don't care about processing status for rundown items on this page
}

export interface CompleteContinuityItem extends ContinuityItem {
  media: CompleteMedia | null;
}

export type RundownOrContinuity =
  | (CompleteRundown & { _type: "rundown" })
  | (CompleteContinuityItem & { _type: "continuity_item" });
