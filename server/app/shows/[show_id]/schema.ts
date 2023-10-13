import { z } from "zod";

export const editContinuityItemSchema = z.object({
  itemID: z.coerce.number(),
  name: z.string(),
  duration: z.number().optional(),
});
