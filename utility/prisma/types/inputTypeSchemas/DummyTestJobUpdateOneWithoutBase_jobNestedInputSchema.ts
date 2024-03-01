import type { Prisma } from "../../client";
import { z } from "zod";
import { DummyTestJobCreateWithoutBase_jobInputSchema } from "./DummyTestJobCreateWithoutBase_jobInputSchema";
import { DummyTestJobUncheckedCreateWithoutBase_jobInputSchema } from "./DummyTestJobUncheckedCreateWithoutBase_jobInputSchema";
import { DummyTestJobCreateOrConnectWithoutBase_jobInputSchema } from "./DummyTestJobCreateOrConnectWithoutBase_jobInputSchema";
import { DummyTestJobUpsertWithoutBase_jobInputSchema } from "./DummyTestJobUpsertWithoutBase_jobInputSchema";
import { DummyTestJobWhereInputSchema } from "./DummyTestJobWhereInputSchema";
import { DummyTestJobWhereUniqueInputSchema } from "./DummyTestJobWhereUniqueInputSchema";
import { DummyTestJobUpdateToOneWithWhereWithoutBase_jobInputSchema } from "./DummyTestJobUpdateToOneWithWhereWithoutBase_jobInputSchema";
import { DummyTestJobUpdateWithoutBase_jobInputSchema } from "./DummyTestJobUpdateWithoutBase_jobInputSchema";
import { DummyTestJobUncheckedUpdateWithoutBase_jobInputSchema } from "./DummyTestJobUncheckedUpdateWithoutBase_jobInputSchema";

export const DummyTestJobUpdateOneWithoutBase_jobNestedInputSchema: z.ZodType<Prisma.DummyTestJobUpdateOneWithoutBase_jobNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => DummyTestJobCreateWithoutBase_jobInputSchema),
          z.lazy(() => DummyTestJobUncheckedCreateWithoutBase_jobInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => DummyTestJobCreateOrConnectWithoutBase_jobInputSchema)
        .optional(),
      upsert: z
        .lazy(() => DummyTestJobUpsertWithoutBase_jobInputSchema)
        .optional(),
      disconnect: z
        .union([z.boolean(), z.lazy(() => DummyTestJobWhereInputSchema)])
        .optional(),
      delete: z
        .union([z.boolean(), z.lazy(() => DummyTestJobWhereInputSchema)])
        .optional(),
      connect: z.lazy(() => DummyTestJobWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(
            () => DummyTestJobUpdateToOneWithWhereWithoutBase_jobInputSchema,
          ),
          z.lazy(() => DummyTestJobUpdateWithoutBase_jobInputSchema),
          z.lazy(() => DummyTestJobUncheckedUpdateWithoutBase_jobInputSchema),
        ])
        .optional(),
    })
    .strict();

export default DummyTestJobUpdateOneWithoutBase_jobNestedInputSchema;
