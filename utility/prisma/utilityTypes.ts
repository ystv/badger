import {
  ShowSchema,
  ContinuityItemSchema,
  RundownSchema,
  MediaSchema,
  RundownItemSchema,
  MediaProcessingTaskSchema,
  AssetSchema,
} from "./types/modelSchema";
import { z } from "zod";

/*
 * These types are used in desktop and the tRPC API. They're defined here to ensure that the types stay in sync,
 * and that we can use the zod-prisma autogenerated ones as a base. (NB: we have `relationModel` set to false in the
 * zod-prisma config because it'd create circular types, so we have to define relations manually.)
 */

export const PartialShowModel = ShowSchema.extend({
  continuityItems: z.array(ContinuityItemSchema),
  rundowns: z.array(RundownSchema),
});
export const PartialMediaModel = MediaSchema.extend({});
export const CompleteContinuityItemModel = ContinuityItemSchema.extend({
  media: PartialMediaModel.nullable(),
});
export const CompleteRundownItemSchema = RundownItemSchema.extend({
  media: PartialMediaModel.nullable(),
});
export const CompleteAssetSchema = AssetSchema.extend({
  media: PartialMediaModel,
});
export const CompleteRundownModel = RundownSchema.extend({
  items: z.array(CompleteRundownItemSchema),
  assets: z.array(CompleteAssetSchema),
});
export const CompleteShowModel = ShowSchema.extend({
  continuityItems: z.array(CompleteContinuityItemModel),
  rundowns: z.array(CompleteRundownModel),
});

export const CompleteMediaModel = PartialMediaModel.extend({
  tasks: z.array(MediaProcessingTaskSchema),
});
