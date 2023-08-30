import type { Prisma } from "../../client";
import { z } from "zod";
import { MediaWhereInputSchema } from "./MediaWhereInputSchema";
import { MediaUpdateWithoutRundownItemInputSchema } from "./MediaUpdateWithoutRundownItemInputSchema";
import { MediaUncheckedUpdateWithoutRundownItemInputSchema } from "./MediaUncheckedUpdateWithoutRundownItemInputSchema";

export const MediaUpdateToOneWithWhereWithoutRundownItemInputSchema: z.ZodType<Prisma.MediaUpdateToOneWithWhereWithoutRundownItemInput> =
  z
    .object({
      where: z.lazy(() => MediaWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => MediaUpdateWithoutRundownItemInputSchema),
        z.lazy(() => MediaUncheckedUpdateWithoutRundownItemInputSchema),
      ]),
    })
    .strict();

export default MediaUpdateToOneWithWhereWithoutRundownItemInputSchema;
