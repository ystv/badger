import type { Prisma } from "../../client";
import { z } from "zod";
import { LoadAssetJobCreateWithoutBase_jobInputSchema } from "./LoadAssetJobCreateWithoutBase_jobInputSchema";
import { LoadAssetJobUncheckedCreateWithoutBase_jobInputSchema } from "./LoadAssetJobUncheckedCreateWithoutBase_jobInputSchema";
import { LoadAssetJobCreateOrConnectWithoutBase_jobInputSchema } from "./LoadAssetJobCreateOrConnectWithoutBase_jobInputSchema";
import { LoadAssetJobUpsertWithoutBase_jobInputSchema } from "./LoadAssetJobUpsertWithoutBase_jobInputSchema";
import { LoadAssetJobWhereInputSchema } from "./LoadAssetJobWhereInputSchema";
import { LoadAssetJobWhereUniqueInputSchema } from "./LoadAssetJobWhereUniqueInputSchema";
import { LoadAssetJobUpdateToOneWithWhereWithoutBase_jobInputSchema } from "./LoadAssetJobUpdateToOneWithWhereWithoutBase_jobInputSchema";
import { LoadAssetJobUpdateWithoutBase_jobInputSchema } from "./LoadAssetJobUpdateWithoutBase_jobInputSchema";
import { LoadAssetJobUncheckedUpdateWithoutBase_jobInputSchema } from "./LoadAssetJobUncheckedUpdateWithoutBase_jobInputSchema";

export const LoadAssetJobUpdateOneWithoutBase_jobNestedInputSchema: z.ZodType<Prisma.LoadAssetJobUpdateOneWithoutBase_jobNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => LoadAssetJobCreateWithoutBase_jobInputSchema),
          z.lazy(() => LoadAssetJobUncheckedCreateWithoutBase_jobInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => LoadAssetJobCreateOrConnectWithoutBase_jobInputSchema)
        .optional(),
      upsert: z
        .lazy(() => LoadAssetJobUpsertWithoutBase_jobInputSchema)
        .optional(),
      disconnect: z
        .union([z.boolean(), z.lazy(() => LoadAssetJobWhereInputSchema)])
        .optional(),
      delete: z
        .union([z.boolean(), z.lazy(() => LoadAssetJobWhereInputSchema)])
        .optional(),
      connect: z.lazy(() => LoadAssetJobWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(
            () => LoadAssetJobUpdateToOneWithWhereWithoutBase_jobInputSchema,
          ),
          z.lazy(() => LoadAssetJobUpdateWithoutBase_jobInputSchema),
          z.lazy(() => LoadAssetJobUncheckedUpdateWithoutBase_jobInputSchema),
        ])
        .optional(),
    })
    .strict();

export default LoadAssetJobUpdateOneWithoutBase_jobNestedInputSchema;
