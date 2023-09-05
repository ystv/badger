import type { Prisma } from "../../client";
import { z } from "zod";
import { DummyTestJobCreateManyBase_jobInputSchema } from "./DummyTestJobCreateManyBase_jobInputSchema";

export const DummyTestJobCreateManyBase_jobInputEnvelopeSchema: z.ZodType<Prisma.DummyTestJobCreateManyBase_jobInputEnvelope> =
  z
    .object({
      data: z.union([
        z.lazy(() => DummyTestJobCreateManyBase_jobInputSchema),
        z.lazy(() => DummyTestJobCreateManyBase_jobInputSchema).array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export default DummyTestJobCreateManyBase_jobInputEnvelopeSchema;
