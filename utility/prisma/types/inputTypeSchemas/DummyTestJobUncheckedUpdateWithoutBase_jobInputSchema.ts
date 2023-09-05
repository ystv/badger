import type { Prisma } from "../../client";
import { z } from "zod";
import { IntFieldUpdateOperationsInputSchema } from "./IntFieldUpdateOperationsInputSchema";

export const DummyTestJobUncheckedUpdateWithoutBase_jobInputSchema: z.ZodType<Prisma.DummyTestJobUncheckedUpdateWithoutBase_jobInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export default DummyTestJobUncheckedUpdateWithoutBase_jobInputSchema;
