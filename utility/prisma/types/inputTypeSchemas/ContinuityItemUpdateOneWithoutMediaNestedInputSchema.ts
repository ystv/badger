import type { Prisma } from "../../client";
import { z } from "zod";
import { ContinuityItemCreateWithoutMediaInputSchema } from "./ContinuityItemCreateWithoutMediaInputSchema";
import { ContinuityItemUncheckedCreateWithoutMediaInputSchema } from "./ContinuityItemUncheckedCreateWithoutMediaInputSchema";
import { ContinuityItemCreateOrConnectWithoutMediaInputSchema } from "./ContinuityItemCreateOrConnectWithoutMediaInputSchema";
import { ContinuityItemUpsertWithoutMediaInputSchema } from "./ContinuityItemUpsertWithoutMediaInputSchema";
import { ContinuityItemWhereInputSchema } from "./ContinuityItemWhereInputSchema";
import { ContinuityItemWhereUniqueInputSchema } from "./ContinuityItemWhereUniqueInputSchema";
import { ContinuityItemUpdateToOneWithWhereWithoutMediaInputSchema } from "./ContinuityItemUpdateToOneWithWhereWithoutMediaInputSchema";
import { ContinuityItemUpdateWithoutMediaInputSchema } from "./ContinuityItemUpdateWithoutMediaInputSchema";
import { ContinuityItemUncheckedUpdateWithoutMediaInputSchema } from "./ContinuityItemUncheckedUpdateWithoutMediaInputSchema";

export const ContinuityItemUpdateOneWithoutMediaNestedInputSchema: z.ZodType<Prisma.ContinuityItemUpdateOneWithoutMediaNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ContinuityItemCreateWithoutMediaInputSchema),
          z.lazy(() => ContinuityItemUncheckedCreateWithoutMediaInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => ContinuityItemCreateOrConnectWithoutMediaInputSchema)
        .optional(),
      upsert: z
        .lazy(() => ContinuityItemUpsertWithoutMediaInputSchema)
        .optional(),
      disconnect: z
        .union([z.boolean(), z.lazy(() => ContinuityItemWhereInputSchema)])
        .optional(),
      delete: z
        .union([z.boolean(), z.lazy(() => ContinuityItemWhereInputSchema)])
        .optional(),
      connect: z.lazy(() => ContinuityItemWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(
            () => ContinuityItemUpdateToOneWithWhereWithoutMediaInputSchema,
          ),
          z.lazy(() => ContinuityItemUpdateWithoutMediaInputSchema),
          z.lazy(() => ContinuityItemUncheckedUpdateWithoutMediaInputSchema),
        ])
        .optional(),
    })
    .strict();

export default ContinuityItemUpdateOneWithoutMediaNestedInputSchema;
