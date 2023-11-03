import { z } from "zod";

export const MetadataTargetTypeSchema = z.enum(["Show", "Rundown"]);

export type MetadataTargetTypeType = `${z.infer<
  typeof MetadataTargetTypeSchema
>}`;

export default MetadataTargetTypeSchema;
