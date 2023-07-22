import { Rundown, ContinuityItem, Media, RundownItem } from "@prisma/client";

export type RundownOrContinuity =
  | (Rundown & { items: RundownItem[] | null; _type: "rundown" })
  | (ContinuityItem & { media: Media | null; _type: "continuity_item" });
