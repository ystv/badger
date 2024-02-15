import { RundownItemType } from "@badger/prisma/client";
import { z } from "zod";

export const ItemTypeSchema = z.nativeEnum(RundownItemType);

export const AddItemSchema = z.object({
  showID: z.coerce.number().int().positive(),
  rundownID: z.coerce.number().int().positive(),
  name: z.string().nonempty(),
  type: ItemTypeSchema,
  durationSeconds: z.coerce.number().int().default(0),
  notes: z.string().optional(),
});

export const EditItemSchema = AddItemSchema.extend({
  itemID: z.coerce.number().int().positive(),
});
