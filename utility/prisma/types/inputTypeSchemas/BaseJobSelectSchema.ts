import { z } from "zod";
import type { Prisma } from "../../client";

export const BaseJobSelectSchema: z.ZodType<Prisma.BaseJobSelect> = z
  .object({
    id: z.boolean().optional(),
    workerId: z.boolean().optional(),
    state: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    startedAt: z.boolean().optional(),
    completedAt: z.boolean().optional(),
    externalJobProvider: z.boolean().optional(),
    externalJobID: z.boolean().optional(),
    jobType: z.boolean().optional(),
    jobPayload: z.boolean().optional(),
  })
  .strict();

export default BaseJobSelectSchema;
