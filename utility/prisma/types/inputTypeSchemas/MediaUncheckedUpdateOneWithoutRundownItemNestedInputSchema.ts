import type { Prisma } from "../../client";
import { z } from "zod";
import { MediaCreateWithoutRundownItemInputSchema } from "./MediaCreateWithoutRundownItemInputSchema";
import { MediaUncheckedCreateWithoutRundownItemInputSchema } from "./MediaUncheckedCreateWithoutRundownItemInputSchema";
import { MediaCreateOrConnectWithoutRundownItemInputSchema } from "./MediaCreateOrConnectWithoutRundownItemInputSchema";
import { MediaUpsertWithoutRundownItemInputSchema } from "./MediaUpsertWithoutRundownItemInputSchema";
import { MediaWhereInputSchema } from "./MediaWhereInputSchema";
import { MediaWhereUniqueInputSchema } from "./MediaWhereUniqueInputSchema";
import { MediaUpdateToOneWithWhereWithoutRundownItemInputSchema } from "./MediaUpdateToOneWithWhereWithoutRundownItemInputSchema";
import { MediaUpdateWithoutRundownItemInputSchema } from "./MediaUpdateWithoutRundownItemInputSchema";
import { MediaUncheckedUpdateWithoutRundownItemInputSchema } from "./MediaUncheckedUpdateWithoutRundownItemInputSchema";

export const MediaUncheckedUpdateOneWithoutRundownItemNestedInputSchema: z.ZodType<Prisma.MediaUncheckedUpdateOneWithoutRundownItemNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => MediaCreateWithoutRundownItemInputSchema),
          z.lazy(() => MediaUncheckedCreateWithoutRundownItemInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => MediaCreateOrConnectWithoutRundownItemInputSchema)
        .optional(),
      upsert: z.lazy(() => MediaUpsertWithoutRundownItemInputSchema).optional(),
      disconnect: z
        .union([z.boolean(), z.lazy(() => MediaWhereInputSchema)])
        .optional(),
      delete: z
        .union([z.boolean(), z.lazy(() => MediaWhereInputSchema)])
        .optional(),
      connect: z.lazy(() => MediaWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => MediaUpdateToOneWithWhereWithoutRundownItemInputSchema),
          z.lazy(() => MediaUpdateWithoutRundownItemInputSchema),
          z.lazy(() => MediaUncheckedUpdateWithoutRundownItemInputSchema),
        ])
        .optional(),
    })
    .strict();

export default MediaUncheckedUpdateOneWithoutRundownItemNestedInputSchema;
